<template>
<div>
  <br>
  <el-form :inline="true">
          <el-form-item label="手机号码">
<el-input v-model="searchMap.mobile" placeholder="手机号码"></el-input></el-form-item>
          <el-form-item label="昵称">
<el-input v-model="searchMap.nickname" placeholder="昵称"></el-input></el-form-item>
               <el-form-item label="专业">
<el-input v-model="searchMap.major" placeholder="专业"></el-input></el-form-item>
          <el-form-item label="社团">
<el-input v-model="searchMap.org" placeholder="社团"></el-input></el-form-item>
          <el-form-item label="家乡">
<el-input v-model="searchMap.city" placeholder="家乡"></el-input></el-form-item>

    <el-button type="primary" @click="fetchData()">查询</el-button>
    <!-- <el-button type="primary" @click="handleEdit('')">新增</el-button> -->
  </el-form>
  <el-table
    :data="list"
    border
    style="width: 100%">
          <el-table-column :show-overflow-tooltip="true" prop="id" label="ID" width="80"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="mobile" label="手机号码" width="80"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="nickname" label="昵称" width="80"></el-table-column>
          <el-table-column  label="性别" width="80">
            <template slot-scope="scope">
            <p v-if="scope.row.sex=='1'">男</p>
            <p v-if="scope.row.sex=='0'">女</p>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="birthday" label="生日日期" width="80"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="avatar" label="头像" width="80"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="email" label="E-Mail" width="80"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="regdate" label="注册日期" width="80"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="interest" label="兴趣" width="80"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="personality" label="个性" width="80"></el-table-column>
          <!-- <el-table-column :show-overflow-tooltip="true" prop="fanscount" label="粉丝数" width="80"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="followcount" label="关注数" width="80"></el-table-column> -->
          <el-table-column :show-overflow-tooltip="true" prop="major" label="专业" width="80"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="qq" label="QQ" width="80"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="org" label="社团" width="80"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="city" label="家乡" width="80"></el-table-column>

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
        <el-form-item label="手机号码"><el-input v-model="pojo.mobile"></el-input></el-form-item>
        <el-form-item label="昵称"><el-input v-model="pojo.nickname"></el-input></el-form-item>
        <el-form-item label="性别"><el-select v-model="pojo.sex" placeholder="请选择性别">
      <el-option label="男" value="1"></el-option>
      <el-option label="女" value="0"></el-option>
    </el-select></el-form-item>
        <el-form-item label="生日日期">           
          <el-date-picker  type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="pojo.birthday" ></el-date-picker>
       </el-form-item>
        <el-form-item label="头像">
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
        <el-form-item label="E-Mail"><el-input v-model="pojo.email"></el-input></el-form-item>
        <el-form-item label="注册日期"><el-input v-model="pojo.regdate"></el-input></el-form-item>
        <el-form-item label="兴趣"><el-input v-model="pojo.interest"></el-input></el-form-item>
        <el-form-item label="个性"><el-input v-model="pojo.personality"></el-input></el-form-item>
        <!-- <el-form-item label="粉丝数"><el-input v-model="pojo.fanscount"></el-input></el-form-item>
        <el-form-item label="关注数"><el-input v-model="pojo.followcount"></el-input></el-form-item> -->
        <el-form-item label="专业"><el-input v-model="pojo.major"></el-input></el-form-item>
        <el-form-item label="QQ"><el-input v-model="pojo.qq"></el-input></el-form-item>
        <el-form-item label="社团"><el-input v-model="pojo.org"></el-input></el-form-item>
        <el-form-item label="家乡"><el-input v-model="pojo.city"></el-input></el-form-item>

        <el-button type="primary" @click="handleSave()">保存</el-button>
        <el-button @click="dialogFormVisible = false" >关闭</el-button>
    </el-form>
  </el-dialog>
</div>
</template>
<script>
import userApi from '@/api/user'
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
      userApi.search(this.currentPage, this.pageSize, this.searchMap).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
      })
    },
    handleSave() {
      userApi.update(this.id, this.pojo).then(response => {
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
        userApi.findById(id).then(response => {
          if (response.flag) {
            this.pojo = response.data
            this.imageUrl = this.pojo.avatar
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
        userApi.deleteById(id).then(response => {
          this.$message({ message: response.message, type: (response.flag ? 'success' : 'error') })
          if (response.flag) {
            this.fetchData() // 刷新数据
          }
        })
      })
    },
     handleAvatarSuccess(res, file) {
        //this.imageUrl = URL.createObjectURL(file.raw);
        this.imageUrl = res.data
      console.log(this.imageUrl)
      this.pojo.avatar= this.imageUrl 
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
