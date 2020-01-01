<template>
  <div id="app">
  	<div>
  		<div @click="loadMenu('standardApiApi')">接口配置</div>
  		<div @click="loadMenu('standardApiSystem')">系统管理</div>
  		<div @click="loadMenu('standardApiSystemConfig')">系统配置</div>
  	</div>
    <router-view/>
  </div>
</template>

<script>
import router from "@/router";
export default {
  name: 'App',
  methods:{
  	loadMenu(s){
  		this.$router.push(s)
  	}
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body{
	min-width: 1200px;
}
</style>
