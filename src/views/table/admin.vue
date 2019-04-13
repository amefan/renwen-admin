<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="loginname" label="用户名" width="180"></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import adminApi from '@/api/admin'
export default {
    data(){
        return {
            list: []
        }
    },
    created(){
        this.fetchData()
    },
    methods:{
        fetchData(){
            adminApi.getList().then(res=>{
                this.list = res.data
            })
        }
    }

}
</script>


