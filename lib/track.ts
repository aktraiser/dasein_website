/**
 * Measurement of the home page and the contact path: exploration of the
 * opening scene, access to the offers, contact. No analytics tool is wired
 * yet: events go to whichever one is on the page (Plausible, a dataLayer) and
 * are always dispatched as a `dasein:track` DOM event, so plugging one in is
 * a single listener.
 */
type Props = Record<string, string>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Props }) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: string, props: Props = {}) {
  if (typeof window === "undefined") return;
  window.plausible?.(event, { props });
  window.dataLayer?.push({ event, ...props });
  window.dispatchEvent(new CustomEvent("dasein:track", { detail: { event, ...props } }));
}
