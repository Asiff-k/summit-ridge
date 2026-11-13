import Link from "next/link";

import { Logo } from "@/components/layout/Header";
import { business } from "@/config/business";

const linkClass =
  "inline-flex min-h-11 items-center text-on-dark-muted underline-offset-4 hover:text-on-dark hover:underline md:min-h-0 md:py-1";

export function Footer() {
  const { footer, contact, address, hours, services, serviceAreas } = business;

  return (
    // Extra bottom padding on small screens clears the fixed call bar.
    <footer className="on-dark-section pb-24 md:pb-0">
      <div className="container-site grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1fr_1.6fr_1fr_1.1fr]">
        <div>
          <Logo onDark />
          <p className="mt-5 max-w-xs text-on-dark-muted">{footer.blurb}</p>
        </div>

        <div>
          <h2 className="type-h3">{footer.contactHeading}</h2>
          <address className="mt-4 text-on-dark-muted not-italic">
            <a
              href={contact.phoneHref}
              className="inline-flex min-h-11 items-center text-lg font-semibold text-on-dark tabular-nums underline-offset-4 hover:underline"
            >
              {contact.phoneDisplay}
            </a>
            <br />
            <a href={contact.emailHref} className={`${linkClass} wrap-anywhere`}>
              {contact.email}
            </a>
            <p className="mt-2">
              {address.street}
              <br />
              {address.city}, {address.state} {address.zip}
            </p>
          </address>

          <h2 className="type-h3 mt-8">{business.hoursHeading}</h2>
          <dl className="mt-4 space-y-1 text-on-dark-muted">
            {hours.map((entry) => (
              <div
                key={entry.days}
                className="flex flex-wrap justify-between gap-x-4"
              >
                <dt>{entry.days}</dt>
                <dd className="whitespace-nowrap tabular-nums">{entry.hours}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="type-h3">{footer.servicesHeading}</h2>
          <ul className="mt-4">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className={linkClass}>
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="type-h3">{footer.areasHeading}</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-on-dark-muted">
            {serviceAreas.map((city) => (
              <li key={city}>{city}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-on-dark/15">
        <div className="container-site type-small flex flex-col gap-2 py-6 text-on-dark-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {business.legalName}. {footer.rights}
          </p>
          <a
            href={footer.credit.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-on-dark"
          >
            {footer.credit.text}
          </a>
        </div>
      </div>
    </footer>
  );
}
