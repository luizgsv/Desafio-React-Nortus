import { Button } from '@/components/ui/button';
import { LanguageSelect } from '@/components/ui/language-select';
import { HeadsetIcon } from 'lucide-react';

export function LoginExtras() {
  return (
    <div className="absolute flex gap-2 z-40 top-0 right-0 bg-background p-4 rounded-bl-2xl">
      <Button className="bg-secondary rounded-full hover:bg-secondary/70 transition">
        <HeadsetIcon />
        Ajuda
      </Button>
      <LanguageSelect />
    </div>
  );
}
