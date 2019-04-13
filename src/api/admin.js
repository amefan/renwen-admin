import request from '@/utils/request'
const host = 'http://localhost:9001'
const api_name = 'admin'

export default {
    getList(){
        return request({
            url : `${host}/${api_name}`,
            method : 'get'
        })
    }
}