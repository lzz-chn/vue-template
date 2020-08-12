<template>
    <div class="file-upload">
        <el-upload
            class="upload-demo"
            drag
            multiple
            ref="upload"
            :action="actionUrl"
            :data="fileParams"
            :on-success="handleSuccess"
            :on-error="handleError"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :before-remove="beforeRemove"
            :file-list="fileList"
            :limit="1"
            :on-exceed="handleExceed"
            :accept="accept"
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
    </div>
</template>

<script>
export default {
    data() {
        return {
            actionUrl: `${process.env.VUE_APP_UPLOAD_API}/group1/upload`,
            fileParams: {
                scene: 'default',
                output: 'json'
            },
            filePostfix: '',
            accept: ''
        }
    },
    props: { fileType: { type: String, default: 'null' }, fileList: { type: Array, default: [] } },
    watch: {
        fileType(val) {
            switch (val) {
                case 'PPT':
                    this.accept = '.pptx,.pptm,.ppt,.potx,.potm,.pot,.ppsx,.ppsm,.pps,.ppam,.ppa'
                    break
                case 'PDF':
                    this.accept = '.pdf'
                    break
                case 'VIDEO':
                    this.accept = '.avi,.wmv,.mpeg,.mp4,.m4v,.mov,.asf,.flv,.f4v,.rmvb,.rm,.3gp,.vob'
                    break
            }
        }
    },
    created() {
        // 拦截演示账号的上传请求
        if (sessionStorage.getItem('userId') == process.env.VUE_APP_DEMO_ID) {
            this.actionUrl += '/mock'
        }
    },
    methods: {
        // 过滤文件格式
        filtersFile(file) {
            let isType
            switch (this.fileType) {
                case 'PPT':
                    isType = file.name.match(/.(pptx|pptm|ppt|potx|potm|pot|ppsx|ppsm|pps|ppam|ppa)$/g)
                    break
                case 'PDF':
                    isType = file.name.match(/.pdf$/g)
                    break
                case 'VIDEO':
                    isType = file.name.match(/.(avi|wmv|mpeg|mp4|m4v|mov|asf|flv|f4v|rmvb|rm|3gp|vob)$/g)
                    break
                case 'ALL':
                    isType = true
                    break
            }

            return isType
        },
        // 上传文件之前
        beforeUpload(file) {
            let isType = this.filtersFile(file)
            let isUpload = false
            let isLtSize = file.size / 1024 / 1024 < 10 // 小于 size M

            if (this.fileType == 'null') {
                this.$message.error('请选择上传文件的类别!')
                return isUpload
            }
            if (!isType) {
                this.$message.error('请上传已选择的文件类别!')
            }
            if (!isLtSize) {
                this.$message.error(`上传文件大小不能超过 10MB!`)
            }
            if (isType && isLtSize) {
                this.isUpload = true
                this.filePostfix = isType[0]
            }
            return isUpload
        },
        // 上传成功
        handleSuccess(res, file, fileList) {
            this.$emit('success', res, file.name.replace(this.filePostfix, ''), this.filePostfix)
        },
        // 上传失败
        handleError(err, file, fileList) {
            console.log('handleError :>> ', err)
        },
        // 点击已上传文件
        handlePreview(file) {
            console.log(file)
        },
        // 删除文件之前
        beforeRemove(file, fileList) {
            if (this.filtersFile(file)) {
                return this.$confirm(`确定移除 ${file.name}？`)
            }
        },
        // 删除文件
        handleRemove(file, fileList) {
            this.$emit('remove', file)
        },
        // 超过上传限制
        handleExceed(files, fileList) {
            this.$message.warning('仅支持上传单个文件')
        },
        // 清除文件列表
        clearFileList() {
            this.$refs.upload.clearFiles()
        }
    }
}
</script>

<style lang="less" scoped>
.file-upload {
}
</style>
