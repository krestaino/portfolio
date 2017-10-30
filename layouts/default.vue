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
      <span>© {{ currentYear }} Kevin Restaino. All rights reserved.</span>
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
  max-width: 800px;
}

a {
  color: #888;
  text-decoration: none;
}

h1 {
  font-size: 28px;
  font-weight: 100;
  text-align: center;
}

h1, h2, h3 {
  font-family: 'Roboto Slab', serif;
}

.button {
  background-color: #ddd;
  border-radius: 3px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  transition: 0.3s;

  &:hover {
    background-color: #ccc;
    color: #666;
  }
}

.lazy {
  position: relative;
  transition: 1s;

  img {
    display: block;
    height: auto;
    opacity: 0;
    width: 100%;
  }

  &.loading {
    .spinner {
      opacity: 1;
    }
  }

  &.loaded {
    opacity: 1;

    .spinner {
      opacity: 0;
      transition: none;
    }

    img {
      opacity: 1;
    }
  }
}

.spinner,
.spinner:after {
  border-radius: 50%;
  height: 40px;
  width: 40px;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left: 4px solid #aaa;
  animation: spin 1.1s infinite linear;
  left: 50%;
  margin: -20px;
  position: absolute;
  top: 50%;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.header {
  border-bottom: 1px solid #ddd;
  margin-bottom: 24px;
}

.footer {
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 36px;

  span {
    color: #bbb;
    font-size: 14px;
  }
}

.lazy {
  background-image: url(~/static/images/transp_bg.png);

  img {
    backface-visibility: hidden;
    height: 100%;
    opacity: 0;
    transition: opacity 0.5s;
    width: 100%;

    &[lazy=loaded] {
      opacity: 1;
    }
  }
}
</style>
