import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_unauthenticated")({
  component: UnauthenticatedLayout,
});

function UnauthenticatedLayout() {
  return <Outlet />;
}
