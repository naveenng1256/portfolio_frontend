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
import { SkillCategoryCard } from "./skill-category-card";

// Skill category type
type SkillCategory = {
  skill_heading: string;
  key_skills: string[];
};

interface SkillsCardProps {
  skills: SkillCategory[];
  addSkillCategory: () => void;
  updateSkillCategory: (
    index: number,
    updatedSkillCategory: SkillCategory
  ) => void;
  deleteSkillCategory: (index: number) => void;
}

export function SkillsCard({
  skills,
  addSkillCategory,
  updateSkillCategory,
  deleteSkillCategory,
}: SkillsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Skills</CardTitle>
          <CardDescription>
            Showcase your technical expertise and abilities
          </CardDescription>
        </div>
        <Button onClick={addSkillCategory} size="sm">
          <Plus className="h-4 w-4 mr-2" /> Add Skill Category
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skillCategory, index) => (
            <SkillCategoryCard
              key={index}
              skillCategory={skillCategory}
              onUpdate={(updatedSkillCategory) =>
                updateSkillCategory(index, updatedSkillCategory)
              }
              onDelete={() => deleteSkillCategory(index)}
            />
          ))}
          {skills.length === 0 && (
            <div className="col-span-2 text-center py-8 text-muted-foreground">
              No skill categories added yet. Click "Add Skill Category" to get
              started.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
