import { pageTitleConfig } from '@/config/title';
import { usePathname } from 'next/navigation';

export function definePageTitleByPathname() {
  const pathname = usePathname();
  const title = pageTitleConfig.find((config) => pathname.includes(config.pathname))?.title;

  return title ?? 'Default';
}
