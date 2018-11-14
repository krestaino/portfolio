<template>
  <div id="app">
    <header class="header">
      <h1>Kevin Restaino</h1>
      <app-nav></app-nav>
    </header>
    <section class="route">
      <nuxt/>
    </section>
    <footer class="footer">
      <span>© {{ currentYear }} Kevin Restaino.<br>All copyrights belong to their respective owners.</span>
    </footer>
  </div>
</template>

<script>
import AppNav from '~/components/AppNav'

export default {
  components: {
    AppNav
  },
  computed: {
    currentYear () {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss">
.page-enter-active {
  transition: opacity .3s;
}
.page-enter, .page-leave-active {
  opacity: 0;
}

html {
  background-color: #f1f1f1;
  box-sizing: border-box;
  overflow-y: scroll;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body {
  color: #666;
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  font-weight: 300;
  padding: 36px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  margin: auto;
  max-width: 900px;

  > * {
    opacity: 0;
  }
}

.wf-active #app,
.wf-inactive #app {
  > *  {
    transition: 0.5s;
    opacity: 1;
  }

  > .spinner {
    display: none;
  }
}


header {
  border-bottom: 1px solid #ddd;
  margin-bottom: 24px;
}

section {
  min-height: 450px;
  position: relative;
}

a {
  border-bottom: 1px solid transparent;
  color: #444;
  font-weight: 400;
  text-decoration: none;
  transition: 0.3s;

  &:hover {
    border-color: inherit;
  }
}

header {
  h1 {
    font-size: 28px;
    font-weight: 300;
    text-align: center;
  }
}

h1, h2, h3 {
  font-family: 'Roboto Slab', serif;
  font-weight: 400;
}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.3rem;
}

h3 {
  font-size: 1rem;
}

.button {
  align-items: center;
  border-bottom: 0;
  background-color: #ddd;
  border-radius: 3px;
  color: #777;
  display: inline-flex;
  padding: 8px 16px;
  position: relative;
  font-size: 12px;
  font-weight: 500;
  text-decoration: none;
  text-transform: uppercase;
  transition: 0.3s;

  span {
    align-items: center;
    display: flex;
  }

  &:hover {
    background-color: #ccc;
    color: #666;
  }

  img {
    height: 12px;
    margin-left: 4px;
    opacity: 0.5;
  }
}

.footer {
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 36px;
  text-align: center;

  span {
    color: #bbb;
    font-size: 14px;
  }
}

.spinner,
.spinner:after {
  border-radius: 50%;
  height: 40px;
  width: 40px;
}

.spinner {
  animation: spin 1.1s infinite linear;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left: 4px solid #aaa;
  display: inline-block;
  left: 50%;
  margin: -20px;
  position: absolute;
  top: 50%;

  &.--inline {
    border-width: 3px;
    height: 13px;
    left: 0;
    margin: 0;
    position: relative;
    top: 0;
    width: 13px;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.lazy {
  background-image: url(~/static/images/transp_bg.png);
  background-attachment: fixed;
  position: relative;
  transition: 1s;

  img {
    display: block;
    height: 100%;
    opacity: 0;
    transition: opacity 0.5s;
    width: 100%;

    &[lazy=loaded] {
      opacity: 1;

      & + .spinner {
        display: none;
      }
    }
  }
}
</style>
