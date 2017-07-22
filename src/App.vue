<template>
<div id="app">
    <navigation/>
    <transition :name="pageTransitionName" @before-enter="handleBeforeEnter" @after-enter="handleAfterEnter">
        <keep-alive>
            <router-view :key="$route.fullPath" v-if="!$route.meta.notKeepAlive" class="app-view"></router-view>
        </keep-alive>
    </transition>
    <transition :name="pageTransitionName" @before-enter="handleBeforeEnter" @after-enter="handleAfterEnter">
        <router-view :key="$route.fullPath" v-if="$route.meta.notKeepAlive" class="app-view"></router-view>
    </transition>
    <back-top></back-top>
</div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import backTop from './components/backtop.vue'
import navigation from './components/navigation.vue'

export default {
    name: 'app',
    components: {
        backTop,
    },
    data() {
        return {}
    },
    computed: {
        ...mapGetters({
            global: 'getGlobal'
        }),
        ...mapState('appShell', [
            'pageTransitionName'
        ]),
    },
    components: {
        navigation,
        backTop
    },
    methods: {
        handleBeforeEnter() {
            this.$store.dispatch('appShell/setPageSwitching', true)
        },
        handleAfterEnter() {
            this.$store.dispatch('appShell/setPageSwitching', false)
        },
        handleClickHeaderBack() {
            this.$router.go(-1)
        },
    }
}
</script>
