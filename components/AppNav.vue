<template>
  <nav>
    <nuxt-link to="/">Projects</nuxt-link>
    <nuxt-link to="/work">Work History</nuxt-link>
    <a href="https://github.com/krestaino" target="_blank">GitHub</a>
    <a href="https://www.linkedin.com/in/kevinrestaino/" target="_blank">LinkedIn</a>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 9px auto 26px;

  @media (max-width: 767px) {
    margin-bottom: 16px;
  }

  a {
    border-bottom: 1px solid transparent;
    color: #888;
    font-weight: 300;
    transition: 0.3s;

    @media (max-width: 767px) {
      font-size: 16px;
    }

    &:hover {
      border-bottom: 1px solid;
    }

    + a {
      margin-left: 16px;
    }
  }
}
</style>
