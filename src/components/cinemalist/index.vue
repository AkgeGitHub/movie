<template>
  <div class="cinema_body">
          <loading v-if="isLoading"></loading>
				<ul>
					<li v-for="cinema in cinemalist" :key="cinema.cinemaId">
						<div>
							<span>{{cinema.name}}</span>
							<span class="q"><span class="price">{{cinema.lowPrice/100}}</span> 元起</span>
						</div>
						<div class="address">
							<span>{{cinema.address}}</span>
							<span>{{cinema.businessTime}}</span>
						</div>
						<div class="card">
                			<div>{{cinema.districtName}}</div>
                			<div>{{cinema.phone}}</div>
       					</div>
				</li>
				
			</ul>
		</div>
</template>

<script>
export default {
    name:"cinemalist",
    data(){
        return{
            cinemalist:[],
            isLoading:true,
            prevCityid:-1
        }
    },
    activated(){
		var cityId=this.$store.state.city.id;
        if(this.prevCityid===cityId){return;}
        this.axios({
            url:"https://m.maizuo.com/gateway?cityId="+cityId+"&ticketFlag=1&k=7911014",
            headers:{
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1597114756230519484710913","bc":"110100"}',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then(res=>{
            this.cinemalist=res.data.data.cinemas;
            this.isLoading=false
        })
        
    },
    mounted(){
        this.axios({
            url:"https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=7911014",
            headers:{
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1597114756230519484710913","bc":"110100"}',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then(res=>{
            this.cinemalist=res.data.data.cinemas;
            this.isLoading=false
        })
    }

}
</script>

<style>
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}

</style>