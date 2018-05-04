<template>
  <div>
    <ul class="projects">
      <li v-for="project in projects" :key="project.id" v-if="project.id">
        <article>
          <router-link tag="a" :to="`/project/${project.slug}`">
            <span class="hover-text">{{ project.title }}</span>
            <div class="image-container lazy" v-if="project.thumbnail">
              <img class="thumb" v-lazy="'https://portfolio-api.kmr.io' + project.thumbnail.url"/>
              <div class="spinner"></div>
            </div>
          </router-link>
          <div class="details">
            <h3>{{ project.title }} – {{ project.type }}</h3>
            <div class="buttons">
              <a :href="project.github" class="button" target="_blank" v-if="project.github">GitHub <img src="~/assets/icons/github.svg"></a>
              <a :href="project.url" class="button" target="_blank" v-if="project.url">Visit Site <img src="~/assets/icons/ic_open_in_new_black_24px.svg"></a>
              <router-link tag="a" :to="`/project/${project.slug}`" class="button">View Project</router-link>
            </div>
          </div>
        </article>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    projects () {
      return this.$store.state.projects
    }
  }
}
</script>

<style scoped lang="scss">
.projects {
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

    .hover-text {
      color: #fff;
      font-size: 28px;
      font-weight: 100;
      margin-top: -9px;
      opacity: 0;
      padding: 0 16px;
      position: absolute;
      text-align: center;
      transform: translateY(-18px);
      transition: 0.3s;
      top: 50%;
      width: 100%;
      z-index: 1;
    }

    .image-container {
      overflow: hidden;
      padding-top: 56.25%;
      position: relative;

      &::after {
        background-color: rgba(0,0,0,0);
        border-radius: inherit;
        content: '';
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        transition: 0.3s;
        width: 100%;
      }
    }

    .thumb {
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

    .details {
      align-items: center;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      padding: 16px;
      width: 100%;

      @media (max-width: 700px) {
        flex-direction: column;
        text-align: center;
      }

      h3 {
        flex: 1;
        font-weight: 400;
        margin: 0 8px;

        @media (max-width: 700px) {
          margin-bottom: 8px;
        }
      }

      .buttons {
        @media (max-width: 700px) {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }

      .button {
        display: inline-flex;

        @media (max-width: 700px) {
          display: flex;
          justify-content: center;
        }

        & + .button {
          margin-left: 8px;

          @media (max-width: 700px) {
            margin-left: 0;
            margin-top: 8px;
          }
        }
      }
    }
  }
}
</style>
