<template>
  <div class="work">
    <ul class="projects">
      <li v-for="project in projects">
        <router-link tag="a" :to="`/work/${project.category}/${project.slug}`">
          <h3>{{ project.title }}</h3>
          <div class="image-container lazy">
            <img v-lazy="`/work/${project.category}/${project.slug}/${project.slug}_thumb.png`" :srcset="`/work/${project.category}/${project.slug}/${project.slug}_thumb@2x.png 2x`"/>
            <div class="spinner"></div>
          </div>
        </router-link>
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

    a {
      display: block;
      position: relative;
    }

    h3 {
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
      border-radius: 3px;
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

    img {
      display: block;
      height: 100%;
      height: 450px;

      &[lazy="loaded"] {
        box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.25);

        & + .spinner {
          display: none;
        }
      }
    }

    a:hover {
      h3 {
        opacity: 1;
        transform: translateY(0);
      }

      .image-container::after {
        background-color: rgba(0,0,0,0.85);
      }
    }
  }
}
</style>
