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
          <a class="button" target="_blank" :href="project.github" v-if="project.github">GitHub <img src="~/assets/icons/github.svg"></a>
          <a class="button" target="_blank" :href="project.url">Live Site <img src="~/assets/icons/ic_open_in_new_black_24px.svg"></a>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p>{{ project.description }}</p>
        </div>
      </div>
    </div>
    <nav>
      <div class="container">
        <div>
          <span>{{ project.title }}</span>
        </div>
        <div>
          <a class="button" target="_blank" :href="project.github" v-if="project.github">GitHub <img src="~/assets/icons/github.svg"></a>
          <a class="button" target="_blank" :href="project.url">Live Site <img src="~/assets/icons/ic_open_in_new_black_24px.svg"></a>
        </div>
      </div>
    </nav>
    <ul class="image">
      <li class="lazy" v-for="n in project.imageListLength">
        <img v-lazy="`/work/${project.category}/${project.slug}/${project.slug}-${n}@2x.png`"/>
        <div class="spinner"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import inView from 'in-view'

export default {
  data () {
    return {
      project: {},
      previousProject: {},
      nextProject: {}
    }
  },
  head () {
    return {
      titleTemplate: `${this.project.title} | %s`
    }
  },
  methods: {
    getProject () {
      let result = this.$store.state.projects.filter((obj) => {
        return obj.slug === this.$route.params.project
      })

      if (result.length) {
        if (result[0].category === this.$route.params.category) {
          this.project = result[0]
        }
      }
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
    this.getProject()
    this.projectNav()
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
    font-weight: bold;
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

    .col {
      display: flex;
      flex-direction: column;

      &.buttons {
        flex-direction: row;
      }
    }
  }

  h2 {
    font-size: 20px;
    font-weight: 400;
  }

  p {
    margin: 0;
  }

  .button {
    & + .button {
      margin-left: 16px;
    }
  }
}

.image {
  box-shadow: 0px 0px 36px 0px rgba(0,0,0,0.25);
  list-style: none;
  margin: 32px auto 0;
  max-width: 1000px;
  padding: 0;

  .lazy {
    min-height: 450px;

    img {
      &[lazy="loaded"] {
        & + .spinner {
          display: none;
        }
      }
    }

    &:last-child {
      min-height: 0;
    }

    &:first-child {
      min-height: 450px;
    }
  }
}
</style>
