"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Save, X, Trash2, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Skill category type
type SkillCategory = {
  skill_heading: string;
  key_skills: string[];
};

interface SkillCategoryCardProps {
  skillCategory: SkillCategory;
  onUpdate: (updatedSkillCategory: SkillCategory) => void;
  onDelete: () => void;
}

export function SkillCategoryCard({
  skillCategory,
  onUpdate,
  onDelete,
}: SkillCategoryCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    skill_heading: skillCategory.skill_heading,
    key_skills: [...skillCategory.key_skills],
  });
  const [newSkill, setNewSkill] = useState("");

  const handleHeadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      skill_heading: e.target.value,
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setFormData((prev) => ({
        ...prev,
        key_skills: [...prev.key_skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      key_skills: prev.key_skills.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      skill_heading: skillCategory.skill_heading,
      key_skills: [...skillCategory.key_skills],
    });
    setNewSkill("");
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <Card className="border">
      {isEditing ? (
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="skill_heading" className="text-sm font-medium">
                Category Name
              </label>
              <Input
                id="skill_heading"
                value={formData.skill_heading}
                onChange={handleHeadingChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Skills</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.key_skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button type="button" size="sm" onClick={handleAddSkill}>
                  <Plus className="h-4 w-4" />
                </Button>
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
            <h3 className="text-xl font-bold">{skillCategory.skill_heading}</h3>
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
          <div className="flex flex-wrap gap-2 mt-4">
            {skillCategory.key_skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
