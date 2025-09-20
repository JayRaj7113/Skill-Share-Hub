'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Lightbulb, Building, Route, Sparkles, GraduationCap, Briefcase, Handshake } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { suggestCareerPath, CareerPathInput, CareerPathOutput } from '@/ai/flows/career-suggester';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';

const careerQuizQuestions = {
  interest: {
    prompt: 'What kind of activities do you enjoy most?',
    options: [
      { label: 'Building & creating things', value: 'building' },
      { label: 'Solving complex puzzles & problems', value: 'problem-solving' },
      { label: 'Designing & expressing ideas visually', value: 'creativity' },
      { label: 'Helping or caring for others', value: 'helping' },
      { label: 'Analyzing data and finding patterns', value: 'analyzing' },
      { label: 'Leading and persuading people', value: 'leading' },
    ],
  },
  subject: {
    prompt: 'Which subjects or areas are you strongest in?',
    options: [
      { label: 'Math & Computer Science', value: 'math and computer science' },
      { label: 'Life Sciences (Biology, Chemistry)', value: 'life sciences' },
      { label: 'Arts & Humanities', value: 'arts and humanities' },
      { label: 'Business & Economics', value: 'business and economics' },
      { label: 'Physical Sciences & Engineering', value: 'physical sciences' },
      { label: 'Social Sciences & Communication', value: 'social sciences' },
    ],
  },
};

export default function AnalyticsDashboard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<CareerPathInput>>({});
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<CareerPathOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      setError('Sorry, the AI career counselor is unavailable at the moment. Please try again.');
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
          className="gap-4 grid grid-cols-1 sm:grid-cols-2"
        >
          {currentQuestion.options.map(option => (
            <div key={option.value} className="flex items-center space-x-3">
              <RadioGroupItem value={option.value} id={`${questionKey}-${option.value}`} />
              <Label htmlFor={`${questionKey}-${option.value}`} className="text-base font-normal cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
        <div className="flex justify-end pt-4">
          <Button onClick={handleNext} disabled={!answers[questionKey]} size="lg">
            {step < 1 ? 'Next' : 'Get My Career Path'} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  const renderLoading = () => (
    <div className="text-center space-y-6 py-8 flex flex-col items-center">
        <div className="relative w-32 h-12 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-between">
            <div className="animate-[student-walk_2s_ease-in-out_infinite] p-2 bg-secondary rounded-full">
              <GraduationCap className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div className="animate-[company-appear_2s_ease-in-out_infinite] p-2 bg-primary rounded-full">
                <Briefcase className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-[handshake_2s_ease-in-out_infinite]">
              <Handshake className="w-8 h-8 text-accent-foreground" />
            </div>
          </div>
        </div>
        <p className="font-semibold text-lg animate-pulse">AI is generating your personalized career path...</p>
        <p className="text-sm text-muted-foreground">This may take a moment.</p>
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
            <p className="max-w-3xl mx-auto mt-2 text-muted-foreground">{recommendation.justification}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4 p-6 rounded-lg bg-background">
                <h4 className="font-semibold text-lg flex items-center gap-2"><Zap className="h-5 w-5 text-accent-foreground fill-accent"/> In-Demand Skills</h4>
                <div className="flex flex-wrap gap-2">
                    {recommendation.inDemandSkills.map(skill => <Badge key={skill} variant="secondary" className="text-base px-3 py-1">{skill}</Badge>)}
                </div>
            </div>
             <div className="space-y-4 p-6 rounded-lg bg-background">
                <h4 className="font-semibold text-lg flex items-center gap-2"><Building className="h-5 w-5"/> Top Companies Hiring</h4>
                 <div className="flex flex-wrap gap-2">
                    {recommendation.topCompanies.map(company => <Badge key={company} variant="outline" className="text-base px-3 py-1">{company}</Badge>)}
                </div>
            </div>
        </div>

        <div>
            <h4 className="font-semibold text-xl mb-6 text-center flex items-center justify-center gap-2"><Route className="h-6 w-6"/> Your 4-Step Career Roadmap</h4>
            <div className="relative space-y-8">
                <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-border -translate-x-1/2 hidden md:block"></div>
                {recommendation.careerPath.map((step, index) => (
                    <div key={index} className="relative flex items-start gap-6">
                        <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">{step.step}</div>
                        <div className="bg-background p-4 rounded-lg flex-grow">
                          <h5 className="font-bold text-lg">{step.title}</h5>
                          <p className="text-muted-foreground mt-1">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
        <div className="text-center pt-6">
            <Button onClick={handleReset} variant="outline" size="lg">Start Over & Explore Another Path</Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <Card className="bg-secondary/30">
        <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
                <Sparkles className="h-7 w-7 text-primary"/>
                <span>AI-Powered Career Counselor</span>
            </CardTitle>
            <CardDescription className="text-base">Not sure where to start? Answer a couple of questions to get a personalized, AI-driven career roadmap for any field, anywhere in the world.</CardDescription>
        </CardHeader>
        <CardContent>
            {step < 2 && !loading && renderQuiz()}
            {loading && renderLoading()}
            {step === 2 && !loading && renderRecommendation()}
        </CardContent>
      </Card>
    </div>
  );
}
