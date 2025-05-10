"use client";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { USER_DETAIS } from "@/lib/types";
import { PersonalInfoCard } from "./components/profile-editor/personal-info-card";
import { ProjectsCard } from "./components/profile-editor/projects-card";
import { BlogsCard } from "./components/profile-editor/blogs-card";
import { Button } from "@/components/ui/button";
import { IoArrowBackSharp } from "react-icons/io5";
import { SkillsCard } from "./components/profile-editor/skills-card";
import { useUserStore } from "./store";
import useUser from "@/hooks/useUser";
import { getLoggedInUserID, removeLoggedInUser } from "@/lib/user-auth";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfileSection,
});

function ProfileSection() {
  const navigate = useNavigate();
  const userId = getLoggedInUserID();

  // Initial user data state
  const { userData, mergeUserData } = useUserStore();
  const {
    useUserDetailsUpdate,
    useUserSkillsAdded,
    useUserSkillsUpdates,
    useUserProjectAdded,
    useUserProjectsUpdates,
    useUserBlogAdded,
    useUserBlogsUpdates,
    useGetUserDetails,
  } = useUser();

  useGetUserDetails(userId);

  const { mutateAsync: updateUserPersonalInfo } = useUserDetailsUpdate();

  const { mutateAsync: addUserSkillsDetails } = useUserSkillsAdded();
  const { mutateAsync: updateUserSkillsInfo } = useUserSkillsUpdates();

  const { mutateAsync: addUserProjectDetails } = useUserProjectAdded();
  const { mutateAsync: updateUserProjectsInfo } = useUserProjectsUpdates();

  const { mutateAsync: addUserBlogsDetails } = useUserBlogAdded();
  const { mutateAsync: updateUserBlogsInfo } = useUserBlogsUpdates();

  // Update personal information
  const updatePersonalInfo = async (updatedInfo: Partial<USER_DETAIS>) => {
    mergeUserData(updatedInfo);
    const data = Object.fromEntries(
      Object.entries(updatedInfo).map(([key, value]) => [
        key,
        value === undefined ? "" : value,
      ])
    );
    await updateUserPersonalInfo({ data: data, userId: userId });
  };

  // Skills management
  const addSkillCategory = async () => {
    const newSkillCategory = {
      skill_heading: `New Skill Category`,
      key_skills: ["New Skill"],
    };
    mergeUserData({
      skills: [...userData.skills, newSkillCategory],
    });

    await addUserSkillsDetails({ data: newSkillCategory, userId: userId });
  };

  const updateSkillCategory = async (
    index: number,
    updatedSkillCategory: USER_DETAIS["skills"][0]
  ) => {
    const updatedSkills = [...userData.skills];
    updatedSkills[index] = updatedSkillCategory;
    mergeUserData({ skills: updatedSkills });

    const needToBeUpdated = userData.skills[index];
    needToBeUpdated.skill_heading = updatedSkillCategory.skill_heading;
    needToBeUpdated.key_skills = updatedSkillCategory.key_skills;
    await updateUserSkillsInfo({ data: needToBeUpdated, userId: userId });
  };

  const deleteSkillCategory = (index: number) => {
    const updatedSkills = userData.skills.filter((_, i) => i !== index);
    mergeUserData({ skills: updatedSkills });
  };

  // Projects management
  const updateProject = async (
    index: number,
    updatedProject: USER_DETAIS["projects"][0]
  ) => {
    const updatedProjects = [...userData.projects];
    updatedProjects[index] = updatedProject;
    mergeUserData({ projects: updatedProjects });

    const needToBeUpdated = userData.projects[index];
    needToBeUpdated.title = updatedProject.title;
    needToBeUpdated.description = updatedProject.description;
    needToBeUpdated.image_url = updatedProject.image_url;
    needToBeUpdated.link = updatedProject.link;
    await updateUserProjectsInfo({ data: needToBeUpdated, userId: userId });
  };

  const addProject = async () => {
    const newProject = {
      title: `New Project`,
      description: "Description of your new project",
      image_url: "/placeholder.svg?height=150&width=300",
      link: "",
    };
    mergeUserData({
      projects: [...userData.projects, newProject],
    });

    await addUserProjectDetails({ data: newProject, userId: userId });
  };

  const deleteProject = (index: number) => {
    const updatedProjects = userData.projects.filter((_, i) => i !== index);
    mergeUserData({ projects: updatedProjects });
  };

  // Blogs management
  const updateBlog = async (
    index: number,
    updatedBlog: USER_DETAIS["blogs"][0]
  ) => {
    const updatedBlogs = [...userData.blogs];
    updatedBlogs[index] = updatedBlog;
    mergeUserData({ blogs: updatedBlogs });

    const needToBeUpdated = userData.blogs[index];
    needToBeUpdated.title = updatedBlog.title;
    needToBeUpdated.description = updatedBlog.description;
    needToBeUpdated.link = updatedBlog.link;

    await updateUserBlogsInfo({ data: needToBeUpdated, userId: userId });
  };

  const addBlog = async () => {
    const newBlog = {
      title: `New Blog Post`,
      description: "Description of your new blog post",
      date: new Date().toISOString().split("T")[0],
      link: "",
    };
    mergeUserData({
      blogs: [...userData.blogs, newBlog],
    });

    await addUserBlogsDetails({ data: newBlog, userId: userId });
  };

  const deleteBlog = (index: number) => {
    const updatedBlogs = userData.blogs.filter((_, i) => i !== index);
    mergeUserData({ blogs: updatedBlogs });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex h-full items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate({ to: "/home" })}
            className="flex items-center gap-2"
          >
            <IoArrowBackSharp className="size-6" />
          </Button>
          <h1 className="ml-4 text-3xl font-bold">Profile</h1>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            removeLoggedInUser();
            navigate({ to: "/login" });
          }}
        >
          Logout
        </Button>
      </div>

      <div className="space-y-8">
        {/* Personal Information Card */}
        <PersonalInfoCard
          userData={userData}
          updatePersonalInfo={updatePersonalInfo}
        />

        {/* Skills Card */}
        <SkillsCard
          skills={userData.skills}
          addSkillCategory={addSkillCategory}
          updateSkillCategory={updateSkillCategory}
          deleteSkillCategory={deleteSkillCategory}
        />

        {/* Projects Card */}
        <ProjectsCard
          projects={userData.projects}
          updateProject={updateProject}
          addProject={addProject}
          deleteProject={deleteProject}
        />

        {/* Blogs Card */}
        <BlogsCard
          blogs={userData.blogs}
          updateBlog={updateBlog}
          addBlog={addBlog}
          deleteBlog={deleteBlog}
        />
      </div>
    </div>
  );
}
