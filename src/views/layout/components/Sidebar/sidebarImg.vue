<template>
  <div class="sidebarImg">
      <img :src=imgUrl alt="">
      <p>{{username}}</p>
      <p>{{count}}</p>
  </div>
</template>
<script>
export default {
    name:'sidebarImg',
    data(){
        return {
            imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515762384438&di=934141f2a8945edf976207667efac116&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F45b0d9aa521caa18fa249e322dd820f507d6ebe4.jpg',
            username : '我是名字',
            count : '账号:132132132123'
        }
        
    }
}
</script>
<style scoped>
.sidebarImg {
    width: 100%;
}
.sidebarImg img {
    width: 100%;
    height: 40px;
    display: block;
}
.sidebarImg p {
    width: 100%;
    height: 20px;
    text-align:center;
    color: #fff;
    font-size: 12px;
}
</style>

