<template>
	<view class="music-find-page">
		<view :class="{dpn: isShowSearch}">
			<uni-nav-bar fixed :status-bar="true" @clickRight="goPlay">
				<block slot="left">
					<block>
						<!-- #ifdef MP-WEIXIN -->
						<image class="top-img" src="/static/image/mine/r.png" @click="goPlay"></image>
						<!-- #endif -->
						<!-- #ifndef MP-WEIXIN -->
						<image class="top-img pl10" src="/static/image/search/6.png" @click="goCloud"></image>
						<!-- #endif -->
					</block>
				</block>
				<view class="top-search flex-box" @click="openSearch">
					<image class="search-icon" src="/static/image/search/2.png"></image>
					{{ searchTxt }}
				</view>
				<!-- #ifdef APP-PLUS || H5 -->
				<block slot="right" v-if="isShowPlay">
					<image class="top-img pr10" src="/static/image/mine/r.png"></image>
				</block>
				<!-- #endif -->
			</uni-nav-bar>
			<view class="page-content">
				<mescroll-uni ref="mescroll" :fixed="false" :down="downOption" :up="upOption" @down="downCallback"
					@up="upCallback">
					<banner :banners="banners"></banner>
					<main-entry :entrys="entrys"></main-entry>
					<recommend-song title="推荐歌单" :recommendSongs="recommendSongs" :latestAlbums="latestAlbums"
						@switchAlbum="switchAlbum"></recommend-song>
					<recommend-video title="精选视频" :recommendVideos="recommendVideos"></recommend-video>
				</mescroll-uni>
			</view>
		</view>
		<search ref="search" @close="closeSearch"></search>
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
	import UniNavBar from '@/components/global/uni-nav-bar/uni-nav-bar.vue'
	import MescrollUni from "@/components/global/mescroll-uni/mescroll-uni.vue"
	import search from "@/components/global/search/index.vue"

	export default {
		data() {
			return {
				banners: [],
				entrys: Found_NavLists,
				recommendSongs: [],
				latestMusic: [],
				latestAlbums: [],
				recommendVideos: [],
				downOption: {
					auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
				},
				// 上拉加载的常用配置
				upOption: {
					auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量,默认10
					},
				},
				searchTxt: '周杰伦',
				isShowSearch: false,
				isShowPlay: false,
			}
		},
		components: {
			Banner,
			MainEntry,
			RecommendVideo,
			MescrollUni,
			UniNavBar,
			search
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
			getList(pageNum, pageSize, successCallback, errorCallback) {
				const params = {
					id: 4571 + pageNum,
					pageNum,
					pageSize,
				}
				apiGetRecommendVideos(params).then(res => {
					//联网成功的回调
					successCallback && successCallback(res.data);
				}, res => {
					//联网失败的回调
					errorCallback && errorCallback();
				})
			},
			downCallback(mescroll) {
				mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				//联网加载数据
				this.getList(mescroll.num, mescroll.size, (res) => {
					if (mescroll.num == 1) this.recommendVideos = []; //如果是第一页需手动置空列表
					this.recommendVideos = this.recommendVideos.concat(res)
					mescroll.endSuccess();
				}, () => {
					mescroll.endErr();
				})
			},
			// 去播放
			goPlay() {
				console.log('去播放列表页面')
			},
			goCloud() {
				uni.showToast({
					icon: 'none',
					title: '功能未开发',
				});
			},
			// 打开搜索
			openSearch() {
				this.isShowSearch = true;
				this.$refs.search.open()
			},
			// 关闭搜索
			closeSearch() {
				this.isShowSearch = false;
			},
		},
	}
</script>

<style lang="scss">
	@import "../../css/found.scss";

	.pl10 {
		padding-left: 20rpx;
	}

	.pr10 {
		padding-right: 20rpx;
	}

	.dpn {
		display: none;
	}

	.top-img {
		width: 50rpx;
		height: 50rpx;
		margin-top: 10rpx;
	}

	.top-search {
		width: 560rpx;
		/* #ifdef MP-WEIXIN */
		flex: none;
		width: 460rpx;
		margin-left: -60rpx;
		/* #endif */
		height: 72rpx;
		margin-right: 24rpx;
		border-radius: 72rpx;
		color: #c6c6c6;
		background: #f7f7f7;
		align-items: center;
		justify-content: center;

		.search-icon {
			width: 28rpx;
			height: 29rpx;
			margin-right: 12rpx;
		}
	}

	.page-content {
		position: fixed;
		top: 64px;
		left: 0;
		right: 0;
		bottom: 0px;
		/* #ifdef H5 || MP-WEIXIN */
		top: 44px;
		/* #endif */
	}
</style>