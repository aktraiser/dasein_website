/**
 * A small application window drawn in HTML: a title bar and a few rows, each
 * with a status (ok, waiting, off). Illustrates an offer the way a product
 * screenshot would, without pretending to be one.
 */
export function MockWindow({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; status: string; tone: string }[];
}) {
  return (
    <div className="mockwin" aria-hidden="true">
      <p className="mockwin__bar">
        <i />
        <i />
        <i />
        <span>{title}</span>
      </p>
      <ul className="mockwin__rows">
        {rows.map((row) => (
          <li key={row.label}>
            <span>{row.label}</span>
            <em data-tone={row.tone}>{row.status}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
