<template>
	<view class="music-find-page">
		<banner :banners="banners"></banner>
		<main-entry :entrys="entrys"></main-entry>
		<recommend-song title="推荐歌单" :songs="songs"></recommend-song>
	</view>
</template>

<script>
	import {
		apiGetBanner,
		apiGetRecommendSongs
	} from '@/apis/index.js';
	import Banner from "../../components/index/Banner.vue"
	import MainEntry from "../../components/index/MainEntry.vue"
	import RecommendSong from "../../components/index/RecommendSong.vue"

	export default {
		data() {
			return {
				banners: [],
				entrys: [{
					name: '每日推荐'
				}, {
					name: '歌单'
				}, {
					name: '排行榜',
					url: '/pages/subpages/index/rank'
				}, {
					name: '电台'
				}, {
					name: '直播'
				}],
				songs: []
			}
		},
		components: {
			Banner,
			MainEntry,
			RecommendSong
		},
		onLoad() {
			this.getBanner()
			this.getRecommendSongs();
		},
		methods: {
			// 获取轮播图
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
					this.songs = res.result;
					this.songs.forEach(item => {
						item.playCount = formatCount(item.playCount);
					});
				});
			}
		}
	}
</script>

<style lang="scss">
	@import "../../css/found.scss";
</style>