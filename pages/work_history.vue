<template>
  <ul>
    <li v-for="(job, index) in jobs" :key="index">
      <div class="title">{{ job.title }}</div>
      <div class="company">{{ job.company }}</div>
      <div class="timePeriod">{{ job.from }} – {{ job.to }}</div>
      <div class="location">{{ job.location }}</div>
    </li>
  </ul>
</template>

<script>
import allJobs from '~/apollo/queries/allJobs.gql'

export default {
  apollo: {
    jobs: {
      prefetch: true,
      query: allJobs
    }
  },
  data () {
    return {
      jobs: []
    }
  },
  head () {
    return {
      titleTemplate: `Work History | %s`
    }
  }
}
</script>

<style scoped lang="scss">
ul {
  list-style: none;
  padding: 0;
  text-align: center;
  
  li {
    margin-top: 30px;
  }

  .title {
    font-family: 'Roboto Slab', serif;
    font-weight: 400;
  }

  .timePeriod,
  .location {
    font-size: 15px;
  }

  .location {
    color: #888;
  }
}
</style>
