<template>
  <section>
    <div v-if="!$apollo.loading">
      <article id="article">
        <h1>{{ articles[0].title }}</h1>
        <div v-html="bodyHTML"></div>
      </article>
    </div>
    <span v-else class="spinner"></span>
  </section>
</template>

<script>
import articles from '~/apollo/queries/article.gql'
import showdown from 'showdown'

export default {
  apollo: {
    articles: {
      query: articles,
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables () {
        return { slug: this.$route.params.slug }
      }
    }
  },
  data () {
    return {
      navIsVisible: false,
      articles: []
    }
  },
  computed: {
    bodyHTML () {
      return new showdown.Converter().makeHtml(this.articles[0].body)
    },
    documentTitle () {
      if (this.articles.length) {
        return `${this.articles[0].title} – ${this.articles[0].type} | %s`
      }
    }
  },
  head () {
    return {
      titleTemplate: this.documentTitle
    }
  },
  methods: {
    visibilityChanged (isVisible, entry) {
      this.navIsVisible = !isVisible
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  background-color: #f1f1f1;
  box-shadow: 0px 0px 18px 0px rgba(0,0,0,0.35);
  left: 0;
  padding: 8px 0;
  position: fixed;
  top: 0;
  transform: translateY(-100px);
  transition: 0.5s;
  visibility: hidden;
  width: 100%;
  z-index: 10;

  @media (max-width: 880px) {
    padding: 8px 36px;
  }

  &.visible {
    transform: translateY(0);
    visibility: visible;
  }
  
  .container {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 800px;
    width: inherit;

    > div {
      display: flex;

      a + a {
        margin-left: 8px;
      }
    }
  }

  span {
    font-size: 14px;
    font-weight: 400;
    margin-left: 4px;
  }
}
</style>

<style lang="scss">
#article {
  text-align: left;

  h1 {
    text-align: left;
  }

  img {
    max-width: 100%;
  }
}
</style>
