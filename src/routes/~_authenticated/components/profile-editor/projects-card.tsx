"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "./project-card";
import { Plus } from "lucide-react";
import { USER_DETAIS } from "@/lib/types";

interface ProjectsCardProps {
  projects: USER_DETAIS["projects"];
  updateProject: (
    index: number,
    updatedProject: USER_DETAIS["projects"][0]
  ) => void;
  addProject: () => void;
  deleteProject: (index: number) => void;
}

export function ProjectsCard({
  projects,
  updateProject,
  addProject,
  deleteProject,
}: ProjectsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Projects</CardTitle>
          <CardDescription>Showcase your work and achievements</CardDescription>
        </div>
        <Button onClick={addProject} size="sm">
          <Plus className="h-4 w-4 mr-2" /> Add Project
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              onUpdate={(updatedProject) =>
                updateProject(index, updatedProject)
              }
              onDelete={() => deleteProject(index)}
            />
          ))}
          {projects.length === 0 && (
            <div className="col-span-2 text-center py-8 text-muted-foreground">
              No projects added yet. Click "Add Project" to get started.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
