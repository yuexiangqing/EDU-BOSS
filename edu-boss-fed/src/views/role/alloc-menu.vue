<template>
  <div class="alloc-menu">
    <!-- 这是角色ID 为: {{$route.params.roleId}} 这是以前传参的方式，也可以在路由设置的时候，通过props的方式来传递参数，使用的时候，通过props来使用 -->
    这是角色ID 为: {{ roleId }}
  </div>
</template>

<script>
export default {
  name: 'AllocMenu',
  props: {
    roleId: {
      type: [Number, String],
      require: true
    }
  }
}
</script>

<style>

</style>
