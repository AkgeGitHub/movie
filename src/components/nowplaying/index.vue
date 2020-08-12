<template>
    <div class="movie_body">
				<ul>
					<li v-for="film in filmslist" :key="film.filmId">
						<div class="pic_show"><img :src="film.poster"></div>
						<div class="info_list">
							<h2>{{film.name}}</h2>
							<p>观众评 <span class="grade">{{film.grade}}</span></p>
							<p>主演: {{film.actors|actorfilter}}</p>
							<p>{{film.synopsis}}</p>
						</div>
						<div class="btn_mall">
							购票
						</div>
					</li>
					
				</ul>
			</div>
</template>

<script>
import Vue from 'vue'
Vue.filter("actorfilter",function(data){
	//这里的data就是传过来的film.actors
	var actorslist=data.map(item=>item.name)
	//遍历film.actors   取到name把每一个film.actors整体映射成下面这样
	//["萨姆·门德斯", "乔治·麦凯", "迪恩·查尔斯·查普曼", "科林·费斯", "本尼迪克特·蒂莫西·卡尔顿·康伯巴奇"]
	
	var allactors=actorslist.join(" ")
	//拼接数组成一个字符串,中间用空格分开
	return allactors;
})
export default {
	name:'nowplaying',
	data(){
		return{
			filmslist:[]

		}
	},
	mounted(){
		this.axios({
			url:"https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=5140042",
			headers:{
				'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1597114756230519484710913"}',
				'X-Host': 'mall.film-ticket.film.list'
			}
		}).then(res=>{
			this.filmslist=res.data.data.films;

		})
	}
}
</script>

<style  scoped>
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
</style>>
