<template>
    <div class="pdf-preview">
        <div class="pc" v-if="facility != 'mobile'" v-loading="pdfLoading">
            <div class="pdf-tab">
                <div class="file-name">{{ fileName }}</div>
                <div class="page">{{ pageNum }}&nbsp;&nbsp;/&nbsp;&nbsp;{{ pageTotalNum }}</div>
                <div class="btn">
                    <i class="el-icon-plus" @click="scaleD"></i>
                    <i class="el-icon-minus" @click="scaleX"></i>
                    <i class="el-icon-refresh-right" @click="clock"></i>
                    <!-- <i class="el-icon-full-screen" @click="fullScreen"></i> -->
                    <!-- <i class="el-icon-download" @click="download"></i> -->
                </div>
                <div class="page-control">
                    <i class="el-icon-arrow-up" @click="prePage"></i>
                    <i class="el-icon-arrow-down" @click="nextPage"></i>
                </div>
            </div>
            <pdf
                ref="pdf"
                :src="filePath"
                class="content"
                :page="pageNum"
                :rotate="pageRotate"
                @progress="loadedRatio = $event"
                @num-pages="pageTotalNum = $event"
                @error="pdfError($event)"
                @link-clicked="page = $event"
                @page-loaded="pageLoaded($event)"
                @loaded="loadPdfHandler"
            >
            </pdf>
            <!-- <pdf
                ref="pdf"
                :src="filePath"
                class="content"
                :page="pageNum"
                :rotate="pageRotate"
                @password="password"
                @progress="loadedRatio = $event"
                @page-loaded="pageLoaded($event)"
                @num-pages="pageTotalNum = $event"
                @error="pdfError($event)"
                @link-clicked="page = $event"
            >
            </pdf> -->
        </div>
        <div id="mobile" v-else></div>
    </div>
</template>

<script>
export default {
    name: 'pdf-preview',
    data() {
        return {
            pageNum: 1,
            pageTotalNum: 1,
            pageRotate: 0,
            loadedRatio: 0, // 加载进度
            curPageNum: 0,
            scale: 70,
            maxWidth: '',
            fileName: '',
            pdfLoading: true,
            pdfh5: null
        };
    },
    props: ['filePath', 'facility'],
    components: { pdf },
    created() {
        this.fileName = this.filePath.match(/[^\/]+.pdf$/)[0];
    },
    mounted() {
        if (this.facility == 'mobile') {
            // this.scale = 100;
            // this.$refs.pdf.$el.style.width = parseInt(this.scale) + '%';
            this.pdfh5 = new this.$pdfH5('#mobile', {
                pdfurl: this.filePath
            });

            this.pdfh5.on('complete', function(status, msg, time) {
                console.log(
                    '状态：' + status + '，信息：' + msg + '，耗时：' + time + '毫秒，总页数：' + this.totalNum
                );
            });
        }
    },
    watch: {
        filePath(val, oldVal) {
            this.fileName = val.match(/[^\/]+.pdf$/)[0];
        }
    },
    methods: {
        // 前一页
        prePage() {
            var p = this.pageNum;
            p = p > 1 ? p - 1 : this.pageTotalNum;
            this.pageNum = p;
        },
        // 后一页
        nextPage() {
            var p = this.pageNum;
            p = p < this.pageTotalNum ? p + 1 : 1;
            this.pageNum = p;
        },
        // 旋转
        clock() {
            this.pageRotate += 90;
        },
        // 全屏
        fullScreen() {
            document.querySelector('.pdf-preview').requestFullscreen();
        },
        // 放大
        scaleD() {
            if (this.scale >= 100) {
                return;
            }
            this.scale += 5;
            this.$refs.pdf.$el.style.width = parseInt(this.scale) + '%';
        },
        // 缩小
        scaleX() {
            if (this.scale <= 30) {
                return;
            }
            this.scale += -5;
            this.$refs.pdf.$el.style.width = parseInt(this.scale) + '%';
        },
        // 下载
        download() {
            let a = document.createElement('a');
            a.href = this.filePath;
            a.click();
        },
        // 页面加载
        pageLoaded(e) {
            this.curPageNum = e;
            this.pdfLoading = false;
        },
        // 加载时先加载第一页
        loadPdfHandler() {
            this.curPageNum = 1;
        },
        // 错误打印
        pdfError(error) {
            console.error('pdf :', error);
        }
        // password(updatePassword, reason) {
        //     updatePassword(prompt('password is "123456"'));
        //     console.log('...reason...');
        //     console.log(reason);
        //     console.log('...reason...');
        // },
        // pdfPrintAll() {
        //     this.$refs.pdf.print();
        // },
        // pdfPrint() {
        //     this.$refs.pdf.print(100, [1, 2]);
        // }
    }
};
</script>

<style lang="less" scoped>

.pdf-preview {
    .pc {
        padding: 0 20px 20px;
        background: #525659;
        position: relative;
        .pdf-tab {
            display: flex;
            justify-content: space-between;
            color: #fff;
            background: #323639;
            padding: 20px;
            margin: 0 -20px 20px;
            font-size: 16px;
            .btn {
                i {
                    font-size: 20px;
                    margin-left: 20px;
                    cursor: pointer;

                    &:nth-child(1) {
                        margin-left: 0;
                    }
                }
            }
            .page-control {
                position: absolute;
                right: 2%;
                bottom: 10%;
                z-index: 99;
                i {
                    cursor: pointer;
                    font-size: 20px;
                    font-weight: 700;
                    display: flex;
                    width: 40px;
                    height: 40px;
                    color: #000;
                    background: rgb(235, 235, 235);
                    margin-top: 20px;
                    border-radius: 50%;
                    // box-shadow: 0 0 3px 1px rgba(255, 255, 255, 0.5);
                    &::before {
                        margin: auto;
                    }
                }
            }
        }
        .content {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 70%;
        }
    }
    #mobile{
        width: 100%;
    }
}
</style>
