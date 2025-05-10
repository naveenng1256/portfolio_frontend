import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

type Project = {
  title: string;
  description: string;
  image_url: string;
  link: string;
};

type ProjectSectionProps = {
  projects: Project[];
};

export function ProjectSection({ projects }: ProjectSectionProps) {
  return (
    <div className="container px-4 md:px-6">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          My Projects
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Check out some of my recent work and personal projects.
        </p>
      </div>

      {projects.length > 0 ? (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
          {projects.map((project, idx) => (
            <Card
              key={idx}
              className="flex flex-col justify-between w-full max-w-sm shadow-md transition hover:shadow-lg"
            >
              <CardHeader className="p-0">
                <img
                  src={project.image_url || "/placeholder-project.png"}
                  alt={project.title}
                  className="w-full h-48 rounded-t-lg object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <CardDescription className="mt-2 text-sm">
                  {project.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={project.link} target="_blank" rel="noreferrer">
                    View Project
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-slate-400 text-center py-12">
          + add project through profile section
        </div>
      )}
    </div>
  );
}
