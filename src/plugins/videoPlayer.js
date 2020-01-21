import Vue from 'vue'

// 直播格式
import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import videojs from 'video.js' // videojs
window.videojs = videojs
import('videojs-contrib-hls/dist/videojs-contrib-hls.js') // hls plugin for videojs6

Vue.use(VideoPlayer)

// 录播格式
import flvJs from 'flv.js'
Vue.prototype.$flvJs = flvJs
