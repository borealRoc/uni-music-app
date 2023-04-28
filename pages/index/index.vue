<template>
	<view class="music-find-page">
		<banner :swiper="swiper"></banner>
		<recommend :recommends="recommends"></recommend>
	</view>
</template>

<script>
	import {
		apiGetBanner
	} from '@/apis/index.js';
	import Banner from "../../components/index/Banner.vue"
	import Recommend from "../../components/index/Recommend.vue"
	export default {
		data() {
			return {
				swiper: [],
				recommends: [{
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
			}
		},
		components: {
			Banner,
			Recommend
		},
		onLoad() {
			this.getBanner()
		},
		methods: {
			// 获取轮播图
			getBanner() {
				apiGetBanner().then(res => {
					this.swiper = res.banners
				})
			},
		}
	}
</script>

<style lang="scss">
	@import "../../css/found.scss";
</style>