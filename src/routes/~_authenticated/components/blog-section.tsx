"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Blog = {
  title: string;
  description: string;
  date: string;
  link: string;
};

type BlogSectionProps = {
  blogs: Blog[];
};

export function BlogSection({ blogs }: BlogSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current: container } = scrollContainerRef;
      const scrollAmount = 320; // Adjust based on card width + gap

      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="container px-4 md:px-6">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Latest Blog Posts
        </h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Stay updated with our latest tutorials, insights, and news.
        </p>
      </div>

      {/* Horizontally scrollable blog cards with navigation buttons */}
      <div className="mt-12 relative">
        {/* Left scroll button */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 backdrop-blur-sm shadow-md border-muted"
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {/* Scrollable container */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="mx-auto flex justify-center gap-6 px-8 w-max min-w-full">
            {blogs.length > 0 ? (
              blogs.map((post, index) => (
                <Card
                  key={index}
                  className="min-w-[300px] max-w-[300px] flex-shrink-0"
                >
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>{post.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {post.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read More
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-slate-400 text-center w-full">
                + add blog through profile section
              </div>
            )}
          </div>
        </div>

        {/* Right scroll button */}
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 backdrop-blur-sm shadow-md border-muted"
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
