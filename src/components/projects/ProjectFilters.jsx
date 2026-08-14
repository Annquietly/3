import { useTranslation } from 'react-i18next';

import { projectCategories } from '../../data/projects';
import { cn } from '../../lib/cn';

export default function ProjectFilters({ activeCategory, onChange }) {
  const { t } = useTranslation(['common', 'work']);

  return (
    <div className="filters-wrap mb-[clamp(44px,6vw,78px)]">
      <nav
        className="flex w-full items-center gap-[clamp(18px,2.25vw,36px)] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-[560px]:mr-[calc(theme(spacing.page)*-1)] max-[560px]:gap-6 max-[560px]:pr-[calc(theme(spacing.page)+48px)]"
        aria-label={t('work:filtersAria')}
      >
        {projectCategories.map((category) => (
          <button
            key={category}
            type="button"
            className={cn('filter-button', activeCategory === category && 'is-active')}
            aria-pressed={activeCategory === category}
            onClick={() => onChange(category)}
          >
            {t(`common:categories.${category}`)}
          </button>
        ))}
      </nav>
    </div>
  );
}
