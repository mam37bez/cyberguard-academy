import { Module } from '@/types/quiz';
import { networkSecurityModule } from './network-security';
import { webSecurityModule } from './web-security';
import { cryptographyModule } from './cryptography';
import { osintModule } from './osint';
import { mobileSecurityModule } from './mobile-security';
import { socialEngineeringModule } from './social-engineering';

export const modules: Module[] = [
  networkSecurityModule,
  webSecurityModule,
  cryptographyModule,
  osintModule,
  mobileSecurityModule,
  socialEngineeringModule,
];

export { 
  networkSecurityModule,
  webSecurityModule,
  cryptographyModule,
  osintModule,
  mobileSecurityModule,
  socialEngineeringModule,
};
