<template>
  <div class="resume">
    <ul class="jobs">
      <li v-for="job in jobs">
        <div class="title">{{ job.title }}</div>
        <div class="company">{{ job.company }}</div>
        <div class="timePeriod">{{ job.timePeriod.from }} – {{ job.timePeriod.to }}</div>
        <div class="location">{{ job.location }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    jobs () {
      return this.$store.state.jobs
    }
  },
  head () {
    return {
      titleTemplate: `Experience | %s`
    }
  }
}
</script>

<style scoped lang="scss">
.jobs {
  list-style: none;
  padding: 0;
  text-align: center;
  
  li {
    margin-top: 30px;
  }

  .title {
    font-weight: 400;
  }

  .timePeriod,
  .location {
    font-size: 15px;
  }

  .location {
    color: #aaa;
  }
}
</style>
