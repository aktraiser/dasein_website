import type { Locale } from "@/lib/i18n";

type Family = "traffic" | "alloc" | "physical";
type Level = { title: string; text: string; family: Family };

const T: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    families: Record<Family, string>;
    groups: { title: string; levels: Level[] }[];
  }
> = {
  fr: {
    title: "Sept facteurs à examiner, trois chez vous et quatre chez le fournisseur",
    subtitle: "Des composants, des règles, des paramètres d’allocation et une contrainte physique, chacun dans sa propre unité",
    families: { traffic: "contrôle du trafic", alloc: "politique d’allocation", physical: "contrainte physique" },
    groups: [
      {
        title: "Chez vous : vous réglez",
        levels: [
          { title: "1. Instance applicative", text: "Limiteur dans le code : compte des requêtes, se multiplie avec les instances", family: "traffic" },
          { title: "2. Limiteur distribué", text: "Compteur partagé entre instances : doit compter en tokens pondérés", family: "traffic" },
          { title: "3. Gateway", text: "Budgets par consommateur : ne voit que le trafic qui passe par elle", family: "traffic" },
        ],
      },
      {
        title: "Chez le fournisseur : vous choisissez, il applique",
        levels: [
          { title: "4. Quota fournisseur", text: "TPM et RPM par modèle : comptage propre au service et au déploiement", family: "traffic" },
          { title: "5. Niveau de service", text: "Standard, Priority, Flex, réservé : fixe votre place dans la file", family: "alloc" },
          { title: "6. Périmètre géographique", text: "Région, zone ou global : fixe la capacité et les services disponibles", family: "alloc" },
          { title: "7. Capacité physique", text: "GPU du fournisseur : contention du pool partagé, hors de votre contrôle", family: "physical" },
        ],
      },
    ],
  },
  en: {
    title: "Seven factors to examine, three at home and four at the provider",
    subtitle: "Components, rules, allocation parameters and a physical constraint, each in its own unit",
    families: { traffic: "traffic control", alloc: "allocation policy", physical: "physical constraint" },
    groups: [
      {
        title: "At home: you set it",
        levels: [
          { title: "1. Application instance", text: "Limiter in the code: counts requests, multiplies with instances", family: "traffic" },
          { title: "2. Distributed limiter", text: "Counter shared between instances: must count in weighted tokens", family: "traffic" },
          { title: "3. Gateway", text: "Budgets per consumer: only sees the traffic that goes through it", family: "traffic" },
        ],
      },
      {
        title: "At the provider: you choose, it applies",
        levels: [
          { title: "4. Provider quota", text: "TPM and RPM per model: counting specific to the service and deployment", family: "traffic" },
          { title: "5. Service tier", text: "Standard, Priority, Flex, reserved: sets your place in the queue", family: "alloc" },
          { title: "6. Geographic scope", text: "Region, zone or global: sets available capacity and services", family: "alloc" },
          { title: "7. Physical capacity", text: "The provider’s GPUs: contention in the shared pool, beyond your control", family: "physical" },
        ],
      },
    ],
  },
};

/** The seven levels that can limit an LLM request, grouped by who controls them and tagged by family. */
export function SevenLevelsDiagram({ lang }: { lang: Locale }) {
  const t = T[lang];
  return (
    <figure className="adiag sldiag" aria-label={t.title}>
      <p className="sldiag__title">{t.title}</p>
      <p className="sldiag__subtitle">{t.subtitle}</p>
      {t.groups.map((group, g) => (
        <div key={group.title}>
          {g > 0 && (
            <span className="sldiag__arrow" aria-hidden="true">
              ↓
            </span>
          )}
          <div className="sldiag__group">
            <p className="sldiag__group-title">{group.title}</p>
            <ol className="sldiag__levels">
              {group.levels.map((level, i) => (
                <li key={level.title}>
                  {i > 0 && (
                    <span className="sldiag__arrow" aria-hidden="true">
                      ↓
                    </span>
                  )}
                  <div className="adiag__node sldiag__level">
                    <span className="sldiag__head">
                      <b>{level.title}</b>
                      <span className={`sldiag__tag sldiag__tag--${level.family}`}>{t.families[level.family]}</span>
                    </span>
                    <small>{level.text}</small>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      ))}
    </figure>
  );
}
