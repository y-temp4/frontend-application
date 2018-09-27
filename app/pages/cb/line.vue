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
      global.showCompleteModal = () => {
        this.$store.dispatch('user/setSignUpAuthFlowModal', { showSignUpAuthFlowModal: true })
        this.$store.dispatch('user/setSignUpAuthFlowCompletedAuthModal', { isShow: true })
      }
      const { code } = this.$route.query
      console.log('this.$route.query.code', code)
      if (!code) return
      const { hasAliasUserId, status } = await this.$store.dispatch('user/checkAuthByLine', {
        code
      })
      if (!hasAliasUserId) {
        this.$store.dispatch('user/setSignUpAuthFlowModal', { showSignUpAuthFlowModal: true })
        this.$store.dispatch('user/setSignUpAuthFlowInputAliasUserIdModal', { isShow: true })
        return
      }
      if (status === 'login') return
      this.$store.dispatch('user/setSignUpAuthFlowModal', { showSignUpAuthFlowModal: true })
      this.$store.dispatch('user/setSignUpAuthFlowCompletedAuthModal', { isShow: true })
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
