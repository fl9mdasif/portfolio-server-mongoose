export interface TSkill {
  name: string;
  level?: number; // 0 to 100
  category: string; // e.g. 'Frontend', 'Backend', 'Tools'
  image: string; // Icon image URL
  isSelect?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
