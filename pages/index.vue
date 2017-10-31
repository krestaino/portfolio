<template>
  <div class="work">
    <ul class="projects">
      <li v-for="project in projects" :key="project.id">
        <article>
          <router-link tag="a" :to="`/work/${project.category}/${project.slug}`">
            <span class="hover-text">{{ project.title }}</span>
            <div class="image-container lazy">
              <img class="thumb" v-lazy="`/work/${project.category}/${project.slug}/${project.slug}_thumb@2x.png`"/>
              <div class="spinner"></div>
            </div>
          </router-link>
          <div class="details">
            <h3>{{ project.title }}</h3>
            <div>
              <router-link tag="a" :to="project.github" class="button" target="_blank" v-if="project.github">GitHub <img src="~/assets/icons/github.svg"></router-link>
              <router-link tag="a" :to="project.url" class="button" target="_blank" v-if="project.url">Visit Site <img src="~/assets/icons/ic_open_in_new_black_24px.svg"></router-link>
              <router-link tag="a" :to="`/work/${project.category}/${project.slug}`" class="button">View Project</router-link>
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
      height: 100%;
      height: 450px;
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
      padding: 0 16px;
      width: 100%;

      h3 {
        flex: 1;
        font-weight: 400;
      }

      .button {
        display: inline-flex;

        & + .button {
          margin-left: 8px;
        }
      }
    }
  }
}
</style>
