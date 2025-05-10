"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BlogCard } from "./blog-card";

// Blog type definition
type Blog = {
  title: string;
  description: string;
  date: string;
  link: string;
};

interface BlogsCardProps {
  blogs: Blog[];
  updateBlog: (index: number, updatedBlog: Blog) => void;
  addBlog: () => void;
  deleteBlog: (index: number) => void;
}

export function BlogsCard({
  blogs,
  updateBlog,
  addBlog,
  deleteBlog,
}: BlogsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Blog Posts</CardTitle>
          <CardDescription>Share your knowledge and insights</CardDescription>
        </div>
        <Button onClick={addBlog} size="sm">
          <Plus className="h-4 w-4 mr-2" /> Add Blog Post
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog, index) => (
            <BlogCard
              key={index}
              blog={blog}
              onUpdate={(updatedBlog) => updateBlog(index, updatedBlog)}
              onDelete={() => deleteBlog(index)}
            />
          ))}
          {blogs.length === 0 && (
            <div className="col-span-2 text-center py-8 text-muted-foreground">
              No blog posts added yet. Click "Add Blog Post" to get started.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
