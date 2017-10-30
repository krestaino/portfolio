<template>
  <div class="app-nav">
    <nuxt-link tag="a" to="/">Work</nuxt-link>
    <nuxt-link tag="a" to="/experience">Experience</nuxt-link>
    <a href="https://github.com/krestaino" target="_blank">GitHub</a>
    <a href="https://www.linkedin.com/in/kevinrestaino/" target="_blank">LinkedIn</a>
  </div>
</template>

<style scoped lang="scss">
.app-nav {
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 9px auto 26px;

  a {
    border-bottom: 1px solid transparent;
    color: #888;
    font-weight: 300;
    transition: 0.3s;

    &:hover {
      border-bottom: 1px solid;
    }

    + a {
      margin-left: 16px;
    }
  }
}
</style>
