<template>
  <div class="alloc-menu">
    <!-- 这是角色ID 为: {{$route.params.roleId}} 这是以前传参的方式，也可以在路由设置的时候，通过props的方式来传递参数，使用的时候，通过props来使用 -->
    <!-- 这是角色ID 为: {{ roleId }} -->
    <el-card>
        <el-tree
        :data="menus"
        :props="defaultProps"
        show-checkbox
        default-expand-all
        ></el-tree>
    </el-card>
  </div>
</template>

<script>
import { getMenuNodeList } from '@/services/menu'
export default {
  name: 'AllocMenu',
  props: {
    roleId: {
      type: [Number, String],
      require: true
    }
  },
  created () {
    this.loadMenus()
  },
  data () {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      }
    }
  },
  methods: {
    async loadMenus () {
      const { data } = await getMenuNodeList()
      if (data.code === '000000') {
        this.menus = data.data
      }
    }
  }
}
</script>

<style>

</style>
