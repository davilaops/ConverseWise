import { TranscribeView } from "@/components/transcribe-view";

export default function SummaryDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the summary data based on the ID.
  // For this example, we'll pass the ID to the view component to show it.
  
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold font-headline">Transcription Details</h1>
        <p className="text-muted-foreground">Viewing summary ID: {params.id}</p>
      </div>
      <TranscribeView isReadOnly={true} />
    </div>
  );
}
