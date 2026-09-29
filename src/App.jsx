import React, { useEffect, useRef, useState } from 'react';
import { Howl, Howler } from 'howler';
import { useTranslation } from 'react-i18next';
import LockedHero from './components/LockedHero';
import BirthdayJourney from './components/BirthdayJourney';
import MainWebsite from './components/MainWebsite';
import LanguageToggle from './components/LanguageToggle';
import SoundToggle from './components/SoundToggle';

export default function App() {
  const { i18n } = useTranslation();
  const [stage, setStage] = useState('locked');
  const [soundOn, setSoundOn] = useState(false);
  const audioReady = useRef(false);
  const ambient = useRef(null);
  const transition = useRef(null);

  useEffect(() => {
    i18n.changeLanguage('da');
    ambient.current = new Howl({ src: ['/sounds/ambient.mp3'], loop: true, volume: 0.18, html5: true });
    transition.current = new Howl({ src: ['/sounds/transition.mp3'], volume: 0.35, html5: true });
    return () => { ambient.current?.unload(); transition.current?.unload(); };
  }, [i18n]);

  const unlockAudio = () => {
    if (audioReady.current) return;
    audioReady.current = true;
    Howler.ctx?.resume?.();
  };
  const toggleSound = () => {
    unlockAudio();
    if (soundOn) { ambient.current?.fade(ambient.current.volume(), 0, 500); setTimeout(() => ambient.current?.pause(), 550); }
    else { ambient.current?.play(); ambient.current?.fade(0, 0.18, 900); }
    setSoundOn(v => !v);
  };
  const beginBirthday = () => { unlockAudio(); transition.current?.play(); setStage('journey'); window.scrollTo(0,0); };
  const finishJourney = () => { transition.current?.play(); setStage('website'); window.scrollTo(0,0); };

  if (stage === 'website') return <MainWebsite />;
  return <div className={`app app-${stage}`} onPointerDown={unlockAudio}>
    <div className="experience-controls"><LanguageToggle /><SoundToggle soundOn={soundOn} onToggle={toggleSound} /></div>
    {stage === 'locked' && <LockedHero onUnlock={beginBirthday} />}
    {stage === 'journey' && <BirthdayJourney onFinish={finishJourney} />}
  </div>;
}
