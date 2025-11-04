import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockSummaries } from '@/lib/data';
import type { Summary } from '@/lib/types';
import { ArrowRight, Clock, FileUp, Film, Link as LinkIcon, Mic2, PlusCircle, Share2 } from 'lucide-react';
import Link from 'next/link';
import { format, formatDistanceToNow } from 'date-fns';

const sourceIcons: Record<Summary['sourceType'], React.ReactElement> = {
  'Zoom': <Mic2 className="h-5 w-5" />,
  'Google Meet': <Mic2 className="h-5 w-5" />,
  'YouTube': <Film className="h-5 w-5" />,
  'Telegram': <Share2 className="h-5 w-5" />,
  'File Upload': <FileUp className="h-5 w-5" />,
};

function formatDuration(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s]
    .map(v => (v < 10 ? '0' + v : v))
    .filter((v, i) => v !== '00' || i > 0)
    .join(':');
}


export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John! Here are your recent summaries.</p>
        </div>
        <Button size="lg" asChild>
          <Link href="/transcribe">
            <PlusCircle className="mr-2" />
            New Transcription
          </Link>
        </Button>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 font-headline">Recent Summaries</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockSummaries.map((summary) => (
            <Card key={summary.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    {sourceIcons[summary.sourceType]}
                    <span className="text-sm font-medium">{summary.sourceType}</span>
                  </div>
                  <time className="text-sm text-muted-foreground" dateTime={summary.date}>
                    {formatDistanceToNow(new Date(summary.date), { addSuffix: true })}
                  </time>
                </div>
                <CardTitle className="pt-4 font-headline">{summary.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">{summary.quickSummary}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{formatDuration(summary.duration)}</span>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/summaries/${summary.id}`}>
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
