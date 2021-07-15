import request from '../utils/request'


// 查询学校列表
export function schoolList( query ){
    return request({
        url: '/test/getlist',
        method: 'get',
        params: query
    })
}