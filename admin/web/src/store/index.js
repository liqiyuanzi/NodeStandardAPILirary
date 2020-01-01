import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import App from '@/codes/App'
const states  = {
   permissionList:[],
   menuList:[]
}
Vue.use(Vuex)
export default new Vuex.Store({
    state:states,
    actions: {
    	getPermission(state,args){
    		return new Promise((resolve,reject)=>{
    			 App.getData({
		          type:'post',
		          api:'/api/getMenu'
		        },{},(res)=>{
		        	if(res.data && res.data.code == 200){
	    				let list = []
						for(var i = 0;i < res.data.result.length;i ++){
							if(res.data.result[i].url){
								list.push(
									res.data.result[i].url
								)
							}
						}
						console.log("getPermission",list)
						state.state.menuList= res.data.result
						state.state.permissionList = list
						resolve(list)
	    			}else{
	    				reject('login');
	    			}			
		        })
    		})	
    	}
    }
})
