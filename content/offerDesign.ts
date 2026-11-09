import type { Locale, OfferSlug } from "@/lib/i18n";

type Design = {
 dimension:string; name:string; tagline:string; question:string; situation:string;
 lead:string; result:string; cta:string; closing:string;
 features:{title:string;text:string}[];
 start:{name:string;text:string;deliverables:string};
};

/** Start with the customer's problem; explain only what helps them choose. */
export const offerDesign:Record<Locale,Record<OfferSlug,Design>>={
 fr:{
  "ways-of-working":{
   dimension:"WORK",name:"Mieux travailler avec l’IA.",
   tagline:"Des agents qui comprennent votre contexte, connaissent vos méthodes et vous aident dans votre travail.",
   question:"Vous utilisez l’IA, mais elle passe à côté de l’essentiel ?",
   situation:"Vous répétez le contexte, corrigez des réponses trop générales et chacun travaille à sa façon.",
   lead:"Nous partons du travail de votre équipe pour adapter les agents à vos connaissances, à vos priorités et à vos façons de faire.",
   features:[
    {title:"Moins réexpliquer",text:"Donner aux agents accès aux bonnes informations : vos documents, votre vocabulaire et vos décisions utiles."},
    {title:"Obtenir un travail plus pertinent",text:"Préparer une réunion, rechercher une information ou rédiger un document selon vos critères, avec vérification."},
    {title:"Trouver une méthode commune",text:"Tester les usages avec l’équipe et partager les méthodes qui fonctionnent, sans imposer une seule manière de penser."},
   ],
   result:"Des agents adaptés à une première activité, des connaissances organisées et une méthode que votre équipe peut reprendre et faire évoluer.",
   cta:"Parlons de votre travail",closing:"Qu’aimeriez-vous mieux faire avec l’IA ?",
   start:{name:"Partir de vos usages.",text:"Nous regardons avec vous une activité concrète : ce qui prend du temps, ce qui fonctionne déjà et ce que les agents comprennent mal.",deliverables:"Un diagnostic des usages, des priorités claires et une proposition de première expérimentation."},
  },
  solutions:{
   dimension:"SYSTEMS",name:"Automatiser une activité.",
   tagline:"Des agents qui connaissent vos règles métier et font avancer vos dossiers, avec les bons contrôles.",
   question:"Un processus prend trop de temps à votre équipe ?",
   situation:"Rechercher, recopier, qualifier, relancer : les mêmes opérations se répètent entre plusieurs outils.",
   lead:"Nous construisons une solution sur un processus précis, en reliant vos informations, vos outils et vos règles métier.",
   features:[
    {title:"Réduire les tâches répétitives",text:"Rechercher des informations, préparer des documents ou mettre à jour un dossier dans un périmètre défini."},
    {title:"Tenir compte de vos règles",text:"Donner aux agents les définitions, critères et exceptions qui permettent de traiter vos situations métier."},
    {title:"Garder la main",text:"Définir ce que l’agent peut faire, ce qu’il doit faire vérifier et quand il doit passer le relais."},
   ],
   result:"Une solution testée sur un processus réel, avec des critères de réussite, des contrôles et des limites explicites.",
   cta:"Parlons de votre processus",closing:"Quelle activité voulez-vous simplifier ?",
   start:{name:"Choisir le bon processus.",text:"Nous examinons le parcours actuel, les tâches répétitives, les données disponibles et les exceptions.",deliverables:"Un diagnostic de faisabilité, un périmètre prioritaire et une proposition de première réalisation."},
  },
  engineering:{
   dimension:"FOUNDATIONS",name:"Fiabiliser vos systèmes IA.",
   tagline:"Des agents connectés aux bonnes informations, avec les bons droits et un fonctionnement que vous pouvez suivre.",
   question:"Vos prototypes sont prêts, mais la mise en production bloque ?",
   situation:"Les accès, les connexions, les coûts et les responsabilités restent à clarifier avant d’aller plus loin.",
   lead:"Nous examinons votre architecture et définissons ce qu’il faut pour connecter, déployer et exploiter vos agents dans votre organisation.",
   features:[
    {title:"Maîtriser les accès",text:"Définir qui peut consulter quelles informations et quelles actions chaque agent est autorisé à réaliser."},
    {title:"Relier les systèmes",text:"Organiser les connexions aux données, aux modèles et aux outils métier en tenant compte de votre existant."},
    {title:"Suivre le fonctionnement",text:"Prévoir les évaluations, les traces, les coûts et la gestion des incidents pour exploiter les agents dans la durée."},
   ],
   result:"Une architecture cible et un plan de mise en œuvre, avec les décisions, les dépendances et les responsabilités à clarifier.",
   cta:"Parlons de vos systèmes",closing:"Qu’est-ce qui bloque votre mise en production ?",
   start:{name:"Faire le point sur l’existant.",text:"Un audit d’architecture pour identifier les obstacles, les risques et les décisions à prendre avant le déploiement.",deliverables:"Un état des lieux, des recommandations priorisées et une trajectoire de mise en œuvre. Cet audit ne vaut pas certification de sécurité."},
  },
 },
 en:{
  "ways-of-working":{
   dimension:"WORK",name:"Work better with AI.",tagline:"Agents that understand your context, know your methods and help with your work.",
   question:"Using AI, but missing what matters?",situation:"You keep repeating the context, correcting generic responses, while everyone works in their own way.",
   lead:"We start with your team’s work and adapt agents to your knowledge, priorities and methods.",
   features:[{title:"Explain less, reuse more",text:"Give agents access to the right information: your documents, vocabulary and relevant decisions."},{title:"Get more relevant work",text:"Prepare meetings, find information and draft documents using your criteria, with checks."},{title:"Build shared methods",text:"Test uses with the team and share what works, while leaving room for different perspectives."}],
   result:"Agents adapted to a first activity, organised knowledge and a method your team can reuse and improve.",cta:"Let’s talk about your work",closing:"What would you like to do better with AI?",
   start:{name:"Start with how you work.",text:"Together we examine a real activity: what takes time, what already works and what agents get wrong.",deliverables:"An assessment of current uses, clear priorities and a proposal for a first experiment."},
  },
  solutions:{
   dimension:"SYSTEMS",name:"Automate an activity.",tagline:"Agents that know your business rules and move cases forward, with the right controls.",
   question:"Is a process taking too much of your team’s time?",situation:"Searching, copying, qualifying and following up: the same operations repeat across different tools.",
   lead:"We build a solution for a specific process, connecting your information, tools and business rules.",
   features:[{title:"Reduce repetitive tasks",text:"Find information, prepare documents or update a case within a defined scope."},{title:"Apply your business rules",text:"Provide the definitions, criteria and exceptions needed to handle your business situations."},{title:"Stay in control",text:"Define what an agent may do, what needs review and when to hand over to a person."}],
   result:"A solution tested on a real process, with success criteria, controls and explicit limits.",cta:"Let’s talk about your process",closing:"Which activity would you like to simplify?",
   start:{name:"Choose the right process.",text:"We examine the current workflow, repetitive tasks, available data and exceptions.",deliverables:"A feasibility assessment, a priority scope and a proposal for a first implementation."},
  },
  engineering:{
   dimension:"FOUNDATIONS",name:"Make your AI systems reliable.",tagline:"Agents connected to the right information, with appropriate permissions and operations you can monitor.",
   question:"Are your prototypes ready, but deployment is blocked?",situation:"Access, connections, costs and responsibilities still need to be clarified before going further.",
   lead:"We review your architecture and define what is needed to connect, deploy and operate agents in your organisation.",
   features:[{title:"Control access",text:"Define who can consult which information and what each agent is allowed to do."},{title:"Connect systems",text:"Organise connections to data, models and business tools around your existing systems."},{title:"Monitor operations",text:"Plan evaluation, traces, costs and incident handling for ongoing operation."}],
   result:"A target architecture and an implementation plan, including decisions, dependencies and responsibilities to clarify.",cta:"Let’s talk about your systems",closing:"What is blocking your deployment?",
   start:{name:"Review what you have.",text:"An architecture assessment to identify obstacles, risks and decisions before deployment.",deliverables:"A current-state review, prioritised recommendations and an implementation path. This is not a security certification."},
  },
 },
};
