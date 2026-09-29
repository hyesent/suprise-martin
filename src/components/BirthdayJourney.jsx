import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { curatedWishes } from '../data/curatedWishes';
import { photos } from '../data/photos';
import WishForm from './WishForm';
import { supabase } from '../lib/supabase';

function AutoWishes() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  useEffect(() => { const id = setInterval(() => setIndex(i => (i + 1) % curatedWishes.length), 5500); return () => clearInterval(id); }, []);
  const wish = curatedWishes[index];
  return <section className="journey-section wishes-journey">
    <p className="journey-eyebrow">{t('journey.curated')}</p>
    <div className="wish-slide" key={wish.key}>
      <span className="wish-sender">{t(`senders.${wish.senderKey}`)}</span>
      <p>{t(wish.messageKey)}</p>
    </div>
    <div className="slide-count">{String(index + 1).padStart(2, '0')} / {String(curatedWishes.length).padStart(2, '0')}</div>
  </section>;
}

function Community() {
  const { t } = useTranslation();
  const [wishes, setWishes] = useState([]);
  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data } = await supabase.from('wishes').select('*').eq('status', 'approved').order('created_at', { ascending: true });
      if (active && data) setWishes(data);
    };
    load();
    const channel = supabase.channel('approved-wishes-journey').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'wishes', filter: 'status=eq.approved' }, load).subscribe();
    return () => { active = false; supabase.removeChannel(channel); };
  }, []);
  return <section className="journey-section community-journey">
    <p className="journey-eyebrow">{t('community.title')}</p>
    {wishes.length ? <div className="community-list">{wishes.slice(0, 8).map(w => <article key={w.id}><strong>{w.name}</strong><p>{w.message}</p></article>)}</div> : <p className="journey-muted">{t('community.empty')}</p>}
  </section>;
}

function PhotoJourney() {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  useEffect(() => { const id = setInterval(() => setIndex(i => (i + 1) % photos.length), 6000); return () => clearInterval(id); }, []);
  const go = d => setIndex(i => (i + d + photos.length) % photos.length);
  const p = photos[index];
  return <section className="journey-section photo-journey">
    <div className="photo-counter">{String(index + 1).padStart(2, '0')} / 07</div>
    <img className="journey-photo" src={p.src} alt={p.caption} />
    <p className="journey-caption">{p.caption || t('photos.moment')}</p>
    <div className="photo-controls"><button onClick={() => go(-1)}>←</button><button onClick={() => go(1)}>→</button></div>
  </section>;
}

export default function BirthdayJourney({ onFinish }) {
  const { t } = useTranslation();
  return <div className="birthday-journey">
    <section className="birthday-reveal-hero">
      <span>{t('birthday.revealKicker')}</span>
      <h1>{t('birthday.happy')}</h1>
      <strong>MARTIN</strong>
      <p>30 SEPTEMBER 2026</p>
    </section>
    <AutoWishes />
    <Community />
    <section className="journey-section new-year-journey">
      <p className="journey-eyebrow">{t('wishes.title')}</p>
      <div className="progressive-wishes">{['health','people','experiences','peace','smile','days'].map((key, i) => <span key={key} style={{animationDelay:`${i * 1.1}s`}}>{t(`wishes.${key}`)}</span>)}</div>
    </section>
    <PhotoJourney />
    <section className="journey-section personal-journey">
      <p className="journey-eyebrow">{t('journey.personal')}</p>
      <h2>{t('birthday.happy')}</h2>
      <p>{t('message.text')}</p>
    </section>
    <section className="journey-section final-journey">
      <h2>{t('finale.happy')}</h2>
      <p>{t('finale.date')}</p>
      <span>{t('finale.thanks')}</span>
      <button className="journey-finish" onClick={onFinish}>{t('journey.enterSite')} ↓</button>
    </section>
  </div>;
}
