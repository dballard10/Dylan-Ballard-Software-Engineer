export interface Project {
  title: string;
  image: string;
  fallbackImage?: string;
  tech: TechItem[];
  description: string;
  shortDescription: string;
  url: string;
}

export interface TechItem {
  name: string;
  icon: string;
  colorIcon?: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  location: string;
  github: { url: string; label: string };
  linkedin: { url: string; label: string };
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  icon?: string;
  colorIcon?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  profileImage: string;
  contact: ContactInfo;
  skills: SkillCategory[];
  projects: Project[];
}
