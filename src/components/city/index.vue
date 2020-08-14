<template>
  <div class="city_body">
    <div class="city_list">
    <loading v-if="isLoading"></loading>
    <scroller ref="city_list">
        <div>
      <div class="city_hot">
        <h2>热门城市</h2>
        <ul class="clearfix">
            <li v-for="hot in hotlist" :key="hot.cityId" @tap="handleToCity(hot.name,hot.cityId)">
                {{hot.name}}
            </li>
        </ul>
      </div>
      <div class="city_sort" ref="city_sort">
        <div v-for="citysort in citylist" :key="citysort.index">
            <h2>{{citysort.index}}</h2>
            <ul>
                <li v-for="cities in citysort.list" :key="cities.cityId" @tap="handleToCity(cities.name,cities.cityId)">
                    {{cities.name}}
                </li>
            </ul>
        </div>
      </div>
      </div>
    </scroller>
    </div>
    <div class="city_index">
      <ul>
        <li v-for="(citysort,index) in citylist" :key="citysort.index" @touchstart="handeleToIndex(index)">
            {{citysort.index}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    name:'city',
    data(){
        return{
            citylist:[],
            hotlist:[],
            isLoading:true
        }
    },
    methods:{
        formatCitylist(cities){
            var hotlist=[];
            var citylist=[];

            for(var i=0;i<cities.length;i++){
                var firstLetter=cities[i].pinyin.substring(0,1).toUpperCase();
                if(cities[i].isHot){
                    hotlist.push({name:cities[i].name,cityId:cities[i].cityId});
                }
                if(toCom(firstLetter)){
                    citylist.push({index:firstLetter,list:[{name:cities[i].name,cityId:cities[i].cityId}]});
                }else{
                    for(var j=0;j<citylist.length;j++){
                        if(citylist[j].index===firstLetter){
                            citylist[j].list.push({name:cities[i].name,cityId:cities[i].cityId});
                        }
                    }
                }
            }

            citylist.sort((n1,n2)=>{
                if(n1.index>n2.index){
                    return 1;
                }else if(n1.index<n2.index){
                    return -1;
                }else{
                    return 0;
                }
            })

            function toCom(firstLetter){
                for(var i=0;i<citylist.length;i++){
                    if(citylist[i].index===firstLetter){
                        return false;
                    }
                }
                return true;

            }

            return{
                hotlist,
                citylist
            }

        },
        handeleToIndex(index){
            var h2=this.$refs.city_sort.getElementsByTagName("h2");
            // this.$refs.city_sort.parentNode.scrollTop=h2[index].offsetTop

            this.$refs.city_list.ToScrollTop(-h2[index].offsetTop);//因为是网上滚动所以是负的
            //因为我们使用了better-scroll，当前节点就被scroll控制，所以我们自己的原生方法是就没用了,只能通过better-scroll的scrollTo方法。
            //因为scroller是我们自己封装的，所以在我们自己封装的scroller中定义方法，通过我们自己的方法来用scrollTo方法
            //所以<scroller></scroller>通过操作scroller的节点直接获取到它的方法来操作
        },
        handleToCity(nm,id){
            this.$store.commit('city/CITY_INFO',{nm,id});
            window.localStorage.setItem("nowName",nm);
            window.localStorage.setItem("nowId",id);
            this.$router.push("/films/nowplaying")
        }
        
    },
    mounted(){

        var citylist=window.localStorage.getItem('citylist');
        var hotlist=window.localStorage.getItem('hotlist');
        if(citylist && hotlist){
            this.isLoading=false;
            this.citylist=JSON.parse(citylist);
            this.hotlist=JSON.parse(hotlist);
        }else{
            this.axios({
            url:"https://m.maizuo.com/gateway?k=7731292",
            headers:{
                "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.0.4","e":"1597114756230519484710913"}',
                "X-Host": "mall.film-ticket.city.list"
                }
            }).then(res=>{
            if(res.data.msg==="ok"){
                var cities=res.data.data.cities;
                var {citylist,hotlist}=this.formatCitylist(cities);
                this.citylist=citylist;
                this.hotlist=hotlist;
                this.isLoading=false;
                window.localStorage.setItem("citylist",JSON.stringify(citylist));
                window.localStorage.setItem("hotlist",JSON.stringify(hotlist));
            }

        })
        }

    }
};
</script>

<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul{}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort{}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>