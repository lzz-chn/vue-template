<template>
    <div class="fuzzy-query">
        <el-input v-model="search" placeholder="输入关键词以查询"></el-input>
    </div>
</template>

<script>
export default {
    name: 'fuzzy-query',
    data() {
        return { search: '' };
    },
    props: ['tableData'],
    watch: {
        search(val, oldVal) {
            let tables = [];
            if (val) {
                tables = this.tableData.filter(dataNews => {
                    return Object.keys(dataNews).some(key => {
                        return (
                            String(dataNews[key])
                                .toLowerCase()
                                .indexOf(val) > -1
                        );
                    });
                });
            } else {
                tables = this.tableData;
            }
            this.$emit('fuzzyQuery', tables);
        },
        // 避免在未触发 search 前数组为空
        tableData(val, oldVal) {
            this.$emit('fuzzyQuery', val);
        }
    }
};
</script>

<style lang="less" scoped>
.fuzzy-query {
    .el-input {
        width: 500px;
        margin: 20px 0;
    }
}
</style>
