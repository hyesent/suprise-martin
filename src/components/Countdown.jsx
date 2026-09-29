import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const TARGET_MS = Date.UTC(2026, 8, 30, 0, 0, 0);
const COPENHAGEN = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Copenhagen',
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit',
  hourCycle: 'h23',
});

function copenhagenWallClockMs() {
  const parts = Object.fromEntries(COPENHAGEN.formatToParts(new Date()).filter(p => p.type !== 'literal').map(p => [p.type, p.value]));
  return Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
}

function getTimeLeft() {
  const diff = TARGET_MS - copenhagenWallClockMs();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: false,
  };
}

export default function Countdown({ onUnlock }) {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const tick = () => {
      const next = getTimeLeft();
      setTimeLeft(next);
      if (next.done) onUnlock?.();
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [onUnlock]);

  const values = useMemo(() => [
    [timeLeft.days, t('countdown.days')],
    [timeLeft.hours, t('countdown.hours')],
    [timeLeft.minutes, t('countdown.minutes')],
    [timeLeft.seconds, t('countdown.seconds')],
  ], [timeLeft, t]);

  return (
    <div className="countdown-lock">
      <div className="countdown-grid">
        {values.map(([value, label]) => (
          <div className="countdown-cell" key={label}>
            <span className="countdown-value">{String(value).padStart(2, '0')}</span>
            <span className="countdown-label">{label}</span>
          </div>
        ))}
      </div>
      <p className="countdown-subtitle">{timeLeft.done ? t('countdown.unlocked') : t('countdown.subtitle')}</p>
    </div>
  );
}
