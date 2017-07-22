/**
 * @file store index
 * @author lincenying(lincenying@qq.com)
 */

import Vue from 'vue'
import Vuex from 'vuex'
import {createAppShellState} from './modules/app-shell'
import article from './modules/article'
import global from './modules/global'

Vue.use(Vuex)


export function createStore() {
    return new Vuex.Store({
        modules: {
            appShell: createAppShellState(),
            article,
            global
        }
    })
}
