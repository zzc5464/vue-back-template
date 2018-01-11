// 切换语言的主要文件，导入了另外两个语言包
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}
// 通过cookie来获取当前用户使用的语言是什么
const i18n = new VueI18n({
  locale: Cookies.get('language') || 'zh', // 获取当前语言设置，默认是中文
  messages // set locale messages
})

export default i18n
