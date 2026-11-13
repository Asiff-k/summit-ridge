import { MessageCircle } from "lucide-react";

import { business } from "@/config/business";

/**
 * AI CHAT WIDGET PLACEHOLDER
 *
 * Reserved bottom-right slot for the chat widget. Nothing is wired up yet.
 * When the chat is ready, mount it inside #chat-widget-slot and delete the
 * dashed placeholder box below. The slot sits above the mobile call bar.
 */
export function ChatSlot() {
  const { ai } = business;

  return (
    <div
      id="chat-widget-slot"
      data-placeholder="chat-widget"
      className="fixed right-3 bottom-24 z-30 md:right-6 md:bottom-6"
    >
      <div
        role="note"
        aria-label={ai.chatPlaceholderNote}
        className="flex size-12 items-center justify-center gap-3 rounded-lg border border-dashed border-foreground/40 bg-card text-muted-foreground shadow-card md:size-auto md:px-4 md:py-3"
      >
        <MessageCircle aria-hidden="true" className="size-5" strokeWidth={1.5} />
        <span className="hidden leading-tight md:block">
          <span className="block font-semibold text-foreground">{ai.chatLabel}</span>
          <span className="type-small block">{ai.chatPlaceholderNote}</span>
        </span>
      </div>
    </div>
  );
}
