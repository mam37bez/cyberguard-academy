import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
export function formatPrice(price: number): string { return price + ' BYN'; }
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('ru-RU',{year:'numeric',month:'long',day:'numeric'}).format(new Date(dateString));
}
export function getSecurityLevel(score: number) {
  if(score>=90) return {level:'excellent',color:'#00ff41',label:'Отличный'};
  if(score>=70) return {level:'good',color:'#00d4ff',label:'Хороший'};
  if(score>=50) return {level:'medium',color:'#fbbf24',label:'Средний'};
  if(score>=30) return {level:'low',color:'#f97316',label:'Низкий'};
  return {level:'critical',color:'#ff3131',label:'Критический'};
}
