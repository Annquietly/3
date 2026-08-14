import { projectCategories, projects } from '../content/siteContent';

export { projectCategories, projects };

export const getProjectById = (id) => projects.find((project) => project.id === id);

export const getProjectsByCategory = (category) => {
  if (!category || category === 'all') return [...projects].sort((a, b) => a.order - b.order);
  return projects.filter((project) => project.category === category).sort((a, b) => a.order - b.order);
};

export const getFeaturedProjects = () =>
  projects
    .filter((project) => project.featured)
    .sort((a, b) => a.homeOrder - b.homeOrder);
