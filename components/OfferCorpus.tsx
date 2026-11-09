import Image from "next/image";
import type { Locale, OfferSlug } from "@/lib/i18n";

const copy = {
 fr: {
  title:"Ce qui donne du sens à vos demandes.",
  lead:"Un corpus est un ensemble organisé de connaissances, de souvenirs documentés et de repères propres à votre activité. Nous le construisons avec vous, à partir des informations que vous choisissez de rendre accessibles.",
  facets:["Mémoire des décisions et engagements","Connaissances et sources métier","Vocabulaire, relations et critères","Méthodes et skills","Préférences et intentions déclarées","Provenance, validité et droits"],
  flow:["Votre corpus","Le contexte utile à la demande","L’agent et ses méthodes","Une proposition ou une action vérifiée"],
  distinction:"Le corpus est conservé et peut évoluer. Le contexte est la partie sélectionnée pour une demande précise. Les skills apportent les méthodes ; les outils donnent les capacités d’accès et d’action.",
  note:"Un fait documenté, une préférence exprimée et une hypothèse de l’agent restent identifiés séparément. Les corrections vérifiées peuvent enrichir le corpus ; vous devez pouvoir le corriger, le mettre à jour et en retirer des éléments.",
  roles:{"ways-of-working":"Pour une personne ou une équipe, nous faisons émerger ce qui compte dans le travail : expériences, décisions, méthodes et manières de nommer les choses.",solutions:"Pour un agent métier, nous explicitons les définitions, relations, règles et exceptions à mobiliser avant une décision ou une action.",engineering:"Pour une plateforme, nous organisons la provenance, les droits, la validité et la circulation de ce contexte entre les agents et les systèmes."},
  caption:"Photographie d’illustration · Annie Spratt / Unsplash",
 },
 en:{
  title:"What gives your requests their meaning.",
  lead:"A corpus is an organised body of knowledge, documented memories and references specific to your activity. We build it with you, using information you choose to make accessible.",
  facets:["Decisions and commitments","Knowledge and business sources","Vocabulary, relationships and criteria","Methods and skills","Stated preferences and intentions","Provenance, validity and access rights"],
  flow:["Your corpus","Context relevant to the request","The agent and its methods","A checked proposal or action"],
  distinction:"The corpus is retained and can evolve. Context is the part selected for a particular request. Skills provide methods; tools provide access and action capabilities.",
  note:"A documented fact, a stated preference and an agent hypothesis remain separately identified. Verified corrections may enrich the corpus; you must be able to correct, update and remove information.",
  roles:{"ways-of-working":"For a person or team, we make explicit what matters at work: experiences, decisions, methods and ways of naming things.",solutions:"For a business agent, we make definitions, relationships, rules and exceptions explicit before a decision or action.",engineering:"For a platform, we organise provenance, access rights, validity and the circulation of context between agents and systems."},
  caption:"Illustrative photograph · Annie Spratt / Unsplash",
 }
};
export function OfferCorpus({lang,slug}:{lang:Locale;slug:OfferSlug}) {
 const t=copy[lang];
 return <section className="offer-section offer-corpus container" aria-labelledby="offer-corpus-title">
  <div className="offer-corpus__intro"><div><p className="offer-caption">{lang==="fr" ? "Votre contexte, rendu accessible" : "Making your context accessible"}</p><h2 id="offer-corpus-title">{t.title}</h2><p>{t.lead}</p><p>{t.roles[slug]}</p></div>
  <figure><Image src="/images/team-context.jpg" alt={lang==="fr" ? "Des collègues échangent autour de leurs ordinateurs." : "Colleagues discussing their work around laptops."} width={1000} height={667} sizes="(max-width:719px) 90vw, 30vw"/><figcaption><a href="https://unsplash.com/photos/QckxruozjRg">{t.caption}</a></figcaption></figure></div>
  <ul className="offer-corpus__facets">{t.facets.map((facet,i)=><li key={facet}><span aria-hidden="true">0{i+1}</span>{facet}</li>)}</ul>
  <ol className="offer-corpus__flow">{t.flow.map(step=><li key={step}>{step}</li>)}</ol>
  <div className="offer-corpus__notes"><p>{t.distinction}</p><p>{t.note}</p></div>
 </section>;
}
