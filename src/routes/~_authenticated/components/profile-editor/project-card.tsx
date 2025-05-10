"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Save, Trash, X, ExternalLink } from "lucide-react";
import { USER_DETAIS } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";

interface ProjectCardProps {
  project: USER_DETAIS["projects"][0];
  onUpdate: (updatedProject: USER_DETAIS["projects"][0]) => void;
  onDelete: () => void;
}

export function ProjectCard({ project, onUpdate, onDelete }: ProjectCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: project.title,
    description: project.description,
    image_url: project.image_url,
    link: project.link,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      title: project.title,
      description: project.description,
      image_url: project.image_url,
      link: project.link,
    });
    setIsEditing(false);
  };

  return (
    <Card className="overflow-hidden">
      {isEditing ? (
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Project Title
              </label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="image_url" className="text-sm font-medium">
                Image URL
              </label>
              <Input
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="link" className="text-sm font-medium">
                Project Link
              </label>
              <Input
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://github.com/username/project"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" /> Cancel
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" /> Save
              </Button>
            </div>
          </form>
        </CardContent>
      ) : (
        <>
          <div className="relative">
            <img
              src={project.image_url || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-40 object-cover"
            />
            <div className="absolute top-2 right-2 flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="bg-background/80 backdrop-blur-sm"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              {false && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="bg-destructive/80 backdrop-blur-sm"
                  onClick={onDelete}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="text-lg font-bold">{project.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">
              {project.description}
            </p>
          </CardContent>
          <CardFooter className="px-4 py-3 border-t flex justify-end">
            <Button variant="outline" size="sm" asChild>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" /> View Project
              </a>
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
