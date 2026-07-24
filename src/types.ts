export type VideoPlatform = 'youtube' | 'vimeo';

export type Category = 'all' | 'commercial' | 'music_video' | 'short_film' | 'documentary' | 'fashion';

export interface VideoItem {
  id: string;
  title: string;
  originalUrl: string;
  platform: VideoPlatform;
  embedId: string;
  thumbnailUrl: string;
  category: Category;
  categoryLabel: string;
  year: string;
  duration: string;
  client?: string;
  director?: string;
  cinematographer?: string;
  colorist?: string;
  cameraGear?: string;
  description: string;
  featured?: boolean;
  award?: string;
  tags: string[];
}

export interface DirectorBio {
  name: string;
  title: string;
  location: string;
  bio: string;
  yearsExperience: number;
  completedProjects: number;
  awardsCount: number;
  avatarUrl: string;
}

export interface EquipmentCategory {
  category: string;
  items: string[];
}

export interface AwardItem {
  year: string;
  festival: string;
  projectTitle: string;
  category: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  description: string;
}
