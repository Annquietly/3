import { Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { AppRoutes } from './router';
import PageTransition from '../components/layout/PageTransition';
import { fallbackLanguage, LANGUAGE_STORAGE_KEY } from '../i18n';

const pageMeta = {
  '/': ['meta.homeTitle', 'meta.homeDescription'],
  '/work': ['meta.workTitle', 'meta.workDescription'],
  '/about': ['meta.aboutTitle', 'meta.aboutDescription'],
};

function useLanguageDocumentState() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language || fallbackLanguage;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, i18n.language || fallbackLanguage);
  }, [i18n.language]);
}

function usePageMeta() {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const isProject = location.pathname.startsWith('/project/');
    const keys = isProject
      ? ['meta.projectTitle', 'meta.projectDescription']
      : (pageMeta[location.pathname] ?? ['meta.notFoundTitle', 'meta.notFoundDescription']);

    document.title = t(keys[0]);

    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.setAttribute('name', 'description');
      document.head.append(description);
    }
    description.setAttribute('content', t(keys[1]));
  }, [location.pathname, t]);
}

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0 });
  }, [pathname, search]);

  return null;
}

export default function App() {
  useLanguageDocumentState();
  usePageMeta();

  return (
    <>
      <ScrollToTop />
      <PageTransition />
      <Suspense fallback={null}>
        <AppRoutes />
      </Suspense>
    </>
  );
}
