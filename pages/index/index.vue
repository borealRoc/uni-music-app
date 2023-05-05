<template>
	<view class="music-find-page">
		<banner :banners="banners"></banner>
		<main-entry :entrys="entrys"></main-entry>
		<recommend-song title="推荐歌单" :recommendSongs="recommendSongs" :latestAlbums="latestAlbums"
			@switchAlbum="switchAlbum"></recommend-song>
		<recommend-video title="精选视频" :recommendVideos="recommendVideos"></recommend-video>
	</view>
</template>

<script>
	import {
		apiGetBanner,
		apiGetRecommendSongs,
		apiGetLatestAlbums,
		apiGetRecommendVideos
	} from '@/apis/index.js';
	import {
		Found_NavLists
	} from '@/model/index.js'

	import Banner from "../../components/index/Banner.vue"
	import MainEntry from "../../components/index/MainEntry.vue"
	import RecommendVideo from "../../components/index/RecommendVideo.vue"

	console.log('Found_NavLists', Found_NavLists)

	export default {
		data() {
			return {
				banners: [],
				entrys: Found_NavLists,
				recommendSongs: [],
				latestMusic: [],
				latestAlbums: [],
				recommendVideos: [],
			}
		},
		components: {
			Banner,
			MainEntry,
			RecommendVideo
		},
		onLoad() {
			this.getBanner()
			this.getRecommendSongs()
			this.getLatestAlbums()
			this.getRecommendVideos()
		},
		methods: {
			getBanner() {
				apiGetBanner().then(res => {
					this.banners = res.banners
				})
			},
			getRecommendSongs() {
				const params = {
					limit: 6
				};
				apiGetRecommendSongs(params).then(res => {
					// 格式化播放量数据
					const formatCount = data => {
						let tempNum = data;
						if (data > 100000) {
							tempNum = parseInt(data / 10000) + '万';
						}

						return tempNum;
					};
					this.recommendSongs = res.result;
					this.recommendSongs.forEach(item => {
						item.playCount = formatCount(item.playCount);
					});
				});
			},
			getLatestAlbums() {
				apiGetLatestAlbums().then(res => {
					this.latestMusic = res.albums;
					this.latestAlbums = res.albums.slice(0, 3);
				});
			},
			switchAlbum(type) {
				if (type === 1) {
					this.latestAlbums = this.latestMusic.slice(0, 3);
				} else {
					this.latestAlbums = this.latestMusic.slice(3, 6);
				}
			},
			getRecommendVideos() {
				const params = {
					id: 6524
				};
				apiGetRecommendVideos(params).then(res => {
					this.recommendVideos = res.data;
				});
			},
		},
	}
</script>

<style lang="scss">
	@import "../../css/found.scss";
</style>