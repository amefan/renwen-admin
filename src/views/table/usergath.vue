<template>
<div>
  <br>
  <el-form :inline="true">
          <el-form-item label="用户ID">
<el-input v-model="searchMap.userid" placeholder="用户ID"></el-input></el-form-item>
           <el-form-item label="活动ID">
<el-input v-model="searchMap.gathid" placeholder="活动ID"></el-input></el-form-item>
         <el-form-item label="用户昵称">
<el-input v-model="searchMap.nickname" placeholder="用户昵称"></el-input></el-form-item>
          
         
    <el-button type="primary" @click="fetchData()">查询</el-button>
    <el-button type="primary" @click="handleEdit('')">新增</el-button>
    <el-button type="primary" @click="importCvs()">导出</el-button>
  </el-form>
  <el-table
    :data="list"
    border
    style="width: 100%" id="out-table">
          <el-table-column :show-overflow-tooltip="true" prop="id" label="编号" width="130"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="gathid" label="活动ID" width="130"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="nickname" label="姓名" width="120"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="qq" label="QQ" width="120"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="phone" label="电话号码" width="120"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="exetime" label="报名时间" width="160"></el-table-column>
          

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
        <el-form-item label="用户ID"><el-input v-model="pojo.userid"></el-input></el-form-item>
        
        <el-form-item label="活动ID"><el-input v-model="pojo.gathid"></el-input></el-form-item>
        
        <el-form-item label="姓名"><el-input v-model="pojo.nickname"></el-input></el-form-item>
        <el-form-item label="QQ"><el-input v-model="pojo.qq"></el-input></el-form-item>
        <el-form-item label="phone"><el-input v-model="pojo.phone"></el-input></el-form-item>
        <el-form-item label="报名时间"><el-input v-model="pojo.exetime"></el-input></el-form-item>
       

        <el-button type="primary" @click="handleSave()">保存</el-button>
        <el-button @click="dialogFormVisible = false" >关闭</el-button>
    </el-form>
  </el-dialog>
</div>
</template>
<script>
import gatheringApi from '@/api/usergath'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
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
        console.log(response.data.rows)
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
    importCvs(){
          /* generate workbook object from table */
         var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
         /* get binary string as output */
         var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
         try {
             FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
         } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
         return wbout

    }
  }
}
</script>
