import { pageTitleConfig } from '@/config/title';
import { usePathname } from 'next/navigation';

export function definePageTitleByPathname() {
  const pathname = usePathname();

  const title = pageTitleConfig.find((config) => {
    const pathnameReplace = pathname === '/' ? '/main' : pathname;
    return pathnameReplace.includes(config.pathname);
  })?.title;

  return title ?? 'Default';
}
