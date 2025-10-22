export function useLocalStorage() {
  const isBrowser = typeof window !== 'undefined';

  const setItem = (key: string, value: string) => {
    if (!isBrowser) return;
    localStorage.setItem(key, value);
  };

  const getItem = (key: string): string | null => {
    if (!isBrowser) return null;

    return localStorage.getItem(key);
  };

  return {
    setItem,
    getItem,
  };
}
