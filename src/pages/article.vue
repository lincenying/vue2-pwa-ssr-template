<template>
    <div class="main wrap clearfix">
        <h3>{{ article.data.title }}</h3>
        <div class="article-content" v-html="article.data.content"></div>
        <hr>
        <div class="comment">
            <template v-for="item in article.data.replies">
                <h5>{{ item.author.loginname }}: </h5>
                <div v-html="item.content"></div>
            </template>
        </div>
    </div>
</template>

<script lang="babel">
import { mapGetters } from 'vuex'
import metaMixin from '~mixins'

export default {
    name: 'frontend-article',
    async asyncData({store, route, cookies}) {
        const { path, params: { id }} = route
        await store.dispatch(`article/getArticleItem`, { id, path, cookies, cache: true})
    },
    mixins: [metaMixin],
    beforeRouteUpdate(to, from, next) {
        if (to.path !== from.path) this.$options.asyncData({store: this.$store, route: to})
        next()
    },
    computed: {
        ...mapGetters({
            article: 'article/getArticleItem',
        })
    },
    components: {
    },
    methods: {
    },
    mounted() {
    },
    metaInfo () {
        const title = this.article.data.title ? this.article.data.title + ' - M.M.F 小屋' : 'M.M.F 小屋'
        return {
            title,
            meta: [{ vmid: 'description', name: 'description', content: title }]
        }
    }
}
</script>
<style lang="less">
.article-content, .comment {
    width: 1000px;
    img {
        max-width: 100%;
    }
}
</style>
