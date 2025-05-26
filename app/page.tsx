import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { ComplimentForm } from '@/components/compliment-form';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 px-4 md:px-6 container mx-auto max-w-5xl">
        <Hero />
        <ComplimentForm />
      </div>
      <Footer />
    </main>
  );
}