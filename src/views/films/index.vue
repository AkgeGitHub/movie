<template>
<div id="main">
		<Header></Header>
		<div id="content">
			<div class="movie_menu">
				<router-link class="city_name" tag="div" to="/films/city">
					<span>{{$store.state.city.nm}}</span><i class="iconfont icon-lower-triangle"></i>
				</router-link>
				<div class="hot_swtich">
					<router-link class="hot_item" tag='div' to="/films/nowplaying">正在热映</router-link>
					<router-link class="hot_item" tag="div" to="/films/comingsoon">即将上映</router-link>
				</div>
				<router-link class="search_entry" tag="div" to="/films/search">
					<i class="iconfont icon-sousuo"></i>
				</router-link>
			</div>
			<keep-alive>
				<router-view />
			</keep-alive>
		</div>
		<Tabbar></Tabbar>
	</div>
</template>


<script>
import Header from "@/components/header";
import Tabbar from "@/components/tabbar";


export default {
	name: "films",
	components: {
		Header,
		Tabbar,
	},
	mounted(){
	}
};
</script>

<style scoped>
#content .movie_menu {
	width: 100%;
	height: 45px;
	border-bottom: 1px solid #e6e6e6;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: white;
	z-index: 10;
}
.movie_menu .city_name {
	margin-left: 20px;
	height: 100%;
	line-height: 45px;
}
.movie_menu .city_name.active {
	color: #ef4238;
	border-bottom: 2px #ef4238 solid;
}
.movie_menu .hot_swtich {
	display: flex;
	height: 100%;
	line-height: 45px;
}
.movie_menu .hot_item {
	font-size: 15px;
	color: #666;
	width: 80px;
	text-align: center;
	margin: 0 12px;
	font-weight: 700;
}
.movie_menu .hot_item.active {
	color: #ef4238;
	border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry {
	margin-right: 20px;
	height: 100%;
	line-height: 45px;
}
.movie_menu .search_entry.active {
	color: #ef4238;
	border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry i {
	font-size: 24px;
	color: red;
}
.movie_menu .hot_item.router-link-active{
	color: #ef4238;
	border-bottom: 2px #ef4238 solid;
}
.movie_menu .city_name.router-link-active {
	color: #ef4238;
	border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry.router-link-active {
	color: #ef4238;
	border-bottom: 2px #ef4238 solid;
}
</style>