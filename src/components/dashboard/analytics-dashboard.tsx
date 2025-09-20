'use client';

import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { technologyTrends } from '@/lib/dashboard-data';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Lightbulb, Briefcase, Building, Route, Sparkles } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { suggestCareerPath, CareerPathInput, CareerPathOutput } from '@/ai/flows/career-suggester';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';

const careerQuizQuestions = {
  interest: {
    prompt: 'What kind of activities do you enjoy most?',
    options: [
      { label: 'Building & creating things', value: 'build' },
      { label: 'Solving complex puzzles & problems', value: 'solve' },
      { label: 'Designing & visualizing ideas', value: 'design' },
      { label: 'Organizing & structuring information', value: 'organize' },
    ],
  },
  subject: {
    prompt: 'Which subjects are you strongest in?',
    options: [
      { label: 'Math & Computer Science', value: 'cs' },
      { label: 'Physics & Engineering', value: 'physics' },
      { label: 'Art & Design', value: 'art' },
      { label: 'Business & Economics', value: 'business' },
    ],
  },
};

export default function AnalyticsDashboard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<CareerPathInput>>({});
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<CareerPathOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const chartData = technologyTrends.map(tech => ({
    name: tech.name,
    postings: tech.postings,
  }));

  const handleAnswer = (question: keyof CareerPathInput, value: string) => {
    setAnswers(prev => ({ ...prev, [question]: value }));
  };

  const handleNext = () => {
    if (step < 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!answers.interest || !answers.subject) return;
    setLoading(true);
    setError(null);
    setRecommendation(null);
    try {
      const result = await suggestCareerPath(answers as CareerPathInput);
      setRecommendation(result);
    } catch (e) {
      console.error(e);
      setError('Sorry, the AI career counselor is unavailable at the moment.');
    } finally {
      setLoading(false);
      setStep(2);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setRecommendation(null);
    setError(null);
  };

  const renderQuiz = () => {
    const questions = [careerQuizQuestions.interest, careerQuizQuestions.subject];
    const currentQuestion = questions[step];
    const questionKey = step === 0 ? 'interest' : 'subject';

    return (
      <div className="space-y-6">
        <h4 className="font-semibold text-lg">{currentQuestion.prompt}</h4>
        <RadioGroup
          onValueChange={(value) => handleAnswer(questionKey, value)}
          value={answers[questionKey]}
          className="gap-4"
        >
          {currentQuestion.options.map(option => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`${questionKey}-${option.value}`} />
              <Label htmlFor={`${questionKey}-${option.value}`} className="text-base cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <div className="flex justify-end pt-4">
          <Button onClick={handleNext} disabled={!answers[questionKey]}>
            {step < 1 ? 'Next' : 'Get Recommendation'} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  const renderLoading = () => (
    <div className="text-center space-y-4 py-8">
        <Sparkles className="h-10 w-10 text-primary mx-auto animate-pulse" />
        <p className="font-semibold text-lg">AI Career Counselor is thinking...</p>
        <p className="text-muted-foreground">Generating a personalized career path for you.</p>
        <div className="space-y-4 pt-4">
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
            <div className="flex justify-center gap-4 pt-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
            </div>
        </div>
    </div>
  );

  const renderRecommendation = () => {
    if (error) {
        return (
             <div className="text-center space-y-4 py-8">
                <p className="text-destructive font-semibold">{error}</p>
                <Button onClick={handleReset}>Try Again</Button>
            </div>
        )
    }
    if (!recommendation) return null;

    return (
      <div className="space-y-8">
        <div className="text-center border-b pb-6">
            <p className="text-muted-foreground">AI Recommended Career Path</p>
            <h3 className="text-3xl font-bold text-primary">{recommendation.careerField}</h3>
            <p className="max-w-2xl mx-auto mt-2 text-muted-foreground">{recommendation.justification}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <h4 className="font-semibold text-lg flex items-center gap-2"><Zap className="h-5 w-5 text-accent-foreground fill-accent"/> In-Demand Skills</h4>
                <div className="flex flex-wrap gap-2">
                    {recommendation.inDemandSkills.map(skill => <Badge key={skill} variant="secondary" className="text-base">{skill}</Badge>)}
                </div>
            </div>
             <div className="space-y-4">
                <h4 className="font-semibold text-lg flex items-center gap-2"><Building className="h-5 w-5"/> Top Companies</h4>
                 <div className="flex flex-wrap gap-2">
                    {recommendation.topCompanies.map(company => <Badge key={company} variant="outline" className="text-base">{company}</Badge>)}
                </div>
            </div>
        </div>

        <div>
            <h4 className="font-semibold text-lg mb-4 flex items-center gap-2"><Route className="h-5 w-5"/> Your 4-Step Career Path</h4>
            <div className="space-y-4 border-l-2 border-primary pl-6 ml-2">
                {recommendation.careerPath.map((step, index) => (
                    <div key={index} className="relative">
                        <div className="absolute -left-[34px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>
                        <h5 className="font-bold">{step.title}</h5>
                        <p className="text-muted-foreground">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
        
        <div className="text-center pt-6">
            <Button onClick={handleReset} variant="outline">Start Over</Button>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-3">
         <Card className="bg-secondary/30">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-6 w-6 text-primary"/>
                    <span>Discover Your Path</span>
                </CardTitle>
                <CardDescription>Answer a couple of questions to get a personalized, AI-driven career recommendation.</CardDescription>
            </CardHeader>
            <CardContent>
                {step < 2 && !loading && renderQuiz()}
                {loading && renderLoading()}
                {step === 2 && !loading && renderRecommendation()}
            </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>In-Demand Technologies</CardTitle>
            <CardDescription>Based on the number of project postings across the platform.</CardDescription>
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
      </div>
    </div>
  );
}
