import { Spinner } from "@/components/ui/spinner";
import { getLoggedInUserEmail } from "@/lib/user-auth";
import { Outlet, createRootRoute, useNavigate } from "@tanstack/react-router";
import { Suspense, useEffect } from "react";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const email = getLoggedInUserEmail();
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  useEffect(() => {
    const shouldRedirectToLogin = email === "" && currentPath !== "/login";

    const nextUrl = ["/login", "/"].includes(currentPath)
      ? "/home"
      : currentPath;

    if (shouldRedirectToLogin) {
      navigate({ to: `/login?next=${nextUrl}` });
    } else if (!shouldRedirectToLogin && window.location.pathname === "/") {
      navigate({
        to: "/home",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center bg-amber-300">
          <Spinner />
        </div>
      }
    >
      <Outlet />
    </Suspense>
  );
}
