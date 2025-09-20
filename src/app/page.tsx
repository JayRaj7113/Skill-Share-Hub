import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { placeholderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = placeholderImages.find((img) => img.id === 'hero');

  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 text-center">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-1 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Skill Share Hub
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto">
                  Connecting talented students with real-world projects from innovative companies.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/projects/new">
                    Post a Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/projects">
                    Browse Projects
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {heroImage && (
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <Card className="overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={1200}
                  height={600}
                  className="w-full h-auto object-cover"
                  data-ai-hint={heroImage.imageHint}
                />
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <section className="w-full py-12 md:py-24 bg-card/50">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Ready to Get Started?
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Whether you're a student looking for experience or a company seeking fresh talent, Skill Share Hub is your platform.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
             <Button asChild size="lg">
              <Link href="/register">
                Register as a Student
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/students/search">
                Find Talent
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
