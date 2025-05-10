"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Save, X, Calendar, ExternalLink, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// Blog type definition
type Blog = {
  title: string;
  description: string;
  date: string;
  link: string;
};

interface BlogCardProps {
  blog: Blog;
  onUpdate: (updatedBlog: Blog) => void;
  onDelete: () => void;
}

export function BlogCard({ blog, onUpdate, onDelete }: BlogCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: blog.title,
    description: blog.description,
    date: blog.date,
    link: blog.link,
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
      title: blog.title,
      description: blog.description,
      date: blog.date,
      link: blog.link,
    });
    setIsEditing(false);
  };

  return (
    <Card className="border">
      {isEditing ? (
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Blog Title
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">
                  Publication Date
                </label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="link" className="text-sm font-medium">
                  Blog Link
                </label>
                <Input
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="https://myblog.com/article"
                />
              </div>
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
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold">{blog.title}</h3>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              {false && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onDelete}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-center text-sm text-muted-foreground mt-2">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{new Date(blog.date).toLocaleDateString()}</span>
          </div>
          <p className="mt-4">{blog.description}</p>
          <div className="mt-6">
            <Button variant="outline" size="sm" asChild>
              <a href={blog.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" /> Read Full Article
              </a>
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
