import type { ReactNode } from "react";
import { Crop } from "./os/Crop";
import { Reveal } from "./Reveal";

export function SectionHead({
  index,
  label,
  title,
  children,
}: {
  index?: string;
  label: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <Crop className="section-head">
      <Reveal>
        <p className="eyebrow eyebrow--center">
          {index && <span className="eyebrow__index">{index}</span>}
          {label}
        </p>
        <h2 className="h2">{title}</h2>
        {children && <p className="lead">{children}</p>}
      </Reveal>
    </Crop>
  );
}
