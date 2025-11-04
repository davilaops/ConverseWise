import { MessageSquareDashed } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="ConversaWise home">
      <MessageSquareDashed className="h-7 w-7 text-primary" />
      <span className="font-bold text-xl font-headline tracking-tight">ConversaWise</span>
    </Link>
  );
}
