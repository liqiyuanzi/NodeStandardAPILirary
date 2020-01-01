import axios from 'axios'
import router from '@/router/index'
let App = {
    /*
        param:{
            type:'get',
            api:/api/getInfo
        },
            type：请求方式get或post
            api：请求地址接口
        data：请求数据内容，
            例如{
                    id:1,
                    age:2
                }
        caallback：请求结果回调函数        
    */
    getData(param, data, callback, responseType = 'json') {
        axios[param.type](param.api, param.type == "post" ? data : { params: data }, { responseType: responseType }).then(response => {
                callback && callback(response);
            })
            .catch(res => {
                if(res.response.status == 401){
                    window.location.href = res.response.data.redirect
                }
            })
    }
}
export default App