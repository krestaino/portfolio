<template>
  <section>
    <ul v-if="!$apollo.loading">
      <li v-for="(article, index) in sortedArticles" :key="index">
        <article>
          <router-link :to="`/blog/${article.slug}`" v-if="article.image">
            <figure class="lazy">
              <img v-lazy="'https://portfolio-api.kmr.io' + article.image.url"/>
              <span class="spinner"></span>
            </figure>
          </router-link>
          <div class="details">
            <router-link :to="`/blog/${article.slug}`"><h2>{{ article.title }}</h2></router-link>
            <p>{{ article.teaserText }}</p>
            <div>
              <span class="timestamp">{{ formatDate(article.publishAt) }}</span>
              <router-link :to="`/blog/${article.slug}`" class="button">Read Article</router-link>
            </div>
          </div>
        </article>
      </li>
    </ul>
    <span v-else class="spinner"></span>
  </section>
</template>

<script>
import { format } from 'date-fns'
import allArticles from '~/apollo/queries/allArticles.gql'

export default {
  apollo: {
    articles: {
      prefetch: true,
      query: allArticles
    }
  },
  computed: {
    sortedArticles () {
      return this.articles.slice().sort((a, b) => new Date(b.publishAt) - new Date(a.publishAt))
    }
  },
  data () {
    return {
      articles: []
    }
  },
  head () {
    return {
      titleTemplate: `Work History | %s`
    }
  },
  methods: {
    formatDate (date) {
      return format(date, 'MMM DD, YYYY')
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;

  li {
    width: 100%;
    
    & + li {
      margin-top: 36px;
    }
  }

  article {
    border-radius: 3px;
    box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.25);
    overflow: hidden;
    width: 100%;

    > a {
      border-bottom: 0;
      display: block;
      position: relative;

      &:hover {
        img {
          transform: scale(1.025);
        }
      }
    }

    figure {
      overflow: hidden;
      margin: 0;
      min-height: 300px;
      padding-top: 56.25%;
      position: relative;

      img {
        display: block;
        left: 0;
        position: absolute;
        top: 0;
        transition: 0.5s;

        &[lazy="loaded"] {
          & + .spinner {
            display: none;
          }
        }
      }
    }

    .details {
      background-color: #fff;
      display: flex;
      flex-direction: column;
      padding: 16px;
      width: 100%;

      > div {
        align-items: flex-end;
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
      }

      @media (max-width: 700px) {
        flex-direction: column;
        text-align: center;
      }

      a {
        display: inline;
      }

      h2 {
        flex: 1;
        font-weight: 400;
        margin: 0;

        @media (max-width: 700px) {
          margin-bottom: 8px;
        }
      }

      p {
        margin: 1rem 0 0 0;
      }

      .timestamp {
        font-size: 0.7rem;
        opacity: 0.8;
      }

      .button {
        margin-left: auto;
      }
    }
  }
}
</style>
