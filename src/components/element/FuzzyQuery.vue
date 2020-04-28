<template>
    <div class="fuzzy-query">
        <el-input size="small" v-model="search" :placeholder="placeholder" @keyup.enter.native="handleQuery"></el-input>
    </div>
</template>

<script>
export default {
    name: 'fuzzyQuery',
    data() {
        return { search: '' }
    },
    props: { placeholder: { type: String }, pageSize: { type: Number }, params: { type: String } },
    watch: {
        search(val) {
            if (val == '') {
                this.search = val
                this.$emit('fuzzyQuery', 1, this.pageSize, { params: this.search })
            }
        }
    },
    methods: {
        handleQuery() {
            this.$emit('fuzzyQuery', 1, this.pageSize, { [this.params]: this.search })
        }
    }
}
</script>

<style lang="less" scoped>
.fuzzy-query {
    .el-input {
        width: 300px;
    }
    margin-bottom: 10px;
}
</style>
