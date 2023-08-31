import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// 签到领取余额
import CheckBalance from '../views/checkBalance/index.vue'
// 首页信息
import Introduce from '../views/introduce/index.vue'
// 开题报告生成
import OpeningReport from '../views/openingReport/index.vue'
// 论文参考生成
import PaperTitle from '../views/paperTitle/index.vue'
// 查询结果
import QueryResults from '../views/queryResults/index.vue'
// 系统管理
import SystemManagement from '../views/systemManagement/index.vue'
// 论文降重
import PaperReduction from '../views/paperReduction/index.vue'
import Login from '../views/Login/index.vue'
import Pdf2word from '../views/Pdf2word/index.vue'
// 订单管理
import OrderSearch from '../views/OrderSearch/index.vue'
import SubmitOrder from '../views/SubmitOrder/index.vue'
import DropWeight from '../views/DropWeight/index.vue'
import NormalCreate from '../views/ThesisCreate/NormalCreate/index.vue'

// 增加公告管理
// noticeConfig
import NoticeConfig from '../views/noticeConfig/index.vue'

import { reqLogin, reqUserInfo } from "@/api/login"
import { useUserStore } from '@/store/user.js'


// 模版管理
// templateManagement
import TemplateManagement from '../views/templateManagement/index.vue'

import KeyManagement from '../views/keyManagement/index.vue'

// customCatalog
import CustomCatalog from '../views/customCatalog/index.vue'

// 首页
import IndexVue from '../views/index/index.vue'


export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'IndexVue',
      component: IndexVue
    },
    {
      path: '/ThesisCreate',
      name: 'ThesisCreate',
      // component: CheckBalance,
      children: [
        {
          path: 'NormalCreate',
          name: 'NormalCreate',
          component: NormalCreate
        }

      ]
    },


    {
      path: '/keyManagement',
      name: 'KeyManagement',
      component: KeyManagement
    },

    {
      path: '/customCatalog',
      name: 'CustomCatalog',
      component: CustomCatalog
    },

    // KeyManagement
    {
      path: '/templateManagement',
      name: 'TemplateManagement',
      component: TemplateManagement
    },

    {
      path: '/dropWeight',
      name: 'DropWeight',
      component: DropWeight
    },
    {
      path: '/CheckBalance',
      name: 'CheckBalance',
      component: CheckBalance
    },

    {
      path: '/submitorder',
      name: 'SubmitOrder',
      component: SubmitOrder
    },
    {
      path: '/ordersearch',
      name: 'OrderSearch',
      component: OrderSearch
    },
    {
      path: '/NoticeConfig',
      name: 'NoticeConfig',
      component: NoticeConfig
    },

    // NoticeConfig

    {
      path: '/pdf2word',
      name: 'pdf2word',
      component: Pdf2word
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/Introduce',
      name: 'Introduce',
      component: Introduce
    },
    {
      path: '/OpeningReport',
      name: 'OpeningReport',
      component: OpeningReport
    },
    {
      path: '/paperTitle',
      name: 'paperTitle',
      component: PaperTitle
    },
    {
      path: '/QueryResults',
      name: 'QueryResults',
      component: QueryResults
    },
    {
      path: '/SystemManagement',
      name: 'SystemManagement',
      component: SystemManagement
    },
    {
      path: '/PaperReduction',
      name: 'PaperReduction',
      component: PaperReduction
    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  // ...
  // 返回 false 以取消导航
  const access_token = localStorage.getItem('access_token');
  if (access_token) {


    reqUserInfo().then(resInfo => {

      const userStore = useUserStore()


      console.log(resInfo, 'resInfo');
      userStore.setUserInfo(resInfo)
    })


  }



  next()
})

export default router
