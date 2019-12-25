<template>
    <div class="home">
        <h3>Home</h3>
        <router-link to="/header">header</router-link>
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {};
    }
};
</script>

<style lang="less" scoped>
.home {
}
</style>
