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
    // async fetch({ store, query }) {
    const topic = this.$route.query.topic
    await this.$store.dispatch('article/getTopics')
    this.$store.dispatch('article/setTopicDisplayName', { topicName: topic })
    this.$store.dispatch('article/resetArticleData')
    await this.$store.dispatch('article/getNewPagesArticles', { topic })
    // const topic = query.topic
    // await store.dispatch('article/getTopics')
    // store.dispatch('article/setTopicDisplayName', { topicName: topic })
    // store.dispatch('article/resetArticleData')
    // await store.dispatch('article/getNewPagesArticles', { topic })
  },
  head() {
    return {
      title: `${this.$store.state.article.topicDisplayName} - 新着記事`,
      meta: [
        {
          hid: `og:title`,
          property: 'og:title',
          content: `${this.$store.state.article.topicDisplayName} - 新着記事 | ALIS`
        },
        {
          hid: `og:description`,
          property: 'og:description',
          content: `${this.$store.state.article.topicDisplayName}新着記事一覧`
        }
      ]
    }
  }
}
</script>
