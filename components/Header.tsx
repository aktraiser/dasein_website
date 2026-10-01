"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import type { Dictionary } from "@/content/dictionaries";
import { locales, type Locale } from "@/lib/i18n";
import { Wordmark } from "./Wordmark";

type Labels = Dictionary["nav"];
type Menu = Dictionary["navMenu"];
type Key = "expertise" | "about";
type Entry = { label: string; href: string };

const CLOSE_DELAY = 160;

/**
 * Header inspired by openai.com: a quiet bar with text links and two pills.
 * Hovering (or focusing) a section drops a full-width panel with large links
 * on the left and resources on the right, while the page behind is blurred.
 */
export function Header({ lang, labels, menu }: { lang: Locale; labels: Labels; menu: Menu }) {
  const pathname = usePathname();
  const [open, setOpen] = useState<Key | null>(null);
  const [mobile, setMobile] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const megaRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Partial<Record<Key, HTMLDivElement | null>>>({});

  const path = (href: string) => `/${lang}${href === "/" ? "" : href.startsWith("/#") ? href.slice(1) : href}`;

  // Lists built from the content files, so the menu follows the site.
  const panels: Record<Key, { href: string; label: string; explore: string; main: Entry[]; sideTitle: string; side: Entry[] }> = {
    expertise: { href: "/#verticals", label: labels.expertise, ...menu.expertise },
    about: { href: "/about", label: labels.about, ...menu.about },
  };
  const keys = Object.keys(panels) as Key[];

  const show = (key: Key) => {
    window.clearTimeout(closeTimer.current);
    setOpen(key);
  };
  const hide = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), CLOSE_DELAY);
  };
  const closeAll = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(null);
    setMobile(false);
  };

  // One shared panel: its height animates to the active section's content,
  // so opening, switching and closing are smooth instead of jumping.
  useLayoutEffect(() => {
    const mega = megaRef.current;
    if (!mega) return;
    const measure = () => {
      const panel = open ? panelRefs.current[open] : null;
      mega.style.height = `${panel ? panel.offsetHeight : 0}px`;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [open]);

  // Keyboard: ArrowDown on a section opens its menu and focuses the first link.
  const onNavKey = (key: Key) => (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key !== "ArrowDown") return;
    e.preventDefault();
    show(key);
    requestAnimationFrame(() => panelRefs.current[key]?.querySelector("a")?.focus());
  };

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const rest = pathname.split("/").slice(2).join("/");
  const isCurrent = (href: string) => pathname === path(href) || pathname.startsWith(`${path(href)}/`);

  return (
    <>
      <header className="header" data-open={open !== null || mobile} onPointerLeave={hide}>
        <div className="header__inner">
          <div className="header__left">
            <Wordmark lang={lang} />
            <nav className="nav" aria-label="Main" data-active={open !== null}>
              {keys.map((key, i) => (
                <Fragment key={key}>
                  <div className="nav__item" onPointerEnter={() => show(key)}>
                    <Link
                      href={path(panels[key].href)}
                      className="nav__link"
                      aria-current={isCurrent(panels[key].href) ? "page" : undefined}
                      aria-expanded={open === key}
                      aria-controls={`mega-${key}`}
                      data-on={open === key}
                      onKeyDown={onNavKey(key)}
                      onClick={closeAll}
                    >
                      {panels[key].label}
                    </Link>
                  </div>
                  {/* "Articles" is a plain link (no panel), last in the bar. */}
                  {i === keys.length - 1 && (
                    <div className="nav__item" onPointerEnter={() => hide()}>
                      <Link
                        href={path("/articles")}
                        className="nav__link"
                        aria-current={isCurrent("/articles") ? "page" : undefined}
                        onClick={closeAll}
                      >
                        {labels.articles}
                      </Link>
                    </div>
                  )}
                </Fragment>
              ))}
            </nav>
          </div>

          <div className="header__actions">
            <div className="pill pill--ghost lang-switch" role="group" aria-label={labels.language}>
              {locales.map((locale) => (
                <Link
                  key={locale}
                  href={`/${locale}${rest ? `/${rest}` : ""}`}
                  hrefLang={locale}
                  aria-current={locale === lang ? "true" : undefined}
                  onClick={() => {
                    document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000;samesite=lax`;
                  }}
                >
                  {locale}
                </Link>
              ))}
            </div>
            <Link href={path("/contact")} className="pill pill--ink header__cta" onClick={closeAll}>
              {labels.cta} <span aria-hidden="true">↗</span>
            </Link>
            <button
              type="button"
              className="menu-btn"
              aria-expanded={mobile}
              aria-controls="mobile-nav"
              aria-label={mobile ? labels.close : labels.menu}
              onClick={() => setMobile((v) => !v)}
            >
              <span data-open={mobile} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={megaRef}
          className="mega"
          data-open={open !== null}
          onPointerEnter={() => open && show(open)}
        >
          {keys.map((key) => {
            const panel = panels[key];
            const active = open === key;
            return (
              <div
                key={key}
                id={`mega-${key}`}
                ref={(node) => {
                  panelRefs.current[key] = node;
                }}
                className="mega__panel"
                data-active={active}
                aria-hidden={!active}
              >
                <div className="mega__inner">
                  <div>
                    <p className="mega__eyebrow">{panel.explore}</p>
                    <ul className="mega__main">
                      {panel.main.map((entry, i) => (
                        <li key={entry.href} style={{ "--i": i } as CSSProperties}>
                          <Link href={path(entry.href)} tabIndex={active ? 0 : -1} onClick={closeAll}>
                            {entry.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mega__eyebrow">{panel.sideTitle}</p>
                    <ul className="mega__side">
                      {panel.side.map((entry, i) => (
                        <li key={entry.href} style={{ "--i": i + 2 } as CSSProperties}>
                          <Link href={path(entry.href)} tabIndex={active ? 0 : -1} onClick={closeAll}>
                            {entry.label} <span aria-hidden="true">↗</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </header>

      {/* Page behind an open menu is blurred, like on openai.com */}
      <div className="header__scrim" data-open={open !== null} aria-hidden="true" />

      {mobile && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Main">
          {keys.map((key) => (
            <Link key={key} href={path(panels[key].href)} aria-current={isCurrent(panels[key].href) ? "page" : undefined} onClick={closeAll}>
              {panels[key].label}
            </Link>
          ))}
          <Link href={path("/articles")} aria-current={isCurrent("/articles") ? "page" : undefined} onClick={closeAll}>
            {labels.articles}
          </Link>
          <Link href={path("/contact")} onClick={closeAll}>
            {labels.contact}
          </Link>
          <Link href={path("/contact")} className="pill pill--ink mobile-nav__cta" onClick={closeAll}>
            {labels.cta} <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      )}
    </>
  );
}
