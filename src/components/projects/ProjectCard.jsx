import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Reveal from '../common/Reveal';

export default function ProjectCard({ project, index }) {
  const { t } = useTranslation(['projects', 'common']);
  const title = t(`projects:items.${project.id}.title`);
  const summary = t(`projects:items.${project.id}.summary`);

  return (
    <Reveal as="article" id={project.id} className="h-full scroll-mt-28">
      <Link
        to={`/project/${project.id}`}
        className="project-tile group h-full"
        aria-label={t('common:actions.openProject', { title })}
      >
        <div className="flex items-start justify-between gap-[18px]">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="project-tag">{t(`common:categories.${project.category}`)}</span>
          </div>
          <span className="text-lg font-semibold tracking-[0.04em] text-ink/80 max-[560px]:text-[15px]">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <div className="project-tile__image mt-[clamp(14px,2vw,24px)]" aria-hidden="true">
          <img
            src={project.cover}
            alt=""
            className="h-full max-h-full w-full object-contain p-[clamp(10px,1.8vw,26px)] transition duration-500 ease-smooth group-hover:scale-[1.025]"
            loading={index < 2 ? 'eager' : 'lazy'}
          />
        </div>
        <div className="flex flex-1 flex-col justify-between gap-[clamp(18px,2.4vw,28px)]">
         <h2 className="m-0 whitespace-nowrap font-serif text-[clamp(28px,3.25vw,52px)] font-normal leading-[0.98] tracking-[-0.04em] text-ink">
  {title}
</h2>
          <p className="body-copy m-0 max-w-[540px] text-[clamp(14px,1.1vw,16px)] leading-[1.46]">
            {summary}
          </p>
        </div>
      </Link>
    </Reveal>
  );
}
