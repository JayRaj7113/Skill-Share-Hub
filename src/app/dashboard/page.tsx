import AnalyticsDashboard from '@/components/dashboard/analytics-dashboard';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Career Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Discover trending technologies and career paths based on real project data.
        </p>
      </div>
      <AnalyticsDashboard />
    </div>
  );
}
