import type { Locale } from "@/lib/i18n";

type About = {label:string;title:string;lead:string;who:string;whoTitle:string;intro:string;context:string;method:string;steps:{title:string;text:string}[];nameTitle:string;name:string;reading:string;readingText:string;journal:string;offers:string;contactTitle:string;contact:string};
export const aboutPage:Record<Locale,About>={
 fr:{
  label:"À propos de Dasein",title:"Entre l’intention et l’action, il y a le sens.",
  lead:"Nous concevons des agents et des outils IA à partir de ce qui compte pour vous : votre travail, vos connaissances et vos façons de faire.",
  who:"Ce que nous apportons",whoTitle:"La technique au service de votre réalité.",
  intro:"Dasein accompagne les équipes qui veulent mieux travailler avec l’IA, automatiser une activité ou fiabiliser leurs systèmes. Nous aidons à préciser le besoin, puis nous concevons et construisons avec vous une réponse adaptée.",
  context:"Un agent ne connaît pas spontanément votre métier. Nous organisons les informations, le vocabulaire et les méthodes dont il a besoin pour tenir compte de votre contexte. Vous gardez la possibilité de corriger ses propositions et de faire évoluer ses repères.",
  method:"Notre façon de travailler",
  steps:[
   {title:"Partir du terrain",text:"Écouter les personnes, regarder le travail réel et comprendre ce qui bloque avant de proposer une solution."},
   {title:"Construire au juste besoin",text:"Choisir une activité, réaliser une première version et vérifier son utilité sur des situations concrètes."},
   {title:"Vous donner la main",text:"Expliquer les choix, documenter les limites et transmettre les méthodes pour que vos équipes puissent poursuivre."},
  ],
  nameTitle:"Pourquoi Dasein ?",name:"Dasein signifie « être-là ». Ce nom rappelle notre point de départ : une personne, une situation, un contexte. Une même technologie ne répond pas de la même façon à tous les besoins.",
  reading:"Une pratique qui se partage",readingText:"Nous publions nos analyses et nos retours d’expérience pour expliquer ce que nous construisons, les choix que nous faisons et les questions qui restent ouvertes.",journal:"Lire le journal",offers:"Découvrir nos offres",contactTitle:"Qu’aimeriez-vous faire avancer ?",contact:"Parlons de votre besoin",
 },
 en:{
  label:"About Dasein",title:"Between intention and action, there is meaning.",
  lead:"We design AI agents and tools around what matters to you: your work, your knowledge and the way you do things.",
  who:"What we bring",whoTitle:"Technology grounded in your reality.",
  intro:"Dasein helps teams work better with AI, automate an activity or make their systems reliable. We help clarify the need, then design and build an appropriate response with you.",
  context:"An agent does not automatically know your business. We organise the information, vocabulary and methods it needs to take account of your context. You retain the ability to correct its proposals and update its reference points.",
  method:"How we work",
  steps:[{title:"Start with real work",text:"Listen to people, observe their work and understand what is getting in the way before proposing a solution."},{title:"Build what is needed",text:"Choose an activity, build a first version and check its usefulness in real situations."},{title:"Put you in control",text:"Explain decisions, document limits and share methods so your team can carry the work forward."}],
  nameTitle:"Why Dasein?",name:"Dasein means ‘being there’. The name recalls our starting point: a person, a situation, a context. The same technology cannot address every need in the same way.",
  reading:"A practice we share",readingText:"We publish analysis and lessons from our work to explain what we build, the choices we make and the questions that remain open.",journal:"Read the journal",offers:"Explore our offers",contactTitle:"What would you like to move forward?",contact:"Let’s talk about your needs",
 },
};
