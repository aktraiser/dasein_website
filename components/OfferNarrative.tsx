"use client";

import { useEffect, useRef, useState } from "react";
import { offerNarratives } from "@/content/offerNarratives";
import type { Locale, OfferSlug } from "@/lib/i18n";

/** The text remains visible. Only explanatory emphasis follows reading position. */
export function OfferNarrative({slug,lang}:{slug:OfferSlug;lang:Locale}) {
 const data=offerNarratives[lang][slug]; const [active,setActive]=useState(0);
 const chapters=useRef<(HTMLElement|null)[]>([]);
 useEffect(()=>{
  let frame=0;
  const update=()=>{frame=0;const target=window.innerHeight*.52;let closest=0;let distance=Infinity;
   chapters.current.forEach((chapter,index)=>{if(!chapter)return;const box=chapter.getBoundingClientRect();const value=Math.abs(box.top+box.height/2-target);if(value<distance){distance=value;closest=index;}});
   setActive(closest);
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  update();window.addEventListener("scroll",schedule,{passive:true});window.addEventListener("resize",schedule);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",schedule);window.removeEventListener("resize",schedule);};
 },[]);
 const chapter=data.chapters[active];
 return <section className={`offer-narrative offer-narrative--${slug}`} aria-labelledby="offer-narrative-title">
  <h2 id="offer-narrative-title">{data.title}</h2>
  <div className="offer-narrative__layout">
   <figure className="offer-narrative__scene">
    <div className="narrative-visual" data-stage={active}>
     <p className="offer-caption">{lang==="fr" ? "Situation illustrative" : "Illustrative situation"}</p>
     {slug==="ways-of-working" ? <>
      <h3>{lang==="fr" ? "Préparer une réunion" : "Prepare a meeting"}</h3>
      <div className="narrative-tasks">{data.labels.map((label,index)=><div key={label} data-owner={active<2 ? "human" : index<2 ? "agent" : index<4 ? "shared" : "human"}><span>{label}</span></div>)}</div>
      <div className="narrative-key"><span data-owner="human">{lang==="fr" ? "La personne" : "The person"}</span><span data-owner="agent">{lang==="fr" ? "L’agent prépare" : "Agent preparation"}</span><span data-owner="shared">{lang==="fr" ? "Travail partagé" : "Shared work"}</span></div>
      <div className="narrative-context">{active===0 ? (lang==="fr" ? "L’expérience de la relation fait déjà partie du travail." : "Experience of the relationship is already part of the work.") : active===1 ? (lang==="fr" ? "Rendre accessibles les sources, les méthodes et leurs limites." : "Make sources, methods and their limits available.") : active===2 ? (lang==="fr" ? "Le choix de l’angle et l’engagement ne sont pas délégués." : "Perspective and commitments are not delegated.") : (lang==="fr" ? "Capitaliser : skills · mémoire · rituels de vérification" : "Build shared practice: skills · memory · review routines")}</div>
     </> : slug==="solutions" ? <>
      <h3>{lang==="fr" ? "« Traite ce dossier. »" : "“Handle this case.”"}</h3>
      <ol className="narrative-pipeline">{data.labels.map((label,index)=><li key={label} data-current={index===active}><span>{String(index+1).padStart(2,"0")}</span>{label}</li>)}</ol>
      <div className="narrative-branches">{(lang==="fr" ? ["Clarifier","Préparer","Suspendre"] : ["Clarify","Prepare","Pause"]).map((label,index)=><span key={label} data-emphasis={active===1 ? index===0 : active===2 ? index>0 : active===3}>{label}</span>)}</div>
     </> : <>
      <h3>{lang==="fr" ? "Les conditions d’une action" : "Conditions for an action"}</h3>
      <div className="narrative-foundations">{data.labels.map((label,index)=><div key={label} data-current={index===active}><span>{String(index+1).padStart(2,"0")}</span><strong>{label}</strong><i aria-hidden="true" /></div>)}</div>
      <p className="narrative-context">{lang==="fr" ? "Aucune couche ne remplace les autres." : "No layer replaces the others."}</p>
     </>}
    </div>
    <figcaption>{chapter.annotation}</figcaption>
    <nav className="narrative-chapter-links" aria-label={lang==="fr" ? "Étapes de l’explication" : "Explanation chapters"}>{data.chapters.map((item,index)=><a key={item.title} href={`#narrative-${index}`} aria-current={active===index ? "step" : undefined} aria-label={item.title}>{String(index+1).padStart(2,"0")}</a>)}</nav>
   </figure>
   <div className="offer-narrative__text">{data.chapters.map((item,index)=><article id={`narrative-${index}`} ref={element=>{chapters.current[index]=element;}} key={item.title}><p className="offer-caption">{String(index+1).padStart(2,"0")}</p><h3>{item.title}</h3><p>{item.text}</p><p>{item.explanation}</p></article>)}</div>
  </div>
 </section>;
}
