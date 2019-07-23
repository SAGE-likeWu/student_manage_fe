<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>

<!--    <router-view/>-->

    <!--    引用组件-->

  </div>
</template>

<script>
  import UpdateInformation from '@/components/information/UpdateInformation'
  import SelectInformation from '@/components/information/SelectInformation'
export default {
    components:{
      "updatestu":UpdateInformation,
      "selectstu":SelectInformation
    },
  name: 'App',

  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;
      this.$nextTick(function(){
        this.isRouterAlive = true;
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #50153a;

}
</style>
