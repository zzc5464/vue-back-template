// 翻译标题的方法
export function generateTitle(title) {
  return this.$t('route.' + title) // $t :是 vue-i18n自带的方法,用来注入这个路径下的 @/lang/index.js  翻译语言
}
