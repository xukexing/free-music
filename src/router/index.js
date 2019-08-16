import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home/Home.vue'
import Rank from '../components/Rank/Rank.vue'
import Singer from '../components/Singer/Singer.vue'
import Search from '../components/Search/Search.vue'
import Singer_detail from '../components/Singer_detail/Singer_detail'
import Rank_detail from '../components/Rank_detail/Rank_detail'
import HotSongList from '../components/HotSongList/HotSongList'
import HotMV from '../components/HotMV/HotMV'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children:[
        {
          path: 'hotsong',
          name: 'HotSongList',
          component: HotSongList
        },
        {
          path: 'hotmv',
          name: 'HotMV',
          component: HotMV
        }

      ]
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer,
      children:[
        {
          path: 'detail',
          name: 'Singer_detail',
          component: Singer_detail
        }
      ]
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank,
      children:[
        {
          path: 'top',
          name: 'Rank_detail',
          component: Rank_detail
        }
      ]
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    
  ]
})
