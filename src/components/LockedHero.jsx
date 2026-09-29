import React from 'react';
import { useTranslation } from 'react-i18next';
import Countdown from './Countdown';

const photos = Array.from({ length: 7 }, (_, i) => `/photos/image-${i + 1}.jpg`);

export default function LockedHero({ onUnlock }) {
  const { t } = useTranslation();
  return (
    <main className="locked-experience">
      <div className="locked-topline">
        <span>30.09.2026</span>
        <span>{t('countdown.locked')}</span>
      </div>
      <section className="locked-hero" aria-label="Birthday countdown">
        <div className="photo-orbit" aria-hidden="true">
          {photos.map((src, index) => (
            <div className={`orbit-photo orbit-photo-${index + 1}`} key={src}>
              <img src={src} alt="" />
            </div>
          ))}
          <div className="orbit-center">
            <span className="orbit-kicker">{t('hero.kicker')}</span>
            <h1>MARTIN MOURITZEN</h1>
            <p>30 SEPTEMBER 2026</p>
          </div>
        </div>
        <p className="hero-greeting">{t('wishesText.family')}</p>
        <Countdown onUnlock={onUnlock} />
        <p className="lock-note">{t('countdown.lockNote')}</p>
      </section>
    </main>
  );
}
