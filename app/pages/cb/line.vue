<template>
  <new-article-list/>
</template>

<script>
import NewArticleList from '~/components/pages/NewArticleList'

export default {
  components: {
    NewArticleList
  },
  async mounted() {
    try {
      global.showModal = () => {
        this.$store.dispatch('user/setSignUpAuthFlowModal', { showSignUpAuthFlowModal: true })
        this.$store.dispatch('user/setSignUpAuthFlowInputAliasUserIdModal', { isShow: true })
      }
      const { code } = this.$route.query
      console.log('this.$route.query.code', code)
      if (code) {
        const hasAliasUserId = await this.$store.dispatch('user/checkAuthByLine', { code })
        // const hasAliasUserId = false
        if (!hasAliasUserId) {
          this.$store.dispatch('user/setSignUpAuthFlowModal', { showSignUpAuthFlowModal: true })
          this.$store.dispatch('user/setSignUpAuthFlowInputAliasUserIdModal', { isShow: true })
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
