<template>
  <popular-article-list/>
</template>

<script>
import PopularArticleList from '~/components/pages/PopularArticleList'

export default {
  components: {
    PopularArticleList
  },
  async mounted() {
    // async fetch({ store, query }) {
    const topic = this.$route.query.topic
    await this.$store.dispatch('article/getTopics')
    this.$store.dispatch('article/setTopicDisplayName', { topicName: topic })
    this.$store.dispatch('article/resetArticleData')
    await this.$store.dispatch('article/getPopularArticles', { topic })
    // const topic = query.topic
    // await store.dispatch('article/getTopics')
    // store.dispatch('article/setTopicDisplayName', { topicName: topic })
    // store.dispatch('article/resetArticleData')
    // await store.dispatch('article/getPopularArticles', { topic })
  },
  head() {
    return {
      title: `${this.$store.state.article.topicDisplayName} - 人気記事`,
      meta: [
        {
          hid: `og:title`,
          property: 'og:title',
          content: `${this.$store.state.article.topicDisplayName} - 人気記事 | ALIS`
        },
        {
          hid: `og:description`,
          property: 'og:description',
          content: `${this.$store.state.article.topicDisplayName}人気記事一覧`
        }
      ]
    }
  }
}
</script>
