"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Save, X } from "lucide-react";
import { USER_DETAIS } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";

interface PersonalInfoCardProps {
  userData: USER_DETAIS;
  updatePersonalInfo: (updatedInfo: Partial<USER_DETAIS>) => void;
}

export function PersonalInfoCard({
  userData,
  updatePersonalInfo,
}: PersonalInfoCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData.name,
    profile_headline: userData.profile_headline,
    ing_url: userData.ing_url,
    profile_summary: userData.profile_summary,
    github: userData.github,
    linkedin: userData.linkedin,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: userData.name,
      profile_headline: userData.profile_headline,
      ing_url: userData.ing_url,
      profile_summary: userData.profile_summary,
      github: userData.github,
      linkedin: userData.linkedin,
    });
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your basic profile information</CardDescription>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="profile_headline"
                  className="text-sm font-medium"
                >
                  Profile Headline
                </label>
                <Input
                  id="profile_headline"
                  name="profile_headline"
                  value={formData.profile_headline}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="ing_url" className="text-sm font-medium">
                Profile Image URL
              </label>
              <Input
                id="ing_url"
                name="ing_url"
                value={formData.ing_url}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="profile_summary" className="text-sm font-medium">
                Profile Summary
              </label>
              <Textarea
                id="profile_summary"
                name="profile_summary"
                value={formData.profile_summary}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="github" className="text-sm font-medium">
                  GitHub URL
                </label>
                <Input
                  id="github"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="linkedin" className="text-sm font-medium">
                  LinkedIn URL
                </label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
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
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <img
                  src={
                    userData.ing_url ||
                    "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                  }
                  alt={userData.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Name:
                  </label>
                  <h3 className="text-xl font-bold">
                    {userData.name || "N/A"}
                  </h3>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Headline:
                  </label>
                  <p className="text-muted-foreground">
                    {userData.profile_headline || "N/A"}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Summary:
                  </label>
                  <p className="text-sm">{userData.profile_summary || "N/A"}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Social Links:
                  </label>
                  <div className="flex space-x-4 pt-1">
                    <a
                      href={userData.github || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      GitHub
                    </a>
                    <a
                      href={userData.linkedin || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
