/**
 * Lead endpoint for the contact form and the 3-step estimate form.
 * PLACEHOLDER: it only logs the request to the server console. Nothing is
 * stored or emailed yet, and uploaded photos are discarded after their
 * details are logged. Supabase will be connected later.
 *
 * Accepts JSON (contact form) or multipart form data (estimate form, which
 * may carry one photo).
 */

const MAX_LENGTH = 2000;
const MAX_PHOTO_BYTES = 8 * 1024 * 1024;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TEXT_FIELDS = [
  "formType",
  "name",
  "phone",
  "email",
  "address",
  "service",
  "problem",
  "message",
  "preferredTime",
  "company",
] as const;

type Fields = Record<(typeof TEXT_FIELDS)[number], string>;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_LENGTH) : "";
}

async function readRequest(
  request: Request,
): Promise<{ fields: Fields; photo: File | null } | null> {
  const contentType = request.headers.get("content-type") ?? "";
  const fields = {} as Fields;

  try {
    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      for (const name of TEXT_FIELDS) fields[name] = clean(form.get(name));
      const photo = form.get("photo");
      return {
        fields,
        photo: photo instanceof File && photo.size > 0 ? photo : null,
      };
    }

    const body: unknown = await request.json();
    if (typeof body !== "object" || body === null) return null;
    const input = body as Record<string, unknown>;
    for (const name of TEXT_FIELDS) fields[name] = clean(input[name]);
    return { fields, photo: null };
  } catch {
    return null;
  }
}

function invalid(error: string) {
  return Response.json({ ok: false, error }, { status: 422 });
}

export async function POST(request: Request) {
  const parsed = await readRequest(request);
  if (!parsed) {
    return Response.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }
  const { fields, photo } = parsed;

  // Honeypot: real visitors never see or fill this field.
  if (fields.company) {
    console.log("[contact] Dropped a submission with the honeypot field filled.");
    return Response.json({ ok: false, error: "Rejected" }, { status: 400 });
  }

  const phoneDigits = fields.phone.replace(/\D/g, "");
  const hasContact =
    fields.name.length >= 2 && phoneDigits.length >= 10 && phoneDigits.length <= 11;
  if (!hasContact) return invalid("Missing or invalid name or phone");

  if (fields.formType === "estimate") {
    if (fields.address.length < 5 || !fields.problem) {
      return invalid("Missing address or problem type");
    }
    if (photo && (!photo.type.startsWith("image/") || photo.size > MAX_PHOTO_BYTES)) {
      return invalid("Photo must be an image under 8 MB");
    }

    console.log("[contact] New estimate request:", {
      address: fields.address,
      problem: fields.problem,
      service: fields.service,
      name: fields.name,
      phone: fields.phone,
      photo: photo
        ? { name: photo.name, type: photo.type, bytes: photo.size }
        : null,
    });
    return Response.json({ ok: true });
  }

  if (!EMAIL_PATTERN.test(fields.email) || !fields.service) {
    return invalid("Missing or invalid email or service");
  }

  console.log("[contact] New inspection request:", {
    name: fields.name,
    phone: fields.phone,
    email: fields.email,
    address: fields.address,
    service: fields.service,
    message: fields.message,
    preferredTime: fields.preferredTime,
  });
  return Response.json({ ok: true });
}
