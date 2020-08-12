<template>
    <div class="dialog-form">
        <el-dialog
            v-loading="$store.state.loading"
            center
            :title="title"
            :top="top"
            :width="width"
            :visible.sync="visibleSync"
            :before-close="beforeClose"
            :append-to-body="appendToBody"
            :close-on-press-escape="false"
        >
            <slot></slot>
            <div class="transfer-btn">
                <slot name="btn"></slot>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'dialogForm',
    data() {
        return {
            visibleSync: false,
            isChange: false,
            firstOpen: false
        }
    },
    watch: {
        visible(val) {
            this.visibleSync = val
            this.firstOpen = val
        },
        visibleSync(val) {
            this.$emit('update:visible', val)
        },
        dataWatch: {
            handler(val) {
                // 排除首次打开数据变化的情况
                if (!this.firstOpen) {
                    console.log('val :>> ', val)
                    this.isChange = true
                } else {
                    this.firstOpen = false
                }
            },
            deep: true
        }
    },
    props: {
        title: { type: String },
        width: { type: String, default: '700px' },
        top: { type: String, default: '15vh' },
        visible: { type: Boolean },
        appendToBody: { type: Boolean, default: false },
        dataWatch: {}
    },
    methods: {
        // 关闭弹窗回调
        beforeClose(done) {
            if (this.isChange) {
                this.$confirm('检测到未提交的内容，是否在离开页面前提交修改？', '确认信息', {
                    distinguishCancelAndClose: true,
                    closeOnClickModal: false,
                    confirmButtonText: '提交',
                    cancelButtonText: '放弃修改'
                })
                    .then(() => {
                        this.$emit('submit')
                    })
                    .catch(action => {
                        if (done && action == 'cancel') {
                            this.isChange = false
                            done()
                        }
                    })
            } else {
                done()
            }
        }
    }
}
</script>

<style lang="less" scoped>
.dialog-form {
    .transfer-btn {
        margin-top: 30px;
        text-align: right;
    }
}
</style>
