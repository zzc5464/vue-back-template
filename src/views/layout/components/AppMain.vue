<template>
  <section class="app-main" style="min-height: 100%">
    <!-- transition做过渡动画 -->
    <transition name="fade" mode="out-in">
      <!-- keep-alive为了缓存路由 -->
      <!-- :include="cachedViews"  做标签导航的 cachedViews数组中就是所有的tag 
            如果在配置路由表的时候 noCache: true 则不会再标签导航中显示
            https://cn.vuejs.org/v2/api/#keep-alive   include 字符串或正则表达式。只有匹配的组件会被缓存
       -->
      <keep-alive :include="cachedViews">
        <!-- 所有页面的入口 -->
        <router-view></router-view>
        <!-- <router-view :key='key'></router-view> -->
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
    // 在真实的业务场景中会碰到不同的路由调到同一个组件，想想后台管理系统
    // 通过给router-view设置唯一键就能够继续触发 created mounted 钩子函数了
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
    // 不一定要这么写，只要能保证 :key的唯一性就行
  }
}

// 
/**
 * https://panjiachen.github.io/vue-element-admin-site/#/zh-cn/tags-view?id=visitedviews-ampamp-cachedviews
 * 如果没有标签导航的功能了，按照上面说的删掉keep-alive就好了
 * 
 */
</script>
