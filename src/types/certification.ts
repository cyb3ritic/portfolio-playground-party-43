
import { LucideIcon } from 'lucide-react';

export interface Certification {
  title: string;
  provider: string;
  date: string;
  link: string;
  tags: string[];
  icon: JSX.Element;
  color: string;
}
