import { Spinner } from "@/components/ui/spinner";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner size={"medium"} />
    </div>
  );
}
