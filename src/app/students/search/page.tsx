import SearchForm from '@/components/students/search-form';

export default function StudentSearchPage() {
  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Find Student Talent</h1>
        <p className="text-muted-foreground mt-2">
          Enter a student's unique ID to view their profile.
        </p>
      </div>
      <SearchForm />
    </div>
  );
}
