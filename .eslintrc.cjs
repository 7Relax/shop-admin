module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    // 'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    // 'plugin:vue/vue3-strongly-recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: [
    'vue'
  ],
  // 使用 ignorePatterns 来告诉 ESLint 忽略特定的文件和目录
  // ignorePatterns: ['vite.config.ts'],
  rules: {
    // 添加组件命名忽略规则
    'vue/multi-word-component-names': ['error', {
      // 需要忽略的组件名
      ignores: ['index']
    }]
  }
}
