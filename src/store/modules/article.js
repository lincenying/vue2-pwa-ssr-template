import api from '~api'

const state = {
    lists: {
        data: [],
        page: 1,
        path: ''
    },
    item: {
        data: {},
        path: '',
    },
}

const actions = {
    async ['getArticleList']({commit, state}, config) {
        if (state.lists.data.length > 0 && config.path === state.lists.path && config.page === 1) {
            return
        }
        const { data: { data, success} } = await api.get('topics', config)
        if (data && success) {
            commit('receiveArticleList', {
                data,
                ...config,
            })
        }
    },
    async ['getArticleItem']({ commit, state }, config) {
        if (config.path === state.item.path) {
            return
        }
        const { data: { data, success} } = await api.get(`topic/${config.id}`, config)
        if (data && success) {
            commit('receiveArticleItem', {
                data,
                ...config
            })
        }
    },
}

const mutations = {
    ['receiveArticleList'](state, {data, page, path}) {
        if (page === 1) {
            data = [].concat(data)
        } else {
            data = state.lists.data.concat(data)
        }
        state.lists = {
            data, page, path
        }
    },
    ['receiveArticleItem'](state, {data, path}) {
        state.item = {
            data, path, isLoad: true
        }
    },
}

const getters = {
    ['getArticleList'](state) {
        return state.lists
    },
    ['getArticleItem'](state) {
        return state.item
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
