import { Spinner } from "@/components/ui/spinner";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return (
    <>
      <div className="h-screen bg-slate-50 font-sans text-slate-950 subpixel-antialiased">
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}
