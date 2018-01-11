import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
// 上面的代码是做路由懒加载的，效果是 开发环境不会使用，只有生产环境会使用路由懒加载  具体看下面的链接
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   有这个配置项的路由，不会出现在侧边栏
* redirect: noredirect           当设置 noredirect 的时候该路由不会在 面包屑导航 中出现
* name:'router-name'             设定路由的名字，一定要填写不然 使用 <keep-alive> 时会出现各种问题
                                <keep-alive>  用来缓存组件   name一定要和组件的名称一致
* meta : {
    role: ['admin','editor']     设置该路由进入的权限，支持多个权限叠加
    title: 'title'               在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             设置该路由的图标
    noCache: true                如果设置为true ,则不会被 <keep-alive> 缓存(默认 false)
  }
**/
// constantRouterMap  不需要权限就给看的路由
export const constantRouterMap = [
  // 这里都是不显示在侧边栏的组件
  { path: '/login', component: _import('login/index'), hidden: true },
  // 授权重定向
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  // 报错时的页面
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    // echars页面
    path: '',
    component: Layout,
    redirect: 'dashboard',
    hidden:true,
    // 在children中写的路由页面会在app-main中显示
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  },
  {
    // 文档组件
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    hidden:true,

    children: [{
      path: 'index',
      component: _import('documentation/index'),
      name: 'documentation',
      meta: { title: 'documentation', icon: 'documentation', noCache: true }
    }]
  },
  //  自己新增的页面
  {
    // 我的页面1
    path:'/mypage',
    component:Layout,
    redirect:'noredirect',
    meta:{
      title:'mypage',
      icon:'documentation'
    },
    // 如果children的长度>1 才会出现下箭头
    children:[{
      path:'index',
      component:_import('mypage/index'),
      name:'mypage',
      meta:{
        title:'mypage',
        icon:'documentation'
      }
    },{
      path:'demo',
      component:_import('mypage/demo'),
      name:'mydemo',
      meta:{
        title:'mydemo',
        icon:'lock',
      }
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开 去掉路径的#  要后台服务器配置好才能用
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
// asyncRouterMap 需要权限判断进行动态添加的路由
export const asyncRouterMap = [
  {
    // 切换权限
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    meta: { role: ['admin'] },
    hidden:true,
    children: [{
      path: 'index',
      component: _import('permission/index'),
      name: 'permission',
      meta: {
        title: 'permission',
        icon: 'lock',
        role: ['admin']
      }
    }]
  },
  // 在 Sidebar 中已经做了判断，当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式。
  {
    // 图标
    path: '/icon',
    component: Layout,
    hidden:true,
    children: [{
      path: 'index',
      component: _import('svg-icons/index'),
      name: 'icons',
      meta: { title: 'icons', icon: 'icon', noCache: true }
    }]
  },

  {
    path: '/components',
    component: Layout,
    redirect: 'noredirect',
    name: 'component-demo',
    hidden:true,
    meta: {
      title: 'components',
      icon: 'component'
    },
    children: [
      // 富文本编辑器
      { path: 'tinymce', component: _import('components-demo/tinymce'), name: 'tinymce-demo', meta: { title: 'tinymce' }},
      // mk 编辑器
      { path: 'markdown', component: _import('components-demo/markdown'), name: 'markdown-demo', meta: { title: 'markdown' }},
      { path: 'json-editor', component: _import('components-demo/jsonEditor'), name: 'jsonEditor-demo', meta: { title: 'jsonEditor' }},
      { path: 'dnd-list', component: _import('components-demo/dndList'), name: 'dndList-demo', meta: { title: 'dndList' }},
      { path: 'splitpane', component: _import('components-demo/splitpane'), name: 'splitpane-demo', meta: { title: 'splitPane' }},
      { path: 'avatar-upload', component: _import('components-demo/avatarUpload'), name: 'avatarUpload-demo', meta: { title: 'avatarUpload' }},
      { path: 'dropzone', component: _import('components-demo/dropzone'), name: 'dropzone-demo', meta: { title: 'dropzone' }},
      { path: 'sticky', component: _import('components-demo/sticky'), name: 'sticky-demo', meta: { title: 'sticky' }},
      { path: 'count-to', component: _import('components-demo/countTo'), name: 'countTo-demo', meta: { title: 'countTo' }},
      { path: 'mixin', component: _import('components-demo/mixin'), name: 'componentMixin-demo', meta: { title: 'componentMixin' }},
      { path: 'back-to-top', component: _import('components-demo/backToTop'), name: 'backToTop-demo', meta: { title: 'backToTop' }}
    ]
  },

  {
    // echars 组件
    path: '/charts',
    component: Layout,
    redirect: 'noredirect',
    name: 'charts',
    hidden:true,
    meta: {
      title: 'charts',
      icon: 'chart'
    },
    children: [
      { path: 'keyboard', component: _import('charts/keyboard'), name: 'keyboardChart', meta: { title: 'keyboardChart', noCache: true }},
      { path: 'line', component: _import('charts/line'), name: 'lineChart', meta: { title: 'lineChart', noCache: true }},
      { path: 'mixchart', component: _import('charts/mixChart'), name: 'mixChart', meta: { title: 'mixChart', noCache: true }}
    ]
  },

  {
    // 各种表格功能都在这里
    path: '/example',
    component: Layout,
    redirect: '/example/table/complex-table',
    name: 'example',
    hidden:true,
    
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: '/example/table',
        component: _import('example/table/index'),
        redirect: '/example/table/complex-table',
        name: 'Table',
        meta: {
          title: 'Table',
          icon: 'table'
        },
        children: [
          { path: 'dynamic-table', component: _import('example/table/dynamicTable/index'), name: 'dynamicTable', meta: { title: 'dynamicTable' }},
          { path: 'drag-table', component: _import('example/table/dragTable'), name: 'dragTable', meta: { title: 'dragTable' }},
          { path: 'inline-edit-table', component: _import('example/table/inlineEditTable'), name: 'inlineEditTable', meta: { title: 'inlineEditTable' }},
          { path: 'complex-table', component: _import('example/table/complexTable'), name: 'complexTable', meta: { title: 'complexTable' }}
        ]
      },
      { path: 'tab/index', icon: 'tab', component: _import('example/tab/index'), name: 'tab', meta: { title: 'tab' }}
    ]
  },

  {
    // 各种表单，包含图片上传和创建表单等功能
    path: '/form',
    component: Layout,
    redirect: 'noredirect',
    name: 'form',
    hidden:true,
    
    meta: {
      title: 'form',
      icon: 'form'
    },
    children: [
      { path: 'create-form', component: _import('form/create'), name: 'createForm', meta: { title: 'createForm', icon: 'table' }},
      { path: 'edit-form', component: _import('form/edit'), name: 'editForm', meta: { title: 'editForm', icon: 'table' }}
    ]
  },

  {
    // 报错的时候显示的页面
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'errorPages',
    hidden:true,
    meta: {
      title: 'errorPages',
      icon: '404',
    },
    children: [
      { path: '401', component: _import('errorPage/401'), name: 'page401', meta: { title: 'page401', noCache: true }},
      { path: '404', component: _import('errorPage/404'), name: 'page404', meta: { title: 'page404', noCache: true }}
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    redirect: 'noredirect',
    hidden:true,
    children: [{ path: 'log', component: _import('errorLog/index'), name: 'errorLog', meta: { title: 'errorLog', icon: 'bug' }}]
  },

  {
    // excel
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'excel',
    hidden:true,
    
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      { path: 'export-excel', component: _import('excel/exportExcel'), name: 'exportExcel', meta: { title: 'exportExcel' }},
      { path: 'export-selected-excel', component: _import('excel/selectExcel'), name: 'selectExcel', meta: { title: 'selectExcel' }},
      { path: 'upload-excel', component: _import('excel/uploadExcel'), name: 'uploadExcel', meta: { title: 'uploadExcel' }}
    ]
  },

  {
    // 压缩文件
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    hidden:true,
    children: [{ path: 'download', component: _import('zip/index'), name: 'exportZip', meta: { title: 'exportZip', icon: 'zip' }}]
  },

  {
    // 换肤
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    hidden:true,
    
    children: [{ path: 'index', component: _import('theme/index'), name: 'theme', meta: { title: 'theme', icon: 'theme' }}]
  },

  {
    // 剪贴板
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    hidden:true,
    
    children: [{ path: 'index', component: _import('clipboard/index'), name: 'clipboardDemo', meta: { title: 'clipboardDemo', icon: 'clipboard' }}]
  },

  {
    // 国际化
    path: '/i18n',
    component: Layout,
    hidden:true,
    
    children: [{ path: 'index', component: _import('i18n-demo/index'), name: 'i18n', meta: { title: 'i18n', icon: 'international' }}]
  },
  // 其他的路由都会调到404去，这个一定要写在最后
  { path: '*', redirect: '/404', hidden: true }
]
