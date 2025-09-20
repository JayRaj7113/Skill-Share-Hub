import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function CompanyRegistrationPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create Your Company Profile</h1>
        <p className="text-muted-foreground mt-2">
          Showcase your company and attract the best student talent.
        </p>
      </div>
      <Card>
        <CardContent className="p-6">
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" placeholder="e.g., Innovate AI" />
              </div>
              <div>
                <Label htmlFor="email">Company Email</Label>
                <Input id="email" type="email" placeholder="e.g., contact@innovate.ai" />
              </div>
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input id="website" placeholder="https://innovate.ai" />
            </div>
            <div>
              <Label htmlFor="bio">Company Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell students about your company, mission, and culture."
                className="resize-none"
                rows={4}
              />
            </div>
            <Button type="submit" className="w-full" size="lg">Create Company Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
