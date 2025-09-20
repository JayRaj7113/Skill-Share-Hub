import { notFound } from 'next/navigation';
import Image from 'next/image';
import { projects } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Mail, Briefcase } from 'lucide-react';
import ProjectCard from '@/components/projects/project-card';

// This is a placeholder for company data
const companies = [
  {
    id: 'innovate-ai',
    name: 'Innovate AI',
    email: 'contact@innovate.ai',
    website: 'innovate.ai',
    bio: 'Innovate AI is at the forefront of artificial intelligence, building next-generation solutions to solve complex problems.',
    logoUrl: 'https://picsum.photos/seed/logo1/200/200',
    achievements: ['AI Breakthrough Award 2023', 'Top 50 AI Startups to Watch'],
  },
  {
    id: 'shopsphere',
    name: 'ShopSphere',
    email: 'hello@shopsphere.com',
    website: 'shopsphere.com',
    bio: 'ShopSphere is a global e-commerce platform dedicated to providing seamless and enjoyable shopping experiences.',
    logoUrl: 'https://picsum.photos/seed/logo2/200/200',
    achievements: ['Best User Experience 2024', '1 Million+ Happy Customers'],
  },
  {
    id: 'scalegrid',
    name: 'ScaleGrid',
    email: 'team@scalegrid.io',
    website: 'scalegrid.io',
    bio: 'ScaleGrid provides robust, scalable cloud infrastructure solutions for fast-growing tech companies.',
    logoUrl: 'https://picsum.photos/seed/logo3/200/200',
    achievements: ['Cloud Innovator of the Year', '99.999% Uptime Award'],
  },
   {
    id: 'data-insights-inc',
    name: 'Data Insights Inc.',
    email: 'info@datainsights.com',
    website: 'datainsights.com',
    bio: 'We turn complex data into actionable insights through powerful visualization and analytics.',
    logoUrl: 'https://picsum.photos/seed/logo4/200/200',
    achievements: ['Fastest Growing Analytics Firm', 'Data Impact Award 2023'],
  },
];


export default function CompanyProfilePage({ params }: { params: { id: string } }) {
  const company = companies.find((c) => c.id === params.id);
  const companyProjects = projects.filter(p => p.companyName === company?.name);

  if (!company) {
    notFound();
  }

  return (
    <div className="space-y-12">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-40 bg-gradient-to-r from-secondary to-accent/50">
            <Image
              src={company.logoUrl}
              alt={company.name}
              width={128}
              height={128}
              className="absolute bottom-0 left-6 translate-y-1/2 w-32 h-32 rounded-full border-4 border-background bg-background"
              data-ai-hint="logo"
            />
          </div>
          <div className="pt-20 pb-6 px-6">
            <h1 className="text-3xl font-bold">{company.name}</h1>
            <p className="text-muted-foreground">{company.bio}</p>
          </div>
          <div className="border-t px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{company.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {company.website}
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {company.achievements.map((achievement) => (
                <Badge key={achievement} variant="secondary" className="text-base">
                  {achievement}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-6 w-6" />
                <span>Open Projects</span>
              </CardTitle>
              <CardDescription>Projects currently posted by {company.name}.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
             {companyProjects.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {companyProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
                ) : (
                <p className="text-muted-foreground text-center py-8">No open projects at the moment.</p>
             )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
