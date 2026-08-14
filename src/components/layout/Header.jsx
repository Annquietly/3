import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LanguageSwitcher from '../common/LanguageSwitcher';
import { navigation } from '../../data/navigation';
import { cn } from '../../lib/cn';

export default function Header() {
  const { t } = useTranslation();

  const handleLogoClick = () => {
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0 });
    });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[100] flex h-header items-center justify-between bg-gradient-to-b from-page/95 to-page/0 px-page backdrop-blur-[3px]">
      <Link
        to="/"
        aria-label={t('nav.homeAria')}
        className="grid h-[46px] w-[46px] place-items-center rounded-full border border-ink text-[25px] transition duration-500 ease-smooth hover:rotate-[120deg] hover:scale-105 hover:bg-ink hover:text-page focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink max-[900px]:h-10 max-[900px]:w-10 max-[900px]:text-[22px]"
        onClick={handleLogoClick}
      >
        ✿
      </Link>
      <div className="flex items-center gap-[clamp(18px,3vw,44px)] max-[560px]:gap-3.5">
        <nav aria-label={t('nav.mainAria')} className="flex gap-[clamp(18px,3vw,44px)] max-[560px]:gap-[18px]">
          {navigation.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'nav-link text-sm font-medium max-[560px]:text-[13px]',
                  isActive && 'is-active',
                )
              }
            >
              {t(item.labelKey)}
            </NavLink>
          ))}
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
