import { LoginForm } from "@/app/(auth)/login/login-form";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(96,165,250,0.18),transparent_18%),radial-gradient(circle_at_15%_50%,rgba(37,99,235,0.12),transparent_18%),radial-gradient(circle_at_85%_78%,rgba(56,189,248,0.12),transparent_20%)]" />
      <LoginForm />
    </main>
  );
}