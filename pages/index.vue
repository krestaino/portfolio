<template>
  <ul>
    <li v-for="(project, index) in projects" :key="index">
      <article>
        <router-link :to="`/project/${project.slug}`">
          <figure v-if="project.thumbnail" class="lazy">
            <img v-lazy="'https://portfolio-api.kmr.io' + project.thumbnail.url"/>
            <span class="spinner"></span>
          </figure>
        </router-link>
        <div class="details">
          <h2>{{ project.title }} – {{ project.type }}</h2>
          <div class="buttons">
            <a
              v-if="project.github"
              :href="'https://github.com/' + project.github"
              class="button"
              target="_blank"
            >
              GitHub <img src="~/assets/icons/github.svg">
            </a>
            <a
              v-if="project.url"
              :href="project.url"
              class="button"
              target="_blank"
            >
              Visit Site <img src="~/assets/icons/ic_open_in_new_black_24px.svg">
            </a>
            <router-link :to="`/project/${project.slug}`" class="button">View Project</router-link>
          </div>
        </div>
      </article>
    </li>
  </ul>
</template>

<script>
import allProjects from '~/apollo/queries/allProjects.gql'

export default {
  apollo: {
    projects: {
      prefetch: true,
      query: allProjects
    }
  },
  data () {
    return {
      projects: []
    }
  }
}
</script>

<style scoped lang="scss">
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

      h2 {
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
