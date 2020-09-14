<template>
    <div class="dplayer-com">
        <div class="dplayer-video-wrapper" id="dplayerId"></div>
    </div>
</template>

<script>
export default {
    name: 'DPlayer',
    props: {
        liveUrl: {
            type: [String],
            default: ''
        },
        mask: {
            type: [Boolean],
            default: false
        }
    },
    mounted() {
        let that = this

        this.oDplayer = new this.$dplayer({
            container: document.getElementById('dplayerId'),
            live: true,
            autoplay: true,
            video: {
                //url: 'https://dzgp.jyhosp.cn:18883/flv/5_2650354',
                url: this.liveUrl,
                type: 'flv'
            }
        })

        this.oDplayer.on('canplaythrough', function() {
            if (that.oDplayer.paused) {
                that.oDplayer.play()
            }

            let timer = setTimeout(() => {
                if (that.oDplayer.paused) {
                    that.oDplayer.play()
                }

                that.videoMutedVolume(1)
            }, 1200)
        })
    },
    data() {
        return {
            oDplayer: null // dplayer 实例
        }
    },
    methods: {
        menuPlayer() {
            return false
        },
        videoMutedVolume(vol) {
            this.oDplayer.volume(vol)
        }
    }
}
</script>

<style lang="less" scoped>
.dplayer-com {
    width: 80%;
    position: relative;

    .dplayer-video-wrapper {
        height: 100%;
    }

    .mask-com-wr {
        position: absolute;
        left: 0;
        top: -30px;
        width: 100%;
        height: 100%;
        z-index: 10;
    }
}
</style>
