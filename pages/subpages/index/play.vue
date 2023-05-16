<template>
	<view class="play-page" :style="bgStyle">
		<view class="bg"></view>
		<!-- 拨条 -->
		<!-- <view class="strip-box" :class="playState ? 'active' : ''"> -->
		<view class="strip-box active">
			<image class="img" src="https://s3.music.126.net/mobile-new/img/needle-ip6.png?be4ebbeb6befadfcae75ce174e7db862="></image>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import {
		apiSongUrl,
		apiSongDetail
	} from '@/apis/index.js'
	export default {
		data() {
			return {
				curSongItem: {},
				curSong: {}
			};
		},
		computed: {
			...mapState(['playList']),
			bgStyle() {
				if (this.curSongItem.picUrl || this.curSong.picUrl) {
					return 'background-image:url(' + (this.curSongItem.picUrl || this.curSong.picUrl) + ')'
				} else {
					return ''
				}
			}
		},
		methods: {
			init() {
				this.initCurSong()
				this.initCurSongDetail()
			},
			initCurSong() {
				this.curSong = this.playList.curSong
			},
			async getCurSongDetail() {
				const {
					id
				} = this.curSong
				const res = await apiSongDetail({
					ids: id
				})
				return res
			},
			async initCurSongDetail() {
				const songDetail = await this.getCurSongDetail()
				const song = songDetail.songs[0]
				const picUrl = song.al.picUrl
				this.$set(this.curSongItem, 'picUrl', picUrl)
			},
			goBack() {
				uni.navigateBack()
			},
		},
		onLoad() {
			this.init()
		},
	}
</script>

<style lang="scss">
	@import "@/css/play.scss";
</style>