<template>
  <div class="project" v-if="project">
    <div class="details">
      <div class="row">
        <div class="col">
          <div>
            <h2>{{ project.title }}</h2>
          </div>
        </div>
        <div class="col buttons">
          <a class="button" target="_blank" :href="project.github" v-if="project.github">
            GitHub <img src="~/assets/icons/github.svg"><span v-if="githubStars">(&#9733;{{ githubStars }})</span>
          </a>
          <a class="button" target="_blank" :href="project.url"  v-if="project.url">Visit Site <img src="~/assets/icons/ic_open_in_new_black_24px.svg"></a>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p v-html="project.description"></p>
          <p><em>{{ project.tech }}</em></p>
        </div>
      </div>
    </div>
    <nav>
      <div class="container">
        <div>
          <span>{{ project.title }}</span>
        </div>
        <div>
          <a class="button" target="_blank" :href="project.github" v-if="project.github">
            GitHub <img src="~/assets/icons/github.svg"><span v-if="githubStars">(&#9733;{{ githubStars }})</span>
          </a>
          <a class="button" target="_blank" :href="project.url" v-if="project.url">Visit Site <img src="~/assets/icons/ic_open_in_new_black_24px.svg"></a>
        </div>
      </div>
    </nav>
    <ul class="image">
      <li class="lazy" v-for="(screenshot, index) in screenshots" :key="index">
        <img v-lazy="'https://portfolio-api.kmr.io' + screenshot.url"/>
        <div class="spinner"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import inView from 'in-view'

export default {
  async asyncData ({ app, store, params }) {
    let { data } = await app.$axios.get(`https://portfolio-api.kmr.io/project?slug=${params.slug}`)
    return { project: data[0] }
  },
  data () {
    return {
      githubStars: null,
      project: null
    }
  },
  computed: {
    screenshots () {
      let screenshots = this.project.screenshots
      screenshots.sort(function (a, b) {
        return a.name.localeCompare(b.name)
      })
      return screenshots
    }
  },
  methods: {
    async getRepo () {
      if (!this.project.github) {
        return
      }
      let parts = this.project.github.split('/')
      let slug = parts.pop() || parts.pop() // handle potential trailing slash
      let response = await this.$axios.$get(`https://api.github.com/repos/krestaino/${slug}`)
      this.githubStars = response.stargazers_count
    },
    projectNav () {
      let nav = document.querySelector('.project nav')

      inView('.project .details')
        .on('enter', el => {
          nav.classList.remove('visible')
        })
        .on('exit', el => {
          nav.classList.add('visible')
        })
      inView.offset(-50)
    }
  },
  mounted () {
    this.projectNav()
    this.getRepo()
  }
}
</script>

<style scoped lang="scss">
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

  .button {
    & + .button {
      margin-left: 16px;
    }

    span {
      margin-left: 4px;
    }
  }
}

.image {
  box-shadow: 0px 0px 36px 0px rgba(0,0,0,0.25);
  list-style: none;
  margin: 32px auto 0;
  max-width: 1000px;
  padding: 0;

  .lazy img {
    max-height: 450px;

    &[lazy="loaded"] + .spinner {
      display: none;
    }
  }
}
</style>
