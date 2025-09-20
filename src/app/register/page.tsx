import RegistrationForm from '@/components/students/registration-form';

export default function RegisterPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create Your Student Profile</h1>
        <p className="text-muted-foreground mt-2">
          Showcase your skills and get noticed by top companies.
        </p>
      </div>
      <RegistrationForm />
    </div>
  );
}
