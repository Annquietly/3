import { useTranslation } from 'react-i18next';

import ExternalLink from '../../components/common/ExternalLink';
import Reveal from '../../components/common/Reveal';
import { socialLinks } from '../../data/socialLinks';
import HeroParallax from './HeroParallax';
import VariableProximityText from './VariableProximityText';

export default function Hero() {
  const { t } = useTranslation(['home', 'common']);

  return (
    <section
      className="relative grid min-h-svh grid-rows-[1fr_auto] overflow-hidden px-page pb-[5vh] pt-[calc(var(--header-height)+8vh)] max-[900px]:min-h-0 max-[900px]:pt-[calc(var(--header-height)+28px)] max-[900px]:pb-[clamp(34px,7vw,60px)]"
      id="home"
    >
      <HeroParallax />
      <Reveal className="relative z-[2] mb-20 max-w-[min(100%,1060px)] self-center select-none max-[900px]:mb-[clamp(34px,7vw,56px)] max-[900px]:self-start">
        <p className="eyebrow mb-5">{t('eyebrow')}</p>
        <VariableProximityText
          ariaLabel={t('titleAria')}
          lines={[
            { key: 'hello', text: t('hello') },
            { key: 'name', text: t('name'), italic: true },
            { key: 'role', text: t('role') },
          ]}
        />
      </Reveal>
      <Reveal
        delay
        className="relative z-[2] grid grid-cols-[minmax(240px,560px)_1fr] items-end gap-10 max-[900px]:grid-cols-1 max-[900px]:gap-[22px]"
      >
        <p className="body-copy m-0 max-w-[560px] text-[clamp(16px,1.4vw,20px)] max-[900px]:max-w-full">
          {t('intro')}
        </p>
        <div className="social-links justify-end self-end max-[900px]:justify-start">
          {socialLinks.map((link) => (
            <ExternalLink key={link.id} link={link} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
