export type USER = {
  id: string;
  userEmail: string;
  password: string;
};

export type USER_DETAIS = {
  name: string;
  profile_headline: string;
  ing_url: string;
  profile_summary: string;
  skills: {
    id?: number;
    skill_heading: string;
    key_skills: string[];
  }[];
  projects: {
    id?: number;
    title: string;
    description: string;
    image_url: string;
    link: string;
  }[];
  blogs: {
    id?: number;
    title: string;
    description: string;
    date: string;
    link: string;
  }[];
  github: string;
  linkedin: string;
};