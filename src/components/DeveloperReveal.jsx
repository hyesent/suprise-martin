import React from 'react';

const projects = [
  ['ZEPHYE', 'En smart vejrkompagnon, der forvandler live vejrdata til en mere personlig og interaktiv oplevelse.', 'https://zephye.vercel.app'],
  ['HYEZEN', 'En AI-drevet stemmeassistent bygget til at forstå, svare og hjælpe gennem naturlig samtale.', '#'],
  ['DISCYPLN', 'En fokuseret produktivitets- og selvudviklingsapp designet til at hjælpe brugere med at opbygge konsistens og holde sig på sporet.', 'https://discypln.vercel.app'],
  ['HYESCRIPTURES', 'En andagtsoplevelse, der kombinerer skrift, refleksion og interaktive funktioner til daglig åndelig engagement.', 'https://hye-scriptures.vercel.app'],
  ['HYESPACE', 'Det centrale hjem for Hye-produkter, der samler apps, konti, abonnementer og digitale oplevelser ét sted.', 'https://hyespace.vercel.app'],
];

export default function DeveloperReveal({ onClose }) {
  return <main className="developer-reveal">
    <button className="developer-close" onClick={onClose}>← TILBAGE</button>
    <div className="developer-copy"><span>PS...</span><p>Du undrer dig måske over, hvem der har lavet alt dette.</p><h1>MICHAEL HYACINTH</h1><p>Jeg bygger digitale produkter, apps og oplevelser.</p></div>
    <div className="developer-projects"><p>ET PAR TING JEG HAR BYGGET</p>{projects.map(([name, desc, url]) => <a key={name} href={url} target="_blank" rel="noreferrer"><strong>{name}</strong><span>{desc}</span><em>↗</em></a>)}</div>
  </main>;
}
