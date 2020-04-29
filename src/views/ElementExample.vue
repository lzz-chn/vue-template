<template>
    <div class="element-example">
        <h4>FileUpload</h4>
        <FileUpload ref="fileUpload" fileType="ppt" :fileList="fileList" @success="uploadSuccess" />
        <el-divider></el-divider>
        <h4>FuzzyQuery</h4>
        <FuzzyQuery @fuzzyQuery="getList" :pageSize="page.pageSize" params="name" placeholder="输入XX回车以查询" />
        <el-divider></el-divider>
        <h4>Pagination</h4>
        <Pagination @currentChange="getList" :page="page" :query="pagination" />
        <el-divider></el-divider>
    </div>
</template>

<script>
import FileUpload from '@/components/element/fileUpload'
import FuzzyQuery from '@/components/element/fuzzyQuery'
import Pagination from '@/components/element/pagination'

export default {
    name: 'elementExample',
    data() {
        return {
            fileList: [],
            page: { pageNum: 1, pageSize: 1000, total: 10 },
            tableData: [],
            pagination: {}
        }
    },
    components: { FileUpload, Pagination, FuzzyQuery },
    mounted() {
        this.pagination = { [this.$refs.fuzzyQuery.params]: this.$refs.fuzzyQuery.search }
    },
    methods: {
        // 上传文件成功
        uploadSuccess(res, name, postfix) {
            // if (!this.fileInfo.name) {
            //     this.$set(this.fileInfo, 'name', name)
            // }
            // this.$set(this.fileInfo, 'url', `${process.env.VUE_APP_UPLOAD_API}${res.src}`)
            // this.$set(this.fileInfo, 'fileSuffix', postfix)
            // this.$axios.post('/file/uploadFile', res).then(res => {
            //     if (res.msg == 'ok') {
            //         this.$set(this.fileInfo, 'fileId', res.data.fileId)
            //     }
            // })
        },
        // 请求数据接口
        getList(pageSize = 10, pageNum = 1, params) {
            this.$axios.post('/searchList', { pageSize: pageSize, pageNum: pageNum, ...params }).then(res => {
                console.log('res :', res)
            })
        }
    }
}
</script>

<style lang="less" scoped>
.element-example {
    padding: 10px;
}
</style>
