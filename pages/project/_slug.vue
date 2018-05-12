<template>
  <section>
    <div v-if="!$apollo.loading">
      <div class="details">
        <div class="row" v-observe-visibility="visibilityChanged">
          <div class="col">
            <div>
              <h2>{{ projects[0].title }} – {{ projects[0].type }}</h2>
            </div>
          </div>
          <div class="col buttons">
            <a class="button" target="_blank" :href="'https://github.com/' + projects[0].github" v-if="projects[0].github">
              <span>GitHub <img src="~/assets/icons/github.svg"></span>
              <span v-if="githubStars !== null">(&#9733;{{ githubStars }})</span>
              <span v-else>(&#9733;<span class="spinner --inline"></span>)</span>
            </a>
            <a class="button" target="_blank" :href="projects[0].url"  v-if="projects[0].url">Visit Site <img src="~/assets/icons/ic_open_in_new_black_24px.svg"></a>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div v-html="descriptionHTML" id="description"></div>
            <em>
              <span v-for="(tag, index) in projects[0].tags" :key="index">{{ tag.title }}</span>
            </em>
          </div>
        </div>
      </div>
      <nav :class="{ visible: navIsVisible }">
        <div class="container">
          <div>
            <span>{{ projects[0].title }} – {{ projects[0].type }}</span>
          </div>
          <div>
            <a class="button" target="_blank" :href="projects[0].github" v-if="projects[0].github">
              GitHub <img src="~/assets/icons/github.svg"><span v-if="githubStars">(&#9733;{{ githubStars }})</span>
            </a>
            <a class="button" target="_blank" :href="projects[0].url" v-if="projects[0].url">Visit Site <img src="~/assets/icons/ic_open_in_new_black_24px.svg"></a>
          </div>
        </div>
      </nav>
      <ul>
        <li class="lazy" v-for="(screenshot, index) in sortedScreenshots" :key="index">
          <figure>
            <img v-lazy="$store.state.apiUrl + screenshot.url"/>
            <span class="spinner"></span>
          </figure>
        </li>
      </ul>
    </div>
    <span v-else class="spinner"></span>
  </section>
</template>

<script>
import projects from '~/apollo/queries/project.gql'
import showdown from 'showdown'

export default {
  apollo: {
    projects: {
      query: projects,
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables () {
        return { slug: this.$route.params.slug }
      },
      result (data) {
        if (data.data.projects[0].github) {
          this.getRepo()
        }
      }
    }
  },
  data () {
    return {
      navIsVisible: false,
      githubStars: null,
      projects: []
    }
  },
  computed: {
    documentTitle () {
      if (this.projects.length) {
        return `${this.projects[0].title} – ${this.projects[0].type} | %s`
      }
    },
    descriptionHTML () {
      return new showdown.Converter().makeHtml(this.projects[0].description)
    },
    sortedScreenshots () {
      return this.projects[0].screenshots.slice().sort((a, b) => a.name.localeCompare(b.name))
    }
  },
  head () {
    return {
      titleTemplate: this.documentTitle
    }
  },
  methods: {
    getRepo () {
      this.$axios.get(`https://api.github.com/repos/${this.projects[0].github}`).then(response => {
        setTimeout(() => {
          this.githubStars = response.data.stargazers_count
        }, 333)
      })
    },
    visibilityChanged (isVisible, entry) {
      this.navIsVisible = !isVisible
    }
  }
}
</script>

<style lang="scss">
#description {
  p {
    margin: 0;
  }
}
</style>


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

.details {
  align-items: center;
  display: flex;
  flex-direction: column;

  .row {
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;

    & + .row {
      margin-top: 16px;
    }

    @media (max-width: 650px) {
      flex-direction: column;
    }

    .col {
      display: flex;
      flex-direction: column;
      width: 100%;

      &.buttons {
        flex-direction: row;
        justify-content: flex-end;

        @media (max-width: 650px) {
          justify-content: flex-start;
        }
      }
    }
  }

  h2 {
    font-size: 20px;
    font-weight: 400;
  }

  p {
    margin: 0;

    & + p {
      margin-top: 16px;
    }
  }

  em {
    margin-top: 1rem;

    span + span::before {
      content: ', '
    }
  }

  .button {
    & + .button {
      margin-left: 16px;
    }

    > span:first-child {
      margin-right: 4px;
    }
  }
}

ul {
  box-shadow: 0px 0px 36px 0px rgba(0,0,0,0.25);
  list-style: none;
  margin: 32px auto 0;
  max-width: 1000px;
  padding: 0;

  figure {
    overflow: hidden;
    margin: 0;
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

  li:last-child:not(:first-child) {
    figure {
      padding-top: 0;
    }

    img {
      position: relative;
    }
  }
}
</style>
