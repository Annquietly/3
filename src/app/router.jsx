import { lazy } from 'react';
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';

import PageLayout from '../components/layout/PageLayout';

const HomePage = lazy(() => import('../pages/HomePage'));
const WorkPage = lazy(() => import('../pages/WorkPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ProjectPage = lazy(() => import('../pages/ProjectPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

function LegacyProjectRedirect() {
  const [params] = useSearchParams();
  const id = params.get('id');
  return <Navigate to={id ? `/project/${id}` : '/work'} replace />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route index element={<HomePage />} />
        <Route path="work" element={<WorkPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="project/:id" element={<ProjectPage />} />
        <Route path="index.html" element={<Navigate to="/" replace />} />
        <Route path="work.html" element={<Navigate to="/work" replace />} />
        <Route path="about.html" element={<Navigate to="/about" replace />} />
        <Route path="project.html" element={<LegacyProjectRedirect />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
