import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ArrowIcon from '../components/common/ArrowIcon';
import Reveal from '../components/common/Reveal';
import ProjectGallery from '../components/projects/ProjectGallery';
import { getProjectById } from '../data/projects';

export default function ProjectPage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation(['projects', 'common']);
  const project = getProjectById(id);

  const title = project ? t(`projects:items.${project.id}.title`) : t('projects:notFound');

  useEffect(() => {
    if (!project) return;
    document.title = `${title} - ${t('common:author.name')}`;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute('content', t(`projects:items.${project.id}.summary`));
  }, [i18n.language, project, t, title]);

  if (!project) {
    return (
      <section className="min-h-[70svh] px-page pb-footer pt-[calc(var(--header-height)+theme(spacing.section))]">
        <p className="eyebrow mb-5">{t('projects:notFound')}</p>
        <Link to="/work" className="text-link">
          <span>{t('projects:backToWork')}</span>
          <ArrowIcon />
        </Link>
      </section>
    );
  }

  return (
    <>
      <section className="flex min-h-[min(54svh,560px)] flex-col justify-end px-page pb-[clamp(34px,5vw,68px)] pt-[calc(var(--header-height)+clamp(28px,4vw,70px))] max-[560px]:min-h-[48svh]">
        <Reveal as="h1" className="display-title max-w-[1300px] text-[clamp(64px,10vw,170px)]">
          {title}
        </Reveal>
        <Reveal delay as="p" className="m-0 mt-[clamp(28px,4vw,52px)] text-[clamp(16px,1.4vw,20px)] text-muted">
          <span className="mr-2 text-ink">{t('projects:duration')}</span>{' '}
          {t(`projects:durationValues.${project.duration}`)}{' '}
          <span aria-hidden="true">/</span>
          <span className="mx-2 text-ink">{t('projects:year')}</span> {project.year}
        </Reveal>
      </section>
      <Reveal>
        <ProjectGallery project={project} title={title} />
      </Reveal>
      <section className="grid grid-cols-3 gap-[clamp(28px,5vw,84px)] px-page pb-[clamp(72px,8vw,112px)] pt-[clamp(44px,5vw,72px)] max-[900px]:grid-cols-1">
        {['done', 'task', 'result'].map((key) => (
          <Reveal key={key} className="max-w-[640px]">
            <p className="eyebrow mb-[18px]">{t(`projects:${key}`)}</p>
            <p className="body-copy m-0 max-w-[420px] text-[clamp(16px,1.4vw,20px)]">
              {t(`projects:items.${project.id}.${key}`)}
            </p>
          </Reveal>
        ))}
      </section>
      <section className="flex items-baseline justify-between px-page pb-[clamp(32px,5vw,70px)] pt-[30px]">
        <p className="eyebrow m-0">{t('projects:latestWork')}</p>
        <Link to="/work" className="text-link">
          <span>{t('projects:work')}</span>
          <ArrowIcon />
        </Link>
      </section>
    </>
  );
}
