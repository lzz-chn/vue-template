<template>
    <div class="pagination">
        <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.pageNum"
            :page-size="page.pageSize"
            :page-sizes="[10, 20, 50, 100, 200]"
            :total="page.total"
        >
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'pagination',
    data() {
        return {}
    },
    props: { page: { type: Object }, query: { type: Object } },
    methods: {
        // 改变每页数量
        handleSizeChange(val) {
            this.$emit('currentChange', 1, val, { ...this.query })
        },
        // 改变页数
        handleCurrentChange(val) {
            this.$emit('currentChange', val, this.page.pageSize, { ...this.query })
        }
    }
}
</script>

<style lang="less" scoped>
.pagination {
    .el-pagination {
        margin-top: 30px;
    }
}
</style>
