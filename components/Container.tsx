import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full px-6">
      <div className="max-w-md mx-auto flex flex-col min-h-screen">{children}</div>
    </main>
  );
}
