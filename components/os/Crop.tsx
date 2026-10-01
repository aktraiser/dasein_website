import type { ElementType, ReactNode } from "react";

/** Block framed by print-style crop marks in its four corners. */
export function Crop({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={`crop ${className}`}>
      <span className="crop__c crop__c--tl" aria-hidden="true" />
      <span className="crop__c crop__c--tr" aria-hidden="true" />
      <span className="crop__c crop__c--bl" aria-hidden="true" />
      <span className="crop__c crop__c--br" aria-hidden="true" />
      {children}
    </Tag>
  );
}

/** Vertical strip of pseudo-random characters, like a memory dump. */
export function CharStrip({ seed = 1, length = 140, className = "" }: { seed?: number; length?: number; className?: string }) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let s = seed * 9301 + 49297;
  let out = "";
  for (let i = 0; i < length; i++) {
    s = (s * 9301 + 49297) % 233280;
    out += alphabet[Math.floor((s / 233280) * alphabet.length)];
  }
  return (
    <div className={`charstrip ${className}`} aria-hidden="true">
      <span>{out}</span>
      <span>{out}</span>
    </div>
  );
}
