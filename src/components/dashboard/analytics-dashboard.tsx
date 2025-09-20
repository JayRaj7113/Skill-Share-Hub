'use client';

import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { technologyTrends, trendingRoles, careerPaths } from '@/lib/dashboard-data';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';

export default function AnalyticsDashboard() {
  const [selectedPath, setSelectedPath] = useState(careerPaths['Web Developer']);

  const chartData = technologyTrends.map(tech => ({
    name: tech.name,
    postings: tech.postings,
  }));

  const handleRoleSelect = (role: string) => {
    if (role in careerPaths) {
      setSelectedPath(careerPaths[role as keyof typeof careerPaths]);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>In-Demand Technologies</CardTitle>
            <CardDescription>Based on the number of project postings.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                  }}
                />
                <Bar dataKey="postings" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Suggested Career Path</CardTitle>
            <CardDescription>{selectedPath.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedPath.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold">{step.title}</h4>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent-foreground fill-accent" />
              <span>Trending Roles</span>
            </CardTitle>
            <CardDescription>Click a role to see a suggested path.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {trendingRoles.map(role => (
              <Button
                key={role}
                variant={selectedPath.title === role ? 'default' : 'secondary'}
                onClick={() => handleRoleSelect(role)}
                className="justify-between"
              >
                {role}
                <ArrowRight className="h-4 w-4" />
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
