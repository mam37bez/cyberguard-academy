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
import { iotSecurityModule } from './iot-security';
import { privacyAnonymityModule } from './privacy-anonymity';
import { digitalForensicsModule } from './digital-forensics';

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
  iotSecurityModule,
  privacyAnonymityModule,
  digitalForensicsModule,
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
  iotSecurityModule,
  privacyAnonymityModule,
  digitalForensicsModule,
};
