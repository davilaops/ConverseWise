import { TranscribeView } from "@/components/transcribe-view";

export default function TranscribePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">New Transcription</h1>
        <p className="text-muted-foreground">Upload a file or provide a link to get started.</p>
      </div>
      <TranscribeView />
    </div>
  );
}
