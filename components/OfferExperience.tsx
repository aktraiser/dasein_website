"use client";

import { useState } from "react";
import type { Locale, OfferSlug } from "@/lib/i18n";

type Choice = { label: string; interpretation: string; outcome: string; human: string };
const WORK: Record<Locale, Choice[]> = {
 fr:[
  {label:"A · Agent généraliste",interpretation:"Sans critères propres à l’entreprise, le mot « importantes » reste ambigu.",outcome:"L’agent devrait demander ce que vous entendez par « importantes ».",human:"Une interprétation fondée uniquement sur le montant serait une hypothèse à vérifier."},
  {label:"B · Agent + documents",interpretation:"La recherche donne accès aux dossiers, montants et échéances documentés.",outcome:"Les documents apportent des faits, mais pas nécessairement les critères de priorité.",human:"Vous vérifiez si les sources permettent réellement de déterminer ce qui compte."},
  {label:"C · Agent + corpus contextualisé",interpretation:"Le corpus indique ici : engagements anciens, échéances urgentes et dossiers stratégiques. Chaque critère est relié à une source validée.",outcome:"Ces critères peuvent guider une proposition de classement à vérifier.",human:"Vous pouvez corriger les critères ou demander une autre lecture. Ce scénario illustre un mécanisme ; il ne mesure aucune amélioration."},
 ],
 en:[
  {label:"A · General-purpose agent",interpretation:"Without company-specific criteria, the word ‘important’ is ambiguous.",outcome:"The agent should ask what ‘important’ means to you.",human:"Ranking only by value would be an assumption to check."},
  {label:"B · Agent + documents",interpretation:"Retrieval provides documented cases, amounts and deadlines.",outcome:"Documents provide facts, but not necessarily priority criteria.",human:"You check whether the sources actually establish what matters."},
  {label:"C · Agent + contextualised corpus",interpretation:"Here the corpus specifies longstanding commitments, urgent deadlines and strategic cases. Each criterion is linked to a validated source.",outcome:"These criteria can guide a proposed ranking for review.",human:"You can correct the criteria or request a different interpretation. This scenario illustrates a mechanism; it measures no improvement."},
 ],
};
const SYSTEMS: Record<Locale, Choice[]> = {
 fr:[
  {label:"Une pièce manque",interpretation:"L’activité ne peut pas être qualifiée avec les éléments disponibles.",outcome:"Demander une clarification. Aucune action dans le système métier.",human:"La personne apporte le contexte nécessaire avant de poursuivre."},
  {label:"Le dossier est complet",interpretation:"Les éléments répondent aux règles et au périmètre définis pour ce cas fictif.",outcome:"Préparer une mise à jour et la soumettre à validation.",human:"La personne vérifie la proposition avant son exécution."},
  {label:"Une exception apparaît",interpretation:"Une règle habituelle ne suffit pas à déterminer la bonne action.",outcome:"Suspendre l’exécution et transmettre l’exception à une personne.",human:"La personne arbitre ; sa décision peut conduire à réviser la méthode."},
 ],
 en:[
  {label:"A document is missing",interpretation:"The available information is insufficient to assess the case.",outcome:"Ask for clarification. No action in the business system.",human:"A person provides the missing context before proceeding."},
  {label:"The case is complete",interpretation:"The information meets the rules and scope defined for this fictional case.",outcome:"Prepare an update and submit it for approval.",human:"A person checks the proposal before execution."},
  {label:"An exception appears",interpretation:"The usual rule cannot determine the right action.",outcome:"Pause execution and escalate the exception to a person.",human:"The person decides; their decision may lead to a revised method."},
 ],
};

function Alternatives({ items, lang }: { items: Choice[]; lang: Locale }) {
 return <details className="experience-alternatives"><summary>{lang === "fr" ? "Lire toutes les possibilités" : "Read all possibilities"}</summary><dl>{items.map(item => <div key={item.label}><dt>{item.label}</dt><dd>{item.interpretation} {item.outcome} {item.human}</dd></div>)}</dl></details>;
}
function Work({ lang }: { lang: Locale }) {
 const [choice, setChoice] = useState(0); const items=WORK[lang];const current=items[choice];
 return <div className="experience-work">
  <p className="experience-situation">{lang === "fr" ? "« Prépare les opportunités importantes de cette semaine. »" : "“Prepare this week’s important opportunities.”"}</p>
  <fieldset className="experience-choices"><legend>{lang === "fr" ? "Comparez le contexte disponible" : "Compare the available context"}</legend>{items.map((item,index)=><label key={item.label}><input type="radio" name="work-choice" checked={choice===index} onChange={()=>setChoice(index)} /><span>{item.label}</span></label>)}</fieldset>
  <div className="experience-work__paths" aria-hidden="true" data-choice={choice}><span>01</span><i /><span>02</span><i /><span>03</span></div>
  <div className="experience-result" role="status" aria-atomic="true"><p className="offer-caption">{lang === "fr" ? "Lecture illustrative, pas une réponse réellement générée" : "Illustrative reading, not an actual generated response"}</p><p>{current.interpretation}</p><h4>{current.outcome}</h4><p className="experience-human">{current.human}</p></div>
  <p className="experience-human">{lang === "fr" ? "À tester pendant la mission : même modèle, mêmes outils, mêmes tâches dans les trois configurations. Nous mesurons l’adéquation à l’intention, l’exactitude, les contraintes respectées, les clarifications, les erreurs et le coût. Aucun résultat n’est présumé : une mémoire obsolète ou non pertinente peut aussi dégrader le travail." : "To test during the engagement: the same model, tools and tasks across all three configurations. We measure alignment with intent, factual accuracy, constraints, clarifications, errors and cost. No result is assumed: outdated or irrelevant memory can also make the work worse."}</p>
  <Alternatives items={items} lang={lang} />
 </div>;
}
function Systems({lang}:{lang:Locale}) {
 const [choice,setChoice]=useState(0);const items=SYSTEMS[lang];const current=items[choice];
 return <div className="experience-systems"><p className="experience-situation">{lang==="fr" ? "« Traite ce dossier. »" : "“Handle this case.”"}</p>
  <fieldset className="experience-choices"><legend>{lang==="fr" ? "Changez le contexte" : "Change the context"}</legend>{items.map((item,index)=><label key={item.label}><input type="radio" name="systems-choice" checked={choice===index} onChange={()=>setChoice(index)} /><span>{item.label}</span></label>)}</fieldset>
  <div className="experience-flow" role="status" aria-atomic="true"><article><p className="offer-caption">{lang==="fr" ? "Intention" : "Intention"}</p><h4>{lang==="fr" ? "Faire avancer le dossier" : "Move the case forward"}</h4></article><article><p className="offer-caption">{lang==="fr" ? "Interprétation" : "Interpretation"}</p><p>{current.interpretation}</p></article><article className="experience-flow__consequence"><p className="offer-caption">{lang==="fr" ? "Conséquence" : "Consequence"}</p><h4>{current.outcome}</h4></article></div><p className="experience-human">{current.human}</p><Alternatives items={items} lang={lang} />
 </div>;
}
function Foundations({lang}:{lang:Locale}) {
 const [identity,setIdentity]=useState(true);const [write,setWrite]=useState(false);const [approval,setApproval]=useState(false);
 const allowed=identity&&write&&approval;
 const reason=lang==="fr" ? !identity ? "Identité absente : l’action est refusée, quels que soient les autres réglages." : !write ? "Permission d’écriture absente : la validation humaine ne suffit pas à donner ce droit." : !approval ? "Permission présente : l’action attend la validation prévue par cette règle." : "Identité, permission et validation réunies : la règle de cet exemple autorise la modification." : !identity ? "No identity: the action is refused regardless of the other settings." : !write ? "No write permission: human approval does not grant that permission." : !approval ? "Permission present: the action awaits the approval required by this rule." : "Identity, permission and approval present: this example’s rule authorises the change.";
 return <div className="experience-foundations"><p className="experience-situation">{lang==="fr" ? "Action demandée : modifier une fiche client" : "Requested action: update a client record"}</p><div className="experience-foundations__grid"><fieldset className="experience-permissions"><legend>{lang==="fr" ? "Conditions de cette règle illustrative" : "Conditions of this illustrative rule"}</legend><label><input type="checkbox" checked={identity} onChange={e=>setIdentity(e.target.checked)} /><span>{lang==="fr" ? "Agent identifié : agent-dossier" : "Identified agent: case-agent"}</span></label><label><input type="checkbox" checked={write} onChange={e=>setWrite(e.target.checked)} /><span>{lang==="fr" ? "Droit d’écriture sur cette fiche" : "Write permission for this record"}</span></label><label><input type="checkbox" checked={approval} onChange={e=>setApproval(e.target.checked)} /><span>{lang==="fr" ? "Validation humaine obtenue" : "Human approval received"}</span></label></fieldset><div className="experience-gate" data-allowed={allowed} role="status" aria-atomic="true"><div className="experience-gate__mark" aria-hidden="true">{allowed ? "✓" : "—"}</div><h4>{lang==="fr" ? allowed ? "Action autorisée dans l’exemple" : "Action non exécutée" : allowed ? "Action authorised in the example" : "Action not executed"}</h4><p>{reason}</p></div></div><p className="experience-human">{lang==="fr" ? "Une autorisation ne garantit pas un résultat correct. L’évaluation, les limites d’exécution et les traces restent nécessaires. Aucune donnée ni aucun système réel n’est modifié ici." : "Authorisation does not guarantee a correct result. Evaluation, execution limits and traces remain necessary. No real data or system is changed here."}</p><details className="experience-alternatives"><summary>{lang==="fr" ? "Lire la règle sans interaction" : "Read the rule without interacting"}</summary><p>{lang==="fr" ? "Cet exemple exige une identité, un droit d’écriture et une validation. Si l’un manque, la modification n’est pas exécutée. Les règles d’un système réel dépendent de son contexte et de son niveau de risque." : "This example requires an identity, write permission and approval. If one is missing, no change is executed. Real systems need rules appropriate to their context and risk."}</p></details></div>;
}
export function OfferExperience({slug,lang}:{slug:OfferSlug;lang:Locale}) {
 return <section className={`offer-experience offer-experience--${slug}`} aria-label={lang==="fr" ? "Explorer une situation" : "Explore a situation"}><p className="experience-notice">{lang==="fr" ? "Mise en situation fictive · vos choix changent l’issue · aucune exécution réelle" : "Fictional scenario · your choices change the outcome · no real execution"}</p>{slug==="ways-of-working" ? <Work lang={lang}/> : slug==="solutions" ? <Systems lang={lang}/> : <Foundations lang={lang}/>}</section>;
}
