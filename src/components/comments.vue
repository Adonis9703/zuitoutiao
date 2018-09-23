<template>
  <div>
    <div>{{comment.userName}}</div>
    <div>{{comment.content}}</div>
  </div>
</template>

<script>
  export default {
    name: 'comments',
    props: ['comment']
  }
</script>

<style scoped>

</style>
