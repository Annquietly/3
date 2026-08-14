import { useTranslation } from 'react-i18next';

import ArrowIcon from './ArrowIcon';

export default function ExternalLink({ link, className = '' }) {
  const { t } = useTranslation();
  const label = t(link.labelKey);
  const externalProps = link.external
    ? {
        target: '_blank',
        rel: 'noreferrer',
        'aria-label': t('links.externalAria', { label }),
      }
    : {};

  return (
    <a href={link.href} className={`text-link ${className}`} {...externalProps}>
      <span>{label}</span>
      <ArrowIcon />
    </a>
  );
}
