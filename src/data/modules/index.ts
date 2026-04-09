import { Module } from '@/types/quiz';
import { networkSecurityModule } from './network-security';
import { webSecurityModule } from './web-security';
import { cryptographyModule } from './cryptography';
import { osintModule } from './osint';
import { mobileSecurityModule } from './mobile-security';
import { socialEngineeringModule } from './social-engineering';
import { malwareAnalysisModule } from './malware-analysis';
import { cloudSecurityModule } from './cloud-security';
import { penetrationTestingModule } from './penetration-testing';

export const modules: Module[] = [
  networkSecurityModule,
  webSecurityModule,
  cryptographyModule,
  osintModule,
  mobileSecurityModule,
  socialEngineeringModule,
  malwareAnalysisModule,
  cloudSecurityModule,
  penetrationTestingModule,
];

export { 
  networkSecurityModule,
  webSecurityModule,
  cryptographyModule,
  osintModule,
  mobileSecurityModule,
  socialEngineeringModule,
  malwareAnalysisModule,
  cloudSecurityModule,
  penetrationTestingModule,
};
