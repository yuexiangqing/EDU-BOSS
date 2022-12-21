<template>
    <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 使用 Form 组件：行内表单 -->
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="审批人">
            <el-input v-model="form.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="form.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
        <!-- 使用 Table 组件 -->
        <el-table
          :data="resources"
          style="width: 100%">
          <el-table-column
            type="index"
            label="编号"
            width="100"
            ></el-table-column>
          <el-table-column
            prop="name"
            label="资源名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="url"
            label="资源路径">
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述">
          </el-table-column>
          <!-- 设置过滤器需要使用作用域插槽，获取数据 -->
          <el-table-column
            label="添加时间">
            <template slot-scope="scope">
                <span>{{scope.row.createdTime | dateFormat}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)" style="warning">编辑</el-button>
                <el-button size="mini" @click="handleDelete(scope.row)" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件结构 -->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getResourcePages } from '@/services/resource'
export default {
  name: 'ResourceList',
  data () {
    return {
      // 用于存储资源列表数据
      resources: [],
      form: {
        // 当前显示的页号
        current: 1
      }
    }
  },
  created () {
    this.loadResources()
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    async loadResources () {
      const { data } = await getResourcePages({})
      if (data.code === '000000') {
        this.resources = data.data.records
      }
    },
    handleEdit () {

    },
    handleDelete () {

    }
  },
  filters: {
    // 日期过滤器
    dateFormat (date) {
      date = new Date(date)
      return `
      ${date.getFullYear()}-${date.getMonth() + 1}- ${date.getDate()}
      ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
      `
    }
  }
}
</script>

<style>

</style>
