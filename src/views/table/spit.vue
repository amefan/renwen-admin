<template>
<div>
  <br>
  <el-form :inline="true">
         <el-form-item label="发布人Id">
<el-input v-model="searchMap.userid" placeholder="发布人Id"></el-input></el-form-item>
          <el-form-item label="发布人昵称">
<el-input v-model="searchMap.nickname" placeholder="发布人昵称"></el-input></el-form-item>
          
    <el-button type="primary" @click="fetchData()">查询</el-button>
    <el-button type="primary" @click="handleEdit('')">新增</el-button>
  </el-form>
  <el-table
    :data="list"
    border
    style="width: 100%">
          <el-table-column :show-overflow-tooltip="true" prop="id" label="主键" width="120"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="content" label="吐槽内容" width="100"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="publishtime" label="发布时间" width="120"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="userid" label="发布人Id" width="120"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="nickname" label="昵称" width="80"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="visits" label="浏览数" width="80"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="thumbup" label="点赞数" width="80"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="comment" label="评论数" width="80"></el-table-column>
          
    <el-table-column
      fixed="right"
      label="操作"
      width="160">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.row.id)"  size="mini">修改</el-button>
        <el-button @click="handleDelete(scope.row.id)" type="danger" size="mini">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
      <el-pagination
      @size-change="fetchData"
      @current-change="fetchData"
      :current-page="currentPage"
      :page-sizes="[5,10,20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>  
  <el-dialog title="编辑" :visible.sync="dialogFormVisible">
    <el-form label-width="80px">
        <el-form-item label="吐槽内容"><el-input v-model="pojo.content"></el-input></el-form-item>
        <el-form-item label="发布时间"><el-input v-model="pojo.publishtime"></el-input></el-form-item>
        <el-form-item label="发布人Id"><el-input v-model="pojo.userid"></el-input></el-form-item>
        <el-form-item label="发布人昵称"><el-input v-model="pojo.nickname"></el-input></el-form-item>
        <el-form-item label="浏览数"><el-input v-model="pojo.visits"></el-input></el-form-item>
        <el-form-item label="点赞数"><el-input v-model="pojo.thumbup"></el-input></el-form-item>
        <el-form-item label="评论数"><el-input v-model="pojo.comment"></el-input></el-form-item>
        <el-form-item label="'1'可见，'0'不可见"><el-input v-model="pojo.state"></el-input></el-form-item>
        <el-form-item label="上级Id"><el-input v-model="pojo.parentid"></el-input></el-form-item>

        <el-button type="primary" @click="handleSave()">保存</el-button>
        <el-button @click="dialogFormVisible = false" >关闭</el-button>
    </el-form>
  </el-dialog>
</div>
</template>
<script>
import spitApi from '@/api/spit'
export default {
  data() {
    return {
      list: [],
      total: 0, // 总记录数
      currentPage: 1, // 当前页
      pageSize: 10, // 每页大小
      searchMap: {}, // 查询条件
      dialogFormVisible: false, // 编辑窗口是否可见
      pojo: {}, // 编辑表单绑定的实体对象
      cityList: [], // 城市列表
      id: '' // 当前用户修改的ID
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      spitApi.search(this.currentPage, this.pageSize, this.searchMap).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
      })
    },
    handleSave() {
      spitApi.update(this.id, this.pojo).then(response => {
        this.$message({
          message: response.message,
          type: (response.flag ? 'success' : 'error')
        })
        if (response.flag) { // 如果成功
          this.fetchData() // 刷新列表
        }
      })
      this.dialogFormVisible = false // 关闭窗口
    },
    handleEdit(id) {
      this.id = id
      this.dialogFormVisible = true // 打开窗口
      if (id !== '') { // 修改
        spitApi.findById(id).then(response => {
          if (response.flag) {
            this.pojo = response.data
          }
        })
      } else {
        this.pojo = {} // 清空数据
      }
    },
    handleDelete(id) {
      this.$confirm('确定要删除此纪录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        spitApi.deleteById(id).then(response => {
          this.$message({ message: response.message, type: (response.flag ? 'success' : 'error') })
          if (response.flag) {
            this.fetchData() // 刷新数据
          }
        })
      })
    }
  }
}
</script>
