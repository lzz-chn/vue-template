<template>
    <div class="pagination">
        <el-pagination
            background
            layout="total, prev, pager, next, jumper"
            @current-change="handleCurrentChange"
            :current-page="page.pageNum"
            :page-size="page.pageSize"
            :total="page.total"
        >
        </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    data() {
        return {};
    },
    props: ['page'],
    methods: {
        handleCurrentChange(val) {
            this.$emit('currentChange', val);
        }
    }
};
</script>

<style lang="less" scoped>
.pagination {
    .el-pagination {
        margin-top: 30px;
    }
}
</style>
