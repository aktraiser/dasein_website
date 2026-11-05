import type { Locale } from "@/lib/i18n";

type Box = { title: string; text: string };

const T: Record<
  Locale,
  {
    title: string;
    apps: Box;
    runtime: Box;
    gateway: Box;
    admission: Box;
    scheduler: string;
    classes: Box[];
    router: Box;
    providers: Box[];
    observability: string;
    signals: string[];
    caption: [string, string];
  }
> = {
  fr: {
    title: "Le 429 se traite avant le fournisseur, pas après",
    apps: { title: "Applications", text: "assistants, API, traitements par lots" },
    runtime: { title: "Runtime d’agents", text: "budget par exécution, profondeur, parallélisme, reprises, délai" },
    gateway: { title: "Passerelle IA", text: "identité authentifiée, budget par consommateur, toutes les routes" },
    admission: { title: "Contrôle d’admission", text: "tokens pondérés, max_tokens, concurrence bornée, budget en euros" },
    scheduler: "Ordonnanceur",
    classes: [
      { title: "Critique", text: "réservé, Priority" },
      { title: "Standard", text: "quota partagé" },
      { title: "Différé", text: "Flex, Batch" },
    ],
    router: { title: "Routeur", text: "modèle, région, fournisseur, débordement, dégradation" },
    providers: [
      { title: "AWS", text: "Bedrock" },
      { title: "Microsoft", text: "Foundry" },
      { title: "Google", text: "Agent Platform" },
    ],
    observability: "Observabilité",
    signals: [
      "429 par origine : application, passerelle, fournisseur",
      "tokens estimés et facturés, retries, file d’attente, latence par déploiement",
      "identifiant d’exécution propagé de bout en bout",
    ],
    caption: [
      "La passerelle voit chaque appel ; seul le runtime voit l’exécution entière d’un agent.",
      "Un 429 du fournisseur remonte au routeur, qui décide : réessayer, déborder ou dégrader.",
    ],
  },
  en: {
    title: "A 429 is handled before the provider, not after",
    apps: { title: "Applications", text: "assistants, APIs, batch jobs" },
    runtime: { title: "Agent runtime", text: "budget per run, depth, parallelism, retries, timeout" },
    gateway: { title: "AI gateway", text: "authenticated identity, budget per consumer, all routes" },
    admission: { title: "Admission control", text: "weighted tokens, max_tokens, bounded concurrency, budget in euros" },
    scheduler: "Scheduler",
    classes: [
      { title: "Critical", text: "reserved, Priority" },
      { title: "Standard", text: "shared quota" },
      { title: "Deferred", text: "Flex, Batch" },
    ],
    router: { title: "Router", text: "model, region, provider, overflow, degradation" },
    providers: [
      { title: "AWS", text: "Bedrock" },
      { title: "Microsoft", text: "Foundry" },
      { title: "Google", text: "Agent Platform" },
    ],
    observability: "Observability",
    signals: [
      "429s by origin: application, gateway, provider",
      "estimated and billed tokens, retries, queue, latency per deployment",
      "run identifier propagated end to end",
    ],
    caption: [
      "The gateway sees every call; only the runtime sees an agent’s whole run.",
      "A provider 429 goes back up to the router, which decides: retry, overflow or degrade.",
    ],
  },
};

function Node({ box, accent }: { box: Box; accent?: boolean }) {
  return (
    <div className={accent ? "adiag__node adiag__node--accent" : "adiag__node"}>
      {box.title}
      <small>{box.text}</small>
    </div>
  );
}

const Arrow = () => (
  <span className="acdiag__arrow" aria-hidden="true">
    ↓
  </span>
);

/** Applications and agents → gateway → admission → scheduler → router → providers, with observability alongside. */
export function AdmissionChainDiagram({ lang }: { lang: Locale }) {
  const t = T[lang];
  return (
    <figure className="adiag acdiag" aria-label={t.title}>
      <p className="acdiag__title">{t.title}</p>
      <div className="acdiag__grid">
        <div className="acdiag__main">
          <div className="acdiag__row acdiag__row--2">
            <Node box={t.apps} />
            <Node box={t.runtime} />
          </div>
          <Arrow />
          <Node box={t.gateway} />
          <Arrow />
          <Node box={t.admission} accent />
          <Arrow />
          <div className="adiag__node acdiag__group">
            {t.scheduler}
            <div className="acdiag__row acdiag__row--3">
              {t.classes.map((box) => (
                <Node key={box.title} box={box} />
              ))}
            </div>
          </div>
          <Arrow />
          <Node box={t.router} />
          <Arrow />
          <div className="acdiag__row acdiag__row--3">
            {t.providers.map((box) => (
              <Node key={box.title} box={box} />
            ))}
          </div>
        </div>
        <aside className="adiag__node acdiag__obs">
          {t.observability}
          {t.signals.map((signal) => (
            <small key={signal}>{signal}</small>
          ))}
        </aside>
      </div>
      <figcaption className="acdiag__caption">
        {t.caption[0]}
        <br />
        {t.caption[1]}
      </figcaption>
    </figure>
  );
}
