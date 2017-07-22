<template>
    <div v-show="scrollTop > 500" class="back-top">
        <a @click="handleBackTop" href="javascript:;"></a>
    </div>
</template>

<script lang="babel">
export default {
    name: 'back-top',
    data() {
        return {
            scrollTop: 0
        }
    },
    methods: {
        scrolling() {
            if (window.scrollTime) window.clearTimeout(window.scrollTime)
            window.scrollTime = window.setTimeout(() => {
                this.scrollTop = document.body.scrollTop
            }, 100)
        },
        handleBackTop() {
            var top = this.scrollTop
            var timer = setInterval(() => {
                top -= Math.abs(top * 0.1)
                if (top <= 1) {
                    top = 0
                    clearInterval(timer)
                }
                document.body.scrollTop = top
            }, 20)
        }
    },
    mounted() {
        window.addEventListener('scroll', this.scrolling)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.scrolling)
    },
}
</script>
<style lang="less">
.back-top {
    transition: all 0.3s ease;
    position: fixed;
    left: 50%;
    bottom: 10%;
    width: 35px;
    height: 35px;
    margin-left: 520px;
    a {
        display: block;
        width: 100%;
        height: 100%;
        background-image: url(~assets/images/back-top-1.png);
        background-size: cover;
        &:hover {
            background-image: url(~assets/images/back-top-2.png);
        }
    }
}
</style>
