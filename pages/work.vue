<template>
  <section>
    <ul v-if="!$apollo.loading">
      <li v-for="(job, index) in sortedJobs" :key="index">
        <div class="title">{{ job.title }}</div>
        <div class="company">{{ job.company }}</div>
        <div class="timePeriod">{{ job.from }} – {{ job.to }}</div>
        <div class="location">{{ job.location }}</div>
      </li>
    </ul>
    <span v-else class="spinner"></span>
  </section>
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
  computed: {
    sortedJobs () {
      return this.jobs.slice().sort((a, b) => a.order - b.order)
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

<style lang="scss" scoped>
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
