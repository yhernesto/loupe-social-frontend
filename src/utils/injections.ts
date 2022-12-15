// https://stackoverflow.com/questions/66067916/vue-3-inject-plugin-with-composition-api-and-typescript
import { inject } from 'vue'

function injectStrict<T>(key: string, fallback?: T) {
  const resolved = inject(key, fallback)
  if (!resolved) {
    throw new Error(`Could not resolve ${key}`)
  }

  return resolved
}

export { injectStrict }