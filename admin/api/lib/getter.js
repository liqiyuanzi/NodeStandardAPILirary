import {get} from './cache'
const lodash  = require('lodash'); 

class Getter {
	constructor(type,keys){
		this.res = [];
		this.type = type
		this.keys = keys
	}
	async select(){
		let _keys = this.keys;
		if(!_keys);
		else if(Object.prototype.toString.call(_keys) != '[object Object]' || !this.keys){
			return
		}
		let data = await get(this.type)
		this.res = _keys ? data.filter((t)=>{
			let f = true;
			for(let i in _keys){
				if(_keys[i] != t[i])
					f = false
			}
			return f
		}) : data
		return this
	}
	all(){
		return this.res.slice(0)
	}
	firstOrDefault(){
		let t = this.res.slice(0) 
		return t.length ? t[0] : ''
	}
	top(i){
		return this.res.slice(0,i)	
	}
}
const _getter =  function(type,keys){
	return  new Getter(type,keys).select()
}
export const getter = lodash.curry(_getter)