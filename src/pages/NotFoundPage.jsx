import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ArrowIcon from '../components/common/ArrowIcon';

export default function NotFoundPage() {
  const { t } = useTranslation(['projects', 'common']);

  return (
    <section className="min-h-[70svh] px-page pb-footer pt-[calc(var(--header-height)+theme(spacing.section))]">
      <h1 className="display-title mb-8 text-[clamp(58px,8vw,130px)]">
        {t('common:meta.notFoundTitle')}
      </h1>
      <Link to="/" className="text-link">
        <span>{t('common:actions.backHome')}</span>
        <ArrowIcon />
      </Link>
    </section>
  );
}
