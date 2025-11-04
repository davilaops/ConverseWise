import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Film, Languages, Share2, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/logo';

const features = [
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: 'AI-Powered Transcription',
    description: 'Accurately transcribe audio and video from any source into text.',
  },
  {
    icon: <Film className="h-8 w-8 text-primary" />,
    title: 'Intelligent Summarization',
    description: 'Get structured summaries with key points, decisions, and next steps.',
  },
  {
    icon: <Languages className="h-8 w-8 text-primary" />,
    title: 'Multilingual Support',
    description: 'Automatic language detection for seamless transcription in English & Portuguese.',
  },
  {
    icon: <Share2 className="h-8 w-8 text-primary" />,
    title: 'Export & Share',
    description: 'Easily export your summaries to PDF, DOCX and share via multiple channels.',
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started Free</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="text-center py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 font-headline">
              Unlock Insights from Your Conversations
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
              ConversaWise uses AI to transcribe, summarize, and analyze your audio and video content, turning long meetings and calls into actionable intelligence.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">Start Your Free Trial</Link>
            </Button>
          </div>
        </section>

        <section id="features" className="py-20 lg:py-24 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Powerful Features, Simply Delivered</h2>
              <p className="max-w-xl mx-auto text-muted-foreground mt-2">
                Everything you need to be more productive.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto bg-accent rounded-full p-3 w-fit">
                      {feature.icon}
                    </div>
                    <CardTitle className="mt-4 font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Ready to Boost Your Productivity?</h2>
              <p className="max-w-xl mx-auto text-muted-foreground mt-2 mb-8">
                Join thousands of users who trust ConversaWise to make sense of their audio and video content.
              </p>
              <Button size="lg" asChild>
                <Link href="/signup">Sign Up Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ConversaWise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
