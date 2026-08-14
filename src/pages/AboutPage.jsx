import { useTranslation } from 'react-i18next';

import Reveal from '../components/common/Reveal';

export default function AboutPage() {
  const { t } = useTranslation('about');
  const paragraphs = t('paragraphs', { returnObjects: true });
  const rows = t('rows', { returnObjects: true });

  return (
    <>
      <section className="grid grid-cols-[minmax(0,1.08fr)_minmax(260px,0.72fr)] items-start gap-[clamp(44px,8vw,140px)] px-page pb-[clamp(36px,5vw,70px)] pt-[calc(var(--header-height)+clamp(28px,4vw,70px))] max-[900px]:grid-cols-1 max-[900px]:gap-[clamp(28px,6vw,52px)] max-[900px]:pb-[clamp(24px,5vw,42px)]">
        <Reveal as="figure" className="col-start-2 row-start-1 m-0 w-full max-w-[360px] justify-self-end max-[900px]:col-start-1 max-[900px]:max-w-[220px] max-[900px]:justify-self-start">
          <img src="/assets/photo/about.webp" alt={t('photoAlt')} loading="eager" />
        </Reveal>
        <Reveal delay className="col-start-1 row-start-1 max-w-[660px] max-[900px]:row-start-2">
          <div className="space-y-[clamp(16px,2vw,24px)]">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="body-copy m-0 text-[clamp(17px,1.25vw,20px)] leading-[1.52]">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </section>
      <section className="px-page pb-[clamp(48px,8vw,72px)] pt-0">
        <Reveal>
          <p className="eyebrow mb-5">{t('background')}</p>
        </Reveal>
        <div>
          {rows.map((row) => (
            <Reveal
              key={row.join('-')}
              className="grid grid-cols-3 gap-[clamp(18px,3vw,48px)] border-t border-line py-7 text-[15px] last:border-b max-[560px]:grid-cols-1 max-[560px]:gap-2.5"
            >
              <span>{row[0]}</span>
              <span className="max-[560px]:text-muted">{row[1]}</span>
              <span>{row[2]}</span>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
