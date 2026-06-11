export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
  details?: {
    fullDescription: string;
    products: string[];
    time: string;
    cost: string;
    hairType: string;
    duration: string;
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}
