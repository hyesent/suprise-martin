import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { curatedWishes } from '../data/curatedWishes';
import { photos } from '../data/photos';
import { supabase } from '../lib/supabase';
import LanguageToggle from './LanguageToggle';
import DeveloperReveal from './DeveloperReveal';

function WishesSlideshow() {
  const { t } = useTranslation(); const [index, setIndex] = useState(0);
  useEffect(() => { const id = setInterval(() => setIndex(i => (i + 1) % curatedWishes.length), 5000); return () => clearInterval(id); }, []);
  const wish = curatedWishes[index];
  return <div className="main-slideshow"><div className="main-wish" key={wish.key}><span>{t(`senders.${wish.senderKey}`)}</span><p>{t(wish.messageKey)}</p></div><div className="slide-controls"><button onClick={() => setIndex(i => (i - 1 + curatedWishes.length) % curatedWishes.length)}>←</button><small>{String(index + 1).padStart(2,'0')} / {String(curatedWishes.length).padStart(2,'0')}</small><button onClick={() => setIndex(i => (i + 1) % curatedWishes.length)}>→</button></div></div>;
}

function CommunityWishes() {
  const { t } = useTranslation(); const [wishes, setWishes] = useState([]);
  useEffect(() => { let active = true; const load = async () => { const { data } = await supabase.from('wishes').select('*').eq('status','approved').order('created_at',{ascending:true}); if(active && data) setWishes(data); }; load(); const ch = supabase.channel('approved-wishes-main').on('postgres_changes',{event:'*',schema:'public',table:'wishes'},load).subscribe(); return () => { active=false; supabase.removeChannel(ch); }; }, []);
  return <div className="community-main">{wishes.length ? wishes.map(w => <article key={w.id}><span>{w.name}</span><p>{w.message}</p></article>) : <p className="empty-main">{t('community.empty')}</p>}</div>;
}

function PhotoSlideshow() {
  const { t } = useTranslation(); const [index, setIndex] = useState(0);
  useEffect(() => { const id = setInterval(() => setIndex(i => (i + 1) % photos.length), 5200); return () => clearInterval(id); }, []);
  const go = d => setIndex(i => (i + d + photos.length) % photos.length); const p = photos[index];
  return <div className="main-photo-slideshow"><div className="main-photo-wrap"><img src={p.src} alt={p.caption} /></div><div className="main-photo-meta"><small>{String(index+1).padStart(2,'0')} / 07</small><p>{p.caption || t('photos.moment')}</p><div><button onClick={() => go(-1)}>←</button><button onClick={() => go(1)}>→</button></div></div></div>;
}

export default function MainWebsite() {
  const { t } = useTranslation(); const [developerOpen, setDeveloperOpen] = useState(false);
  if (developerOpen) return <DeveloperReveal onClose={() => setDeveloperOpen(false)} />;
  return <main className="main-website">
    <header className="main-header"><span>30.09.2026</span><LanguageToggle /></header>
    <section className="site-hero">
      <div className="hero-portrait"><img src="/photos/image-7.jpg" alt="Martin Mouritzen" /></div>
      <p className="site-kicker">{t('main.heroKicker')}</p><h1>HAPPY BIRTHDAY</h1><h2>MARTIN MOURITZEN</h2><p className="family-greeting">{t('wishesText.family')}</p>
    </section>
    <section className="main-section family-section"><span className="main-label">01</span><div><p className="main-eyebrow">{t('main.familyTitle')}</p><h2>{t('wishesText.family')}</h2></div></section>
    <section className="main-section wishes-section"><span className="main-label">02</span><div><p className="main-eyebrow">{t('main.wishesTitle')}</p><WishesSlideshow /></div></section>
    <section className="main-section community-section"><span className="main-label">03</span><div><p className="main-eyebrow">{t('community.title')}</p><h2>{t('main.communityIntro')}</h2><CommunityWishes /></div></section>
    <section className="main-section memories-section"><span className="main-label">04</span><div><p className="main-eyebrow">{t('main.memoriesTitle')}</p><PhotoSlideshow /></div></section>
    <section className="main-section message-section"><span className="main-label">05</span><div><p className="main-eyebrow">{t('main.messageTitle')}</p><h2>{t('message.text')}</h2></div></section>
    <section className="main-section new-year-section"><span className="main-label">06</span><div><p className="main-eyebrow">{t('wishes.title')}</p><div className="main-progressive">{['health','people','experiences','peace','smile','days'].map(k => <span key={k}>{t(`wishes.${k}`)}</span>)}</div></div></section>
    <section className="main-section send-wish-section"><div><p className="main-eyebrow">{t('main.communityInvite')}</p><WishForm onNext={() => {}} compact /></div></section>
    <footer className="main-footer"><p>30.09.2026</p><button onClick={() => setDeveloperOpen(true)}>{t('developerButton')}</button></footer>
  </main>;
}
