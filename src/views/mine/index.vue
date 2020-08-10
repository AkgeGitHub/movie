<template>
  <div id="main">
      <Header title="我的"></Header>
      <div id="content">
        <login></login>
      </div>
      <Tabbar></Tabbar>
  </div>
</template>

<script>
import Header from '@/components/header'
import Tabbar from '@/components/tabbar'
import login from '@/components/login'

export default {
  name:'mine',

  components:{
    Header,
    Tabbar,
    login
  }

}
</script>

<style>

</style>