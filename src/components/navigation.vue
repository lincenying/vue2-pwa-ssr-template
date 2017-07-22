<template>
    <div>
        <h2>这是神导航: <router-link to="/">列表</router-link></h2>
        <hr>
    </div>
</template>

<script lang="babel">
export default {
    name: 'navigation',
    data() {
        return {
        }
    },
}
</script>
<style lang="less">
h2 {
    color: #222;
    a {
        color: blue;
    }
}
.router-link-exact-active {
    color: red;
}
</style>
