<template>
</template>

<script>
export default {
  async fetch({ query, $axios }) {
    try {
      if (query.code) {
        await this.$store.dispatch('user/checkAuthByLine', { code: query.code })
      }
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
