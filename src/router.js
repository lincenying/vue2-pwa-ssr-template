/**
 * @file router
 * @author lincenying(lincenying@qq.com)
 */

import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import * as types from './store/mutation-types'

// 定义切割点，异步加载路由组件
const index = () => import('./pages/index.vue')
const article = () => import('./pages/article.vue')

Vue.use(Router)
Vue.use(Meta)

/**
 * to 如果在这个列表中，始终采用从左到右的滑动效果，首页比较适合用这种方式
 *
 * @type {Array.<string>}
 * @const
 */
const ALWAYS_BACK_PAGE = ['index']

/**
 * to 如果在这个列表中，始终采用从右到左的滑动效果
 *
 * @type {Array.<string>}
 * @const
 */
const ALWAYS_FORWARD_PAGE = ['article']

/**
 * 历史记录，记录访问过的页面的 fullPath
 *
 * @type {Array.<string>}
 * @const
 */
const HISTORY_STACK = []

/**
 * 判断当前是否是前进，true 表示是前进，否则是回退
 *
 * @param {Object} to 目标 route
 * @param {Object} from 源 route
 * @return {boolean} 是否表示返回
 */
function isForward(to, from) {

    // to 如果在这个列表中，始终认为是后退
    if (to.name && ALWAYS_BACK_PAGE.indexOf(to.name) !== -1) {

        // 清空历史
        HISTORY_STACK.length = 0
        return false
    }

    if (from.name && ALWAYS_BACK_PAGE.indexOf(from.name) !== -1) {

        // 如果是从 ALWAYS_BACK_PAGE 过来的，那么永远都是前进
        HISTORY_STACK.push(to.fullPath)
        return true
    }

    if (to.name && ALWAYS_FORWARD_PAGE.indexOf(to.name) !== -1) {

        // to 如果在这个列表中，始终认为是前进
        HISTORY_STACK.push(to.fullPath)
        return true
    }

    // 根据 fullPath 判断当前页面是否访问过，如果访问过，则属于返回
    const index = HISTORY_STACK.indexOf(to.fullPath)
    if (index !== -1) {
        HISTORY_STACK.length = index + 1
        return false
    }

    // 将 to.fullPath 加到栈顶
    HISTORY_STACK.push(to.fullPath)
    return true
}

const scrollBehavior = to => {
    const position = {}
    if (to.hash) {
        position.selector = to.hash
    }
    // if (to.matched.some(mm => mm.meta.scrollToTop)) {
    //     position.x = 0
    //     position.y = 0
    // }
    position.x = 0
    position.y = 0
    return position
}

export function createRouter() {
    const router = new Router({

        // history 模式，需要服务器后端配合做路由代理，将所有的前端路由同步代理到 /
        mode: 'history',
        scrollBehavior,
        routes: [
            { name:'index', path: '/', component: index },
            { name:'article', path: '/article/:id', component: article, meta: { notKeepAlive: true } },
        ]
    })

    /**
     * 切换动画名称
     *
     * @type {string}
     * @const
     */
    const SLIDE_LEFT = 'slide-left'

    /**
     * 切换动画名称
     *
     * @type {string}
     * @const
     */
    const SLIDE_RIGHT = 'slide-right'

    router.beforeEach((to, from, next) => {
        if (router.app.$store) {

            // 如果不需要切换动画，直接返回
            if (router.app.$store.state.appShell.needPageTransition) {

                // 判断当前是前进还是后退，添加不同的动画效果
                const pageTransitionName = isForward(to, from) ? SLIDE_LEFT : SLIDE_RIGHT
                router.app.$store.commit(`appShell/${types.SET_PAGE_TRANSITION_NAME}`, {pageTransitionName})
            }
        }
        next()
    })

    return router
}
