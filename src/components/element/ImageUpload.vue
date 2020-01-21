<template>
    <div class="image-upload">
        <el-upload
            class="el-image-upload"
            ref="imgUpload"
            action="#"
            :show-file-list="false"
            :auto-upload="false"
            :http-request="imgRequest"
            :on-change="imgChange"
        >
            <img v-if="imgStatus" :src="imgUrl" class="el-image" />
            <i v-else class="el-icon-plus image-upload-icon"></i>
        </el-upload>
    </div>
</template>

<script>
export default {
    name: 'ImageUpload',
    data() {
        return {
            imgStatus: false,
            imgFile: '',
            imgUrl: ''
        }
    },
    props: { imgSrc: String },
    created() {
        if (this.imgSrc) {
            this.imgStatus = true
            this.imgUrl = this.imgSrc
            // this.imgUrl = this.$store.state.uploadUrl + this.imgSrc
        }
    },
    methods: {
        // 获取上传文件
        imgRequest(item) {
            this.imgFile = item.file
        },
        // 处理图片的变化
        proveChange(file, size) {
            const isType = file.raw.type.match(/^image\/(jpeg|png|jpg)$/)
            const isLtSize = file.size / 1024 / 1024 < size // 小于 size M

            if (!isType) {
                this.$message.error('上传图片只支持 JPG/PNG 格式!')
            }
            if (!isLtSize) {
                this.$message.error(`上传图片大小不能超过 ${size}MB!`)
            }
            if (isType && isLtSize) {
                this.imgStatus = false
                this.imgUrl = URL.createObjectURL(file.raw)
                this.$refs.imgUpload.submit()
                this.imgStatus = true
            } else {
                this.$refs.imgUpload.clearFiles()
            }
        },
        // 处理图片更新
        imgChange(file) {
            this.proveChange(file, 2)
        },
        // 保存图片到服务器
        saveFile() {
            let param = new FormData()

            param.append('file', this.imgFile)
            param.append('scene', 'default')
            param.append('output', 'json')
            this.$store.state.uploadFile = true // 切换请求为上传文件模式
            const saveFile = async () => {
                let res = await this.$axios.default({
                    method: 'post',
                    url: this.$store.state.uploadUrl + '/upload',
                    headers: { 'Content-Type': 'multipart/form-data' },
                    data: param
                })
            }

            if (res.retcode == 0) {
                return res.path
            }
        }
    }
}
</script>

<style lang="less" scoped>
.image-upload {
    .el-image-upload {
        display: inline-block;
        border: 1px dashed #d9d9d9;
        border-radius: 2px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 300px;
        height: 178px;
        &:hover {
            border-color: #009688;
        }
        .el-image {
            width: 300px;
            height: 178px;
            display: block;
        }
        .image-upload-icon {
            font-size: 28px;
            color: #8c939d;
            width: 300px;
            line-height: 178px;
            text-align: center;
        }
    }
}
</style>
