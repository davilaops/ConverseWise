import { TranscribeView } from "@/components/transcribe-view";

export default function TranscribePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Nova Transcrição</h1>
        <p className="text-muted-foreground">Envie um arquivo ou forneça um link para começar.</p>
      </div>
      <TranscribeView />
    </div>
  );
}
