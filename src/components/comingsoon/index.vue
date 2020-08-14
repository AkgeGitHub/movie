<template>
  <div class="movie_body">
    <el-alert
        title="🔺警告：切换城市数据没更新的原因！"
        type="error"
        description="因为本项目只是用来练手测试，为了运用CORS和反向代理，正在热映,城市和影院的数据和即将上映的数据来源不同，对应的id也不同，所以即将上映这部分就不做根据不同城市请求不同的数据了，抱歉！"
        show-icon>
    </el-alert>
    <loading v-if="isLoading"></loading>
    <scroller>
    <ul>
      <li v-for="comingfilm in cominglist" :key="comingfilm.id">
        <div class="pic_show"><img :src="comingfilm.img|image('128.180')"></div>
        <div class="info_list">
          <h2>{{comingfilm.nm}}</h2>
          <p><span class="person">{{comingfilm.wish}}</span> 人想看</p>
          <p>主演: {{comingfilm.star}}</p>
          <p>{{comingfilm.showInfo}}</p>
        </div>
        <div class="btn_pre">
          预售
        </div>
      </li>
     
    </ul>
      </scroller>
  </div>
</template>

<script>

export default {
    name:"comingsoon",
    data(){
        return{
            cominglist:[],
            isLoading:true,
            prevCityid:-1
        }
    },
    methods:{
        open() {
            this.$alert('这是一段内容', '标题名称', {
              confirmButtonText: '确定',
             callback: action => {
               this.$message({
                 type: 'info',
                 message: `action: ${ action }`
               });
              }
         });
      }
    },
    mounted(){
        this.axios.get("/ajax/movieOnInfoList?token=&optimus_uuid=261A58F0DB7C11EAAFBA81BF55429A577ABD2CBACFA14908BB9F5255FDB1990B&optimus_risk_level=71&optimus_code=10").then(res=>{
            this.cominglist=res.data.movieList;
            this.isLoading=false;
        })
    }
};
</script>

<style>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
</style>