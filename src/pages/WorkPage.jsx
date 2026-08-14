import { useMemo, useState } from 'react';

import ProjectCard from '../components/projects/ProjectCard';
import ProjectFilters from '../components/projects/ProjectFilters';
import { getProjectsByCategory } from '../data/projects';

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = useMemo(
    () => getProjectsByCategory(activeCategory),
    [activeCategory],
  );

  return (
    <section className="px-page pb-[clamp(48px,6vw,88px)] pt-[calc(var(--header-height)+clamp(28px,4vw,70px))]">
      <ProjectFilters activeCategory={activeCategory} onChange={setActiveCategory} />
      <div className="grid grid-cols-2 gap-[22px] max-[900px]:grid-cols-1">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
