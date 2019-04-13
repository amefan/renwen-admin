<template>
<div>
  <br>
   <el-form :inline="true">
         <el-form-item label="用户ID">
<el-input v-model="searchMap.userid" placeholder="用户ID"></el-input></el-form-item>
          <el-form-item label="标题">
<el-input v-model="searchMap.title" placeholder="标题"></el-input></el-form-item>
            <el-form-item label="发布日期" >
            <el-date-picker  type="date" placeholder="选择开始日期" value-format="yyyy-MM-dd" v-model="searchMap.starttime_1" ></el-date-picker>
            <el-date-picker  type="date" placeholder="选择截止日期" value-format="yyyy-MM-dd" v-model="searchMap.starttime_2" ></el-date-picker>
          </el-form-item>
    <el-button type="primary" @click="fetchData()">查询</el-button>
    
  </el-form>
  <el-table
    :data="list"
    border
    style="width: 100%">
          <el-table-column :show-overflow-tooltip="true" prop="id" label="ID" width="120"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="userid" label="用户ID" width="120"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="title" label="标题" width="120"></el-table-column>
          <el-table-column label="文章详情" width="120">
            <template slot-scope="scope">
             <el-button @click="showDetail(scope.row)" type="info" size="small">查看正文</el-button>
           </template>
            </el-table-column> 
          <el-table-column  :show-overflow-tooltip="true" prop="image" label="文章封面" width="120"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="createtime" label="发表日期" width="140"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="updatetime" label="修改日期" width="140"></el-table-column>
          <el-table-column prop="visits" label="浏览量" width="80"></el-table-column>
          <el-table-column prop="thumbup" label="点赞数" width="80"></el-table-column>
          <el-table-column prop="comment" label="评论数" width="80"></el-table-column>
         

    <el-table-column
      
      label="操作"
      width="160">
      <template slot-scope="scope">
        <el-button @click="handleAudit(scope.row.id)"  size="mini" type="warning">审核</el-button>
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
       <el-form-item label="用户ID"><el-input v-model="pojo.userid"></el-input></el-form-item>
        <el-form-item label="标题"><el-input v-model="pojo.title"></el-input></el-form-item>
        <el-form-item label="文章正文"><el-input v-model="pojo.content"></el-input></el-form-item>
        <el-form-item label="文章封面">
          <el-upload
          class="avatar-uploader"
          action="http://localhost:9002/article/uploadlogo"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form-item>
         <el-form-item label="浏览量"><el-input v-model="pojo.visits"></el-input></el-form-item>
        <el-form-item label="点赞数"><el-input v-model="pojo.thumbup"></el-input></el-form-item>
        <el-form-item label="评论数"><el-input v-model="pojo.comment"></el-input></el-form-item>
        <el-form-item label="审核状态"><el-input v-model="pojo.state"></el-input></el-form-item>
         
        <el-button type="primary" @click="handleSave()">保存</el-button>
        <el-button @click="dialogFormVisible = false" >关闭</el-button>
    </el-form>
     </el-dialog>
  <!--编辑窗口-->
        <el-dialog title="详情" :visible.sync="dialogDetailVisible" >
        <h3>{{pojo.title}}</h3>
        <hr>
        <div v-html='pojo.content'></div>       
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
      searchMap: {state:'0'}, // 查询条件
      dialogFormVisible: false, // 编辑窗口是否可见
      dialogDetailVisible: false,
      pojo: {}, // 编辑表单绑定的实体对象
      cityList: [], // 城市列表
      id: '', // 当前用户修改的ID
      imageUrl: ''
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
    handleAudit(id){
      this.$confirm('确定要审核此文章吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        articleApi.examine(id).then(response => {
          this.$message({ message: response.message, type: (response.flag ? 'success' : 'error') })
          if (response.flag) {
            this.fetchData() // 刷新数据
          }
        })
      })
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
    },
    showDetail(index){
      this.pojo = index
      this.dialogDetailVisible = true
    }
    
  }
}
</script>
