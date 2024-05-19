import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/common/HomeView.vue'
import Test from "@/views/common/Test.vue";
import AllProductLisItem from "@/components/AllProductLisItem.vue";
import Delete from "@/components/AllProductListItemTable/insert.vue";
import AllTypeListItem from "@/components/AllTypeListItem.vue";
import Detail from "@/components/ProductTypeListItemTable/Detail.vue";
import ProductDtoListItem from "@/components/ProductDtoListItem.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/allproductlistem',
      name: 'allproductlistem',
      component:AllProductLisItem
    },
    {
      path: '/alltypelistem',
      name: 'alltypelistem',
      component:AllTypeListItem
    },
    {
      path: '/Detail',
      name: 'Detail',
      component:Detail
    },
    {
      path: '/ProductDtoListItem',
      name: 'ProductDtoListItem',
      component:ProductDtoListItem
    },
  ]
})

export default router
router.afterEach(to => {
  document.title=to.meta.title
})