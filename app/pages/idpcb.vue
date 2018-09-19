<template>
  <new-article-list/>
  <!-- <terms-of-service/> -->
</template>

<script>
import NewArticleList from '~/components/pages/NewArticleList'
// import TermsOfService from '~/components/pages/TermsOfService'

export default {
  components: {
    NewArticleList
    // TermsOfService
  },
  async fetch({ store }) {
    // if (store.state.user.currentUser)
    // const topic = 'crypto'
    // await store.dispatch('article/getTopics')
    // store.dispatch('article/resetArticleData')
    // await store.dispatch('article/getPopularArticles', { topic })
  },
  async mounted() {
    console.log(this.$store.state.user)
    this.$store.dispatch('user/checkAuth', { url: this.$route.fullPath })
    // await this.$store.dispatch('user/getUserSession')
    this.$store.dispatch('user/setSignUpAuthFlowModal', { showSignUpAuthFlowModal: true })
    this.$store.dispatch('user/setSignUpAuthFlowInputPhoneNumberModal', {
      isSignUpAuthFlowInputPhoneNumberModal: true
    })

    if (window.innerWidth <= 550) {
      document.querySelector('html,body').style.overflow = ''
    }
    history.replaceState(null, null, '/articles/recent')
  },
  head: {
    title: 'サインアップ',
    meta: [
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'サインアップ | ALIS'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'サインアップ'
      }
    ]
  }
}
</script>
