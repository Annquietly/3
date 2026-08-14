import { useTranslation } from 'react-i18next';

import { supportedLanguages } from '../../i18n';
import { cn } from '../../lib/cn';

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const setLanguage = (language) => {
    if (language !== i18n.language) void i18n.changeLanguage(language);
  };

  return (
    <div
      className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted max-[560px]:text-xs"
      aria-label={t('language.label')}
    >
      {supportedLanguages.map((language, index) => (
        <span key={language} className="inline-flex items-center gap-1.5">
          {index > 0 ? <span aria-hidden="true">/</span> : null}
          <button
            type="button"
            className={cn(
              'transition-colors duration-200 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink',
              i18n.language === language && 'text-ink',
            )}
            aria-label={t(`language.${language}`)}
            aria-pressed={i18n.language === language}
            onClick={() => setLanguage(language)}
          >
            {language.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
