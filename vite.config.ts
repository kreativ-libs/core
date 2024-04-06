import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    retry: 0,
    typecheck: {
      enabled: true,
    },
  },
})
