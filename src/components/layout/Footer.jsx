import { useTranslation } from 'react-i18next';

import ExternalLink from '../common/ExternalLink';
import { socialLinks } from '../../data/socialLinks';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="grid grid-cols-2 items-end gap-10 px-page pb-[42px] pt-footer max-[560px]:grid-cols-1">
      <p className="m-0 justify-self-start text-[13px]">
        <span>{t('footer.copyright')}</span> <span>{year}</span>
      </p>
      <div className="social-links justify-end max-[560px]:justify-start">
        {socialLinks.map((link) => (
          <ExternalLink key={link.id} link={link} />
        ))}
      </div>
    </footer>
  );
}
