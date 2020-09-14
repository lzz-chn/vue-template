<template>
    <div class="home">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {};
    },
    mounted(){
        this.$router.push('/elementExample')
    }
};
</script>

<style lang="less" scoped>
.home {
}
</style>
