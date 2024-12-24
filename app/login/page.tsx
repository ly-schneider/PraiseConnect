import LoginForm from "@/components/LoginForm";
import Spinner from "@/components/utils/Spinner";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="flex flex-col mb-32 mt-12">
      <h1 className="title text-4xl">Login</h1>
      <Suspense fallback={<Spinner className="fill-background h-8 w-8" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
