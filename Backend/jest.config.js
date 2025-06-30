/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],  // مكان ملفات الكود والاختبار (عدله حسب مشروعك)
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],  // ملفات الاختبار
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
