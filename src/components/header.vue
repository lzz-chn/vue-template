<template>
    <div class="header">
        <h3>header</h3>
        name:{{ $store.state.header.name }} <br />
        <button @click="commitName">commitName</button>
        <button @click="dispatchName">dispatchName</button>
    </div>
</template>

<script>
export default {
    name: 'header',
    data() {
        return {};
    },
    methods: {
        commitName() {
            this.$store.commit('header/name', 'jojo');
        },
        dispatchName() {
            this.$store.dispatch('header/name', 'dio');
        }
    }
};
</script>

<style lang="less" scoped>
.header {
}
</style>
