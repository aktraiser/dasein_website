import Link from "next/link";

// Rendered for unknown paths inside a locale. Bilingual because not-found
// does not receive route params.
export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1 className="display">Route not found.</h1>
        <p className="lead">
          This path does not resolve to anything in the system. — Ce chemin ne mène à rien dans le système.
        </p>
        <p style={{ marginTop: 40 }}>
          <Link href="/" className="link">
            Home / Accueil <span className="arrow" aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
