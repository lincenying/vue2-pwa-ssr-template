<template>
    <div class="main wrap clearfix">
        <ul>
            <li v-for="(item, index) in topics.data"><router-link :to="`/article/${item.id}`">{{ item.title }}</router-link></li>
        </ul>
        <div class="pages">这里是分页: <a @click="loadMore()" href="javascript:;">下一页</a></div>
    </div>
</template>
<script lang="babel">
import { mapGetters } from 'vuex'
import metaMixin from '~mixins'

export default {
    name: 'frontend-index',
    async asyncData({store, route, cookies}, config = { page: 1, cache: true}) {
        config.cookies = cookies
        await store.dispatch('article/getArticleList', config)
    },
    mixins: [metaMixin],
    components: {
    },
    computed: {
        ...mapGetters({
            topics: 'article/getArticleList',
        })
    },
    methods: {
        loadMore(page = this.topics.page + 1) {
            this.$options.asyncData({store: this.$store, route: this.$route}, { page })
        }
    },
    activated() {
        this.$options.asyncData({store: this.$store, route: this.$route}, {page: 1})
    },
    metaInfo() {
        var title = 'M.M.F 小屋'
        return {
            title,
            meta: [{ vmid: 'description', name: 'description', content: title }]
        }
    }
}
</script>
