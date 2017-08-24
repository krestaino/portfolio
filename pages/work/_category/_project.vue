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
          <a class="button" target="_blank" :href="project.github" v-if="project.github">GitHub Repo</a>
          <a class="button" target="_blank" :href="project.url">Live Site</a>
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
        <nuxt-link class="button" tag="a" :to="`/work/${previousProject.category}/${previousProject.slug}`" v-if="previousProject.slug">Previous Project</nuxt-link>
        <span>{{ project.title }}</span>
        <nuxt-link class="button" tag="a" :to="`/work/${nextProject.category}/${nextProject.slug}`" v-if="nextProject.slug">Next Project</nuxt-link>
      </div>
    </nav>
    <ul class="image">
      <li class="lazy" v-for="n in project.imageListLength">
        <img v-lazy="`/work/${project.category}/${project.slug}/${project.slug}-${n}.png`" :data-srcset="`/work/${project.category}/${project.slug}/${project.slug}-${n}@2x.png 2x`">
        <div class="spinner"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      project: {},
      previousProject: {},
      nextProject: {}
    }
  },
  methods: {
    getProjects () {
      let result = this.$store.state.projects.filter((obj) => {
        return obj.slug === this.$route.params.project
      })

      if (result.length) {
        if (result[0].category === this.$route.params.category) {
          this.project = result[0]
          this.getPreviousProject()
          this.getNextProject()
        }
      }
    },
    getPreviousProject () {
      let result = this.$store.state.projects.filter((obj) => {
        return obj.id === this.project.id - 1
      })

      if (result.length) {
        this.previousProject = result[0]
      } else {
        this.previousProject = {}
      }
    },
    getNextProject () {
      let result = this.$store.state.projects.filter((obj) => {
        return obj.id === this.project.id + 1
      })

      if (result.length) {
        this.nextProject = result[0]
      } else {
        this.nextProject = {}
      }
    }
  },
  mounted () {
    this.getProjects()
  }
}
</script>

<style scoped lang="scss">
nav {
  margin-top: 16px;
  padding: 8px 0;
  position: absolute;
  width: 100%;
  z-index: 10;

  &.visible {
    background-color: #f1f1f1;
    box-shadow: 0px 0px 18px 0px rgba(0,0,0,0.35);
    left: 0;
    margin-top: 0;
    position: fixed;
    top: -100px;
    transform: translateY(100px);
    transition: transform 1s;

    span {
      display: block;
    }
  }
  
  .container {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 800px;
    width: inherit;
  }

  span {
    display: none;
    font-size: 14px;
    font-weight: bold;
  }
}

.project {
  position: relative;
}

.details {
  align-items: center;
  display: flex;
  flex-direction: column;

  .row {
    align-items: flex-end;
    display: flex;
    justify-content: space-between;
    width: 100%;

    & + .row {
      margin-top: 18px;
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
    font-size: 18px;
    font-weight: 400;
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
  margin: 80px auto 0;
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
