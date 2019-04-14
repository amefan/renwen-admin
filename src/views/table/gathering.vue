<template>
<div>
  <br>
  <el-form :inline="true">
          <el-form-item label="活动名称">
<el-input v-model="searchMap.name" placeholder="活动名称"></el-input></el-form-item>
           <el-form-item label="主办方">
<el-input v-model="searchMap.sponsor" placeholder="主办方"></el-input></el-form-item>
         <el-form-item label="开始时间">
<el-input v-model="searchMap.starttime" placeholder="开始时间"></el-input></el-form-item>
          <el-form-item label="截止时间">
<el-input v-model="searchMap.endtime" placeholder="截止时间"></el-input></el-form-item>
          <el-form-item label="是否可见">
    <el-select v-model="searchMap.state" placeholder="请选择">
      <el-option label="可见" value="1"></el-option>
      <el-option label="不可见" value="0"></el-option>
    </el-select>
  </el-form-item>
         
    <el-button type="primary" @click="fetchData()">查询</el-button>
    <el-button type="primary" @click="handleEdit('')">新增</el-button>
  </el-form>
  <el-table
    :data="list"
    border
    style="width: 100%">
          <el-table-column :show-overflow-tooltip="true" prop="id" label="编号" width="120"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="name" label="活动名称" width="120"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="detail" label="详细说明" width="120"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="sponsor" label="主办方" width="80"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="image" label="活动图片" width="120"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="starttime" label="开始时间" width="120"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="endtime" label="截止时间" width="120"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="address" label="举办地点" width="120"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="enrolltime" label="报名截止" width="120"></el-table-column>
          <el-table-column  label="是否可见" width="80">
            <template slot-scope="scope">
            <p v-if="scope.row.state=='1'">可见</p>
            <p v-else>不可见</p>
            </template>
          </el-table-column>

    <el-table-column
      
      label="操作"
      width="160">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.row.id)"  size="mini">修改</el-button>
        <el-button @click="handleDelete(scope.row.id)" type="danger" size="mini">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
      <el-pagination
      @size-change="handleChangeSize"
      @current-change="handChangePage"
      :current-page="currentPage"
      :page-sizes="[5,10,20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>  
  <el-dialog title="编辑" :visible.sync="dialogFormVisible">
    <el-form label-width="80px">
        <el-form-item label="活动名称"><el-input v-model="pojo.name"></el-input></el-form-item>
        <el-form-item label="活动形式">
          <el-input type="textarea" :rows="3" v-model="pojo.detail"></el-input>
        </el-form-item>
        <el-form-item label="主办方"><el-input v-model="pojo.sponsor"></el-input></el-form-item>
        <el-form-item label="活动图片">
          <el-upload
          class="avatar-uploader"
          action="http://localhost:9003/gathering/uploadlogo"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form-item>
        <el-form-item label="开始时间"><el-input v-model="pojo.starttime"></el-input></el-form-item>
        <el-form-item label="截止时间"><el-input v-model="pojo.endtime"></el-input></el-form-item>
        <el-form-item label="举办地点"><el-input v-model="pojo.address"></el-input></el-form-item>
        <el-form-item label="报名截止"><el-input v-model="pojo.enrolltime"></el-input></el-form-item>
        <el-form-item label="是否可见">
         <el-switch
          v-model="pojo.state"
          active-text="是"
          inactive-text="否"
          active-value="1"
          inactive-value="0">
         </el-switch>
        </el-form-item>

        <el-button type="primary" @click="handleSave()">保存</el-button>
        <el-button @click="dialogFormVisible = false" >关闭</el-button>
    </el-form>
  </el-dialog>
</div>
</template>
<script>
import gatheringApi from '@/api/gathering'
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
      gatheringApi.search(this.currentPage, this.pageSize, this.searchMap).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
      })
    },
    handleSave() {
      gatheringApi.update(this.id, this.pojo).then(response => {
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
      this.imageUrl =''
      this.id = id
      this.dialogFormVisible = true // 打开窗口
      if (id !== '') { // 修改
        gatheringApi.findById(id).then(response => {
          if (response.flag) {
            this.pojo = response.data
            this.imageUrl = this.pojo.image
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
        gatheringApi.deleteById(id).then(response => {
          this.$message({ message: response.message, type: (response.flag ? 'success' : 'error') })
          if (response.flag) {
            this.fetchData() // 刷新数据
          }
        })
      })
    },
    handChangePage(topage){
      this.currentPage = topage
      this.fetchData()
    },
    handleChangeSize(size){
      this.pageSize = size
      this.fetchData()
    },
    handleAvatarSuccess(res, file) {
        //this.imageUrl = URL.createObjectURL(file.raw);
        this.imageUrl = res.data
      console.log(this.imageUrl)
      this.pojo.image= this.imageUrl 
      },
      beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>