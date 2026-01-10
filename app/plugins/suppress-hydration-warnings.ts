export default defineNuxtPlugin(() => {
  if (import.meta.env.PROD) {
    // Suppress hydration mismatch warnings caused by Cloudflare bot protection
    const originalError = console.error

    console.error = (...args) => {
      // Filter out hydration mismatch warnings
      const errorMessage = args[0]?.toString() || ''
      if (
        errorMessage.includes('Hydration completed but contains mismatches') ||
        errorMessage.includes('Hydration node mismatch')
      ) {
        return
      }
      // Call original console.error for other errors
      originalError.apply(console, args)
    }
  }
})
