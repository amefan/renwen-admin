<template>
<div>
  <br>
  <el-form :inline="true">
          <el-form-item label="专栏ID">
<el-input v-model="searchMap.columnid" placeholder="专栏ID"></el-input></el-form-item>
          <el-form-item label="用户ID">
<el-input v-model="searchMap.userid" placeholder="用户ID"></el-input></el-form-item>
          <el-form-item label="标题">
<el-input v-model="searchMap.title" placeholder="标题"></el-input></el-form-item>
          <el-form-item label="文章正文">
<el-input v-model="searchMap.content" placeholder="文章正文"></el-input></el-form-item>
          <el-form-item label="文章封面">
<el-input v-model="searchMap.image" placeholder="文章封面"></el-input></el-form-item>
          <el-form-item label="发表日期">
<el-input v-model="searchMap.createtime" placeholder="发表日期"></el-input></el-form-item>
          <el-form-item label="修改日期">
<el-input v-model="searchMap.updatetime" placeholder="修改日期"></el-input></el-form-item>
          <el-form-item label="是否公开">
<el-input v-model="searchMap.ispublic" placeholder="是否公开"></el-input></el-form-item>
          <el-form-item label="是否置顶">
<el-input v-model="searchMap.istop" placeholder="是否置顶"></el-input></el-form-item>
          <el-form-item label="浏览量">
<el-input v-model="searchMap.visits" placeholder="浏览量"></el-input></el-form-item>
          <el-form-item label="点赞数">
<el-input v-model="searchMap.thumbup" placeholder="点赞数"></el-input></el-form-item>
          <el-form-item label="评论数">
<el-input v-model="searchMap.comment" placeholder="评论数"></el-input></el-form-item>
          <el-form-item label="审核状态">
<el-input v-model="searchMap.state" placeholder="审核状态"></el-input></el-form-item>
          <el-form-item label="所属频道">
<el-input v-model="searchMap.channelid" placeholder="所属频道"></el-input></el-form-item>
          <el-form-item label="URL">
<el-input v-model="searchMap.url" placeholder="URL"></el-input></el-form-item>
          <el-form-item label="类型">
<el-input v-model="searchMap.type" placeholder="类型"></el-input></el-form-item>

    <el-button type="primary" @click="fetchData()">查询</el-button>
    <el-button type="primary" @click="handleEdit('')">新增</el-button>
  </el-form>
  <el-table
    :data="list"
    border
    style="width: 100%">
          <el-table-column prop="id" label="ID" width="80"></el-table-column>
          <el-table-column prop="columnid" label="专栏ID" width="80"></el-table-column>
          <el-table-column prop="userid" label="用户ID" width="80"></el-table-column>
          <el-table-column prop="title" label="标题" width="80"></el-table-column>
          <el-table-column prop="content" label="文章正文" width="80"></el-table-column>
          <el-table-column prop="image" label="文章封面" width="80"></el-table-column>
          <el-table-column prop="createtime" label="发表日期" width="80"></el-table-column>
          <el-table-column prop="updatetime" label="修改日期" width="80"></el-table-column>
          <el-table-column prop="ispublic" label="是否公开" width="80"></el-table-column>
          <el-table-column prop="istop" label="是否置顶" width="80"></el-table-column>
          <el-table-column prop="visits" label="浏览量" width="80"></el-table-column>
          <el-table-column prop="thumbup" label="点赞数" width="80"></el-table-column>
          <el-table-column prop="comment" label="评论数" width="80"></el-table-column>
          <el-table-column prop="state" label="审核状态" width="80"></el-table-column>
          <el-table-column prop="channelid" label="所属频道" width="80"></el-table-column>
          <el-table-column prop="url" label="URL" width="80"></el-table-column>
          <el-table-column prop="type" label="类型" width="80"></el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.row.id)" type="text" size="small">修改</el-button>
        <el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
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
        <el-form-item label="专栏ID"><el-input v-model="pojo.columnid"></el-input></el-form-item>
        <el-form-item label="用户ID"><el-input v-model="pojo.userid"></el-input></el-form-item>
        <el-form-item label="标题"><el-input v-model="pojo.title"></el-input></el-form-item>
        <el-form-item label="文章正文"><el-input v-model="pojo.content"></el-input></el-form-item>
        <el-form-item label="文章封面"><el-input v-model="pojo.image"></el-input></el-form-item>
        <el-form-item label="发表日期"><el-input v-model="pojo.createtime"></el-input></el-form-item>
        <el-form-item label="修改日期"><el-input v-model="pojo.updatetime"></el-input></el-form-item>
        <el-form-item label="是否公开"><el-input v-model="pojo.ispublic"></el-input></el-form-item>
        <el-form-item label="是否置顶"><el-input v-model="pojo.istop"></el-input></el-form-item>
        <el-form-item label="浏览量"><el-input v-model="pojo.visits"></el-input></el-form-item>
        <el-form-item label="点赞数"><el-input v-model="pojo.thumbup"></el-input></el-form-item>
        <el-form-item label="评论数"><el-input v-model="pojo.comment"></el-input></el-form-item>
        <el-form-item label="审核状态"><el-input v-model="pojo.state"></el-input></el-form-item>
        <el-form-item label="所属频道"><el-input v-model="pojo.channelid"></el-input></el-form-item>
        <el-form-item label="URL"><el-input v-model="pojo.url"></el-input></el-form-item>
        <el-form-item label="类型"><el-input v-model="pojo.type"></el-input></el-form-item>

        <el-button type="primary" @click="handleSave()">保存</el-button>
        <el-button @click="dialogFormVisible = false" >关闭</el-button>
    </el-form>
  </el-dialog>
</div>
</template>
<script>
import articleApi from '@/api/article'
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
      articleApi.search(this.currentPage, this.pageSize, this.searchMap).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
      })
    },
    handleSave() {
      articleApi.update(this.id, this.pojo).then(response => {
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
        articleApi.findById(id).then(response => {
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
        articleApi.deleteById(id).then(response => {
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
