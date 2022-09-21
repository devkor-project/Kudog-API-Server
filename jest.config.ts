/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-extraneous-dependencies */
import { pathsToModuleNameMapper } from 'ts-jest';
import type { Config } from '@jest/types';
import { compilerOptions } from './tsconfig.json';

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
};
export default config;
