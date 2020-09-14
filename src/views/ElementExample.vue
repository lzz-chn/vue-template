<template>
    <div class="element-example">
        <div class="example-item">
            <h4>FileUpload</h4>
            <FileUpload ref="fileUpload" fileType="ppt" :fileList="fileList" @success="uploadSuccess" />
            <el-divider></el-divider>
        </div>
        <div class="example-item">
            <h4>FuzzyQuery</h4>
            <FuzzyQuery
                ref="fuzzyQuery"
                @fuzzyQuery="getList"
                :pageSize="page.pageSize"
                params="name"
                placeholder="输入XX回车以查询"
            />
            <el-divider></el-divider>
        </div>
        <div class="example-item">
            <h4>Pagination</h4>
            <Pagination @currentChange="getList" :page="page" :query="pagination" />
            <el-divider></el-divider>
        </div>
        <div class="example-item">
            <h4>DialogForm</h4>
            <el-button type="primary" @click="dialogVisible = true">弹窗表单</el-button>
            <DialogForm title="投诉" :visible.sync="dialogVisible" :dataWatch="dialogForm" @submit="dialogSubmit">
                <el-form ref="form" :model="dialogForm" label-width="80px" size="small">
                    <el-form-item label="表单输入" prop="content">
                        <el-input
                            v-model="dialogForm.content"
                            type="textarea"
                            :rows="5"
                            placeholder="请输入投诉内容"
                            clearable
                        />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="dialogSubmit">提交</el-button>
                        <el-button @click="dialogVisible = false">放弃</el-button>
                    </el-form-item>
                </el-form>
            </DialogForm>
            <el-divider></el-divider>
        </div>
        <div class="example-item">
            <h4>DPlayer</h4>
            <DPlayer liveUrl="http://dzgp.jyhosp.cn:18882/flv/11_5327611" />
            <el-divider></el-divider>
        </div>
    </div>
</template>

<script>
import FileUpload from '@/components/element/fileUpload'
import FuzzyQuery from '@/components/element/fuzzyQuery'
import Pagination from '@/components/element/pagination'
import DialogForm from '@/components/element/dialogForm'
import DPlayer from '@/components/video/DPlayer'

export default {
    name: 'elementExample',
    data() {
        return {
            fileList: [],
            page: { pageNum: 1, pageSize: 1000, total: 10 },
            tableData: [],
            pagination: {},
            dialogVisible: false,
            dialogForm: { content: '' }
        }
    },
    components: { FileUpload, Pagination, FuzzyQuery, DialogForm, DPlayer },
    mounted() {
        this.pagination = { [this.$refs.fuzzyQuery.params]: this.$refs.fuzzyQuery.search }
    },
    methods: {
        // 上传文件成功
        uploadSuccess(res, name, postfix) {
            console.log('res :>> ', res)
            console.log('name :>> ', name)
            console.log('postfix :>> ', postfix)
        },
        // 请求数据接口
        getList(pageSize = 10, pageNum = 1, params) {
            this.$axios.post('/searchList', { pageSize: pageSize, pageNum: pageNum, ...params }).then(res => {
                console.log('res :', res)
            })
        },
        // 弹窗表单提交
        dialogSubmit() {
            this.$message.success('submit success')
            this.dialogVisible = false
        }
    }
}
</script>

<style lang="less" scoped>
.element-example {
    padding: 10px;
}
</style>
