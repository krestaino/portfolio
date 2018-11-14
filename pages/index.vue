<template>
  <section>
    <ul v-if="!$apollo.loading">
      <li v-for="(project, index) in sortedProjects" :key="index">
        <article>
          <router-link :to="`/project/${project.slug}`">
            <figure class="lazy">
              <img v-lazy="$store.state.apiUrl + project.thumbnail.url"/>
              <span class="spinner"></span>
            </figure>
          </router-link>
          <div class="details">
            <h2>{{ project.title }} – {{ project.type }}</h2>
            <div class="buttons">
              <a
                v-if="project.appStore"
                :href="project.appStore"
                class="store"
                target="_blank"
              >
                <img src="~/assets/icons/app-store.svg">
              </a>
              <a
                v-if="project.playStore"
                :href="project.playStore"
                class="store"
                target="_blank"
              >
                <img src="~/assets/icons/google-play.svg">
              </a>
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
              <router-link :to="`/project/${project.slug}`" class="button">Read More</router-link>
            </div>
          </div>
        </article>
      </li>
    </ul>
    <span v-else class="spinner"></span>
  </section>
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
  computed: {
    sortedProjects () {
      return this.projects.slice().sort((a, b) => a.order - b.order)
    }
  },
  data () {
    return {
      projects: []
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

      @media (max-width: 940px) {
        flex-direction: column;
        text-align: center;
      }

      h2 {
        flex: 1;
        font-weight: 400;
        margin: 0 8px;

        @media (max-width: 940px) {
          margin-bottom: 8px;
        }
      }

      .buttons {
        display: flex;
        
        @media (max-width: 940px) {
          justify-content: center;
          flex-wrap: wrap;
        }
      }

      a {
        display: inline-flex;

        & + a {
          margin-left: 8px;
        }

        @media (max-width: 940px) {
          margin: 4px;
          width: 135px;

          & + a {
            margin-left: 4px;
          }

          display: inline-flex;
          justify-content: center;
        }
      }

      .store {
        border: none;

        &:hover {
          img {
            opacity: 0.85;
          }
        }
        
        img {
          display: block;
          height: 40px;
          transition: opacity 0.3s;
        }
      }
    }
  }
}
</style>
