import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ArrowIcon from '../components/common/ArrowIcon';
import ProjectCard from '../components/projects/ProjectCard';
import { getFeaturedProjects } from '../data/projects';
import Hero from '../features/hero/Hero';

export default function HomePage() {
  const { t } = useTranslation('home');
  const featured = getFeaturedProjects();

  return (
    <>
      <Hero />
      <section className="px-page pb-[clamp(40px,5vw,72px)] pt-section" id="work">
        <p className="eyebrow mb-5">{t('selectedWork')}</p>
        <div className="grid grid-cols-2 gap-[22px] max-[900px]:grid-cols-1">
          {featured.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>
      <section className="flex justify-end px-page pb-footer">
        <Link to="/work" className="text-link">
          <span>{t('more')}</span>
          <ArrowIcon />
        </Link>
      </section>
    </>
  );
}
