/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  moduleNameMapper: {
    '^@websocket/(.*)$': '<rootDir>/src/websocket/$1',
    '^@jobQueue/(.*)$': '<rootDir>/src/jobQueue/$1',
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@redis/(.*)$': '<rootDir>/src/redis/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
  },
  //setupFiles: ['<rootDir>/jest.setupRedisMock.ts'],
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};
