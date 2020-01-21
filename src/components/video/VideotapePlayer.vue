<template>
    <div class="videotape-player">
        <video id="videoElement" style="width:100%;height:100%" controls="controls"></video>
    </div>
</template>

<script>
export default {
    name: 'VideotapePlayer',
    data() {
        return {}
    },
    props: { flvSrc: String },
    mounted() {
        if (this.flvSrc) {
            if (this.$flvJs.isSupported()) {
                let videoElement = document.getElementById('videoElement')
                let flvPlayer = this.$flvJs.createPlayer({ type: 'flv', url: this.flvSrc })
                flvPlayer.attachMediaElement(videoElement)
                flvPlayer.load()
                // flvPlayer.play();
            }
        }
    }
}
</script>

<style lang="less" scoped>
.videotape-player {
    width: 1000px;
    margin: 0 auto;
}
</style>
