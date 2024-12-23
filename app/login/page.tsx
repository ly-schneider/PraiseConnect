import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col mb-32 mt-12">
      <h1 className="title text-4xl">Login</h1>
      <LoginForm />
    </div>
  );
}
