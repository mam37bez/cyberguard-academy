export interface Course {
  id: string; slug: string; title: string; description: string; fullDescription: string;
  ageGroup: string; duration: string; schedule: string; price: number; currency: string;
  level: 'beginner'|'intermediate'|'advanced'; category: string; topics: string[];
  skills: string[]; icon: string; color: string; featured: boolean; enrollmentOpen: boolean;
  maxStudents: number; currentStudents: number; rating: number; reviewCount: number;
  instructor: Instructor; modules: CourseModule[];
}
export interface CourseModule { id: string; title: string; description: string; lessons: number; duration: string; }
export interface Instructor { name: string; title: string; avatar: string; bio: string; certifications: string[]; }
export interface BlogPost { id: string; slug: string; title: string; excerpt: string; content: string; author: string; date: string; readTime: string; category: string; tags: string[]; featured: boolean; }
export interface SecurityThreat { id: string; name: string; type: string; severity: 'low'|'medium'|'high'|'critical'; description: string; protection: string[]; indicators: string[]; }
export interface Testimonial { id: string; name: string; role: string; content: string; rating: number; avatar: string; }
