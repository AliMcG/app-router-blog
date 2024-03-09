export default {
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest",
  verbose: true,
  moduleNameMapper: {
    "~/(.*)": ["<rootDir>/src/$1"]
},
  setupFiles: ["dotenv/config"],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    "/node_modules/(?!superjson)/",  // Ignore all node_modules except superjson
  ],
};