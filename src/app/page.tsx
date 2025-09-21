import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Briefcase, GraduationCap, Target } from 'lucide-react';
import { placeholderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = placeholderImages.find((img) => img.id === 'hero');
  const hiw1 = placeholderImages.find((img) => img.id === 'how-it-works-1');
  const hiw2 = placeholderImages.find((img) => img.id === 'how-it-works-2');
  const hiw3 = placeholderImages.find((img) => img.id === 'how-it-works-3');
  const forStudentsImg = placeholderImages.find((img) => img.id === 'for-students');
  const forCompaniesImg = placeholderImages.find((img) => img.id === 'for-companies');

  return (
    <div className="flex flex-col items-center gap-16 md:gap-24">
      {/* Hero Section */}
      <section className="w-full pt-12 md:pt-24 lg:pt-32 text-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Skill Share Hub
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl mx-auto">
              Where student talent meets real-world projects. Build your portfolio, gain experience, and get noticed by top companies.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Button asChild size="lg">
                <Link href="/signup">
                  Get Started
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
          {heroImage && (
            <div className="mt-12 md:mt-16">
              <Card className="overflow-hidden shadow-2xl">
                <CardContent className="p-0">
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    width={1200}
                    height={600}
                    className="w-full h-auto object-cover"
                    data-ai-hint={heroImage.imageHint}
                    priority
                  />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How It Works</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-lg">A simple process to connect talent with opportunity.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 md:gap-12">
            <HowItWorksStep
              step={1}
              title="Create Your Profile"
              description="Students build a dynamic profile showcasing their skills, achievements, and academic journey."
              image={hiw1}
            />
            <HowItWorksStep
              step={2}
              title="Post or Contribute"
              description="Organizations post projects they need help with, and students browse opportunities that match their skills and contribute."
              image={hiw2}
            />
            <HowItWorksStep
              step={3}
              title="Collaborate & Grow"
              description="Students work on real-world projects, submit their work, and gain invaluable experience with pre-defined rewards."
              image={hiw3}
            />
          </div>
        </div>
      </section>

      {/* For Students & Companies Section */}
      <section className="w-full">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <FeatureCard
              icon={<GraduationCap className="h-10 w-10 text-primary" />}
              title="For Students"
              description="Build a live resume, find projects that match your skills, and get a head start on your career. Gain experience that matters."
              buttonText="Create Your Profile"
              buttonLink="/register"
              image={forStudentsImg}
            />
            <FeatureCard
              icon={<Briefcase className="h-10 w-10 text-primary" />}
              title="For Companies"
              description="Tap into a pool of motivated student talent. Get projects done efficiently and discover your next great hire."
              buttonText="Post a Project"
              buttonLink="/projects/new"
              image={forCompaniesImg}
              variant="secondary"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function HowItWorksStep({ step, title, description, image }: { step: number; title: string; description: string; image?: any }) {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      {image && (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
             <Image
                src={image.imageUrl}
                alt={image.description}
                width={600}
                height={400}
                className="w-full h-auto object-cover aspect-video"
                data-ai-hint={image.imageHint}
              />
          </CardContent>
        </Card>
      )}
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
          {step}
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description, buttonText, buttonLink, image, variant = "default" }: { icon: React.ReactNode; title: string; description: string; buttonText: string; buttonLink: string; image?: any; variant?: "default" | "secondary" }) {
  return (
    <Card className={`flex flex-col h-full ${variant === 'secondary' ? 'bg-secondary/30' : ''}`}>
      <CardContent className="p-6 flex-grow">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {icon}
            <h3 className="text-2xl font-bold">{title}</h3>
          </div>
          <p className="text-muted-foreground">{description}</p>
          {image && (
             <div className="mt-4 overflow-hidden rounded-lg">
                <Image
                    src={image.imageUrl}
                    alt={image.description}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover aspect-video"
                    data-ai-hint={image.imageHint}
                />
            </div>
          )}
        </div>
      </CardContent>
      <div className="p-6 pt-0">
        <Button asChild className="w-full" size="lg">
          <Link href={buttonLink}>{buttonText} <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    </Card>
  );
}
