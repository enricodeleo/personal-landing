<template>
  <footer class="max-w-prose mx-auto text-center text-sm text-gray-500 dark:text-gray-400 pb-5 px-5 md:px-12 select-none">
    <nav class="mb-4">
      <NuxtLink to="/" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">Home</NuxtLink>
      <span class="mx-2">/</span>
      <NuxtLink to="/bio" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">Bio</NuxtLink>
    </nav>
    <p class="pb-3">
      Deleo Enrico - P.IVA: 02714140841 - Codice REA: RM1678566
    </p>
    <p class="pb-3">
      Copyright &copy; 2010-{{ currentYear }} Enrico Deleo
    </p>
    <a href="https://www.iubenda.com/privacy-policy/13699998" class="iubenda-black iubenda-embed mx-auto" title="Privacy Policy ">
      Privacy Policy
    </a>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data () {
    return {
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<style>
.iubenda-ibadge {
  margin: 0 auto;
}
</style>
