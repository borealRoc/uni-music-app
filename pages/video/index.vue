<template>
	<view class="video-page">
		<view class="topbar">
			<scroll-view class="scroll-view" scroll-x>
				<view class="item" v-for="(item, index) in navList" :class="{active: curNav === item.id}" :key="item.id"
					@click="switchNav(item.id, index)">
					<view class="desc">{{item.name}}</view>
				</view>
				<view class="slide" :style="'width: '+ sliderWidth +'rpx;transform: translateX('+ sliderOffset +'rpx)'">
				</view>
			</scroll-view>
		</view>
		<mescroll-uni ref="mescroll" :top="mescrollTop" :down="downOption" :up="upOption" @down="downCallback"
			@up="upCallback">
			<view class="video-list">
				<view class="video-item" v-for="(item, index) in videoLists" :key="index">
					<view class="video-wrap">
						<image class="img" :src="item.coverUrl"></image>
						<view class="desc ellipsis">{{item.title}}</view>
						<view class="creater-bar flex-box">
							<view class="avactor-box flex-box">
								<image class="avactor" src=""></image>
								<view class="name">{{item.creator[0].userName}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import {
		apiGetVideoLists
	} from '@/apis/video.js';
	import {
		Video_NavLists
	} from '@/model/index.js'

	import MescrollUni from "@/components/global/mescroll-uni/mescroll-uni.vue";

	export default {
		data() {
			return {
				navList: Video_NavLists,
				curNav: '',
				sliderWidth: 60,
				sliderOffset: 0,
				videoLists: [],
				mescrollTop: 210, // 满足app高度
				// 下拉刷新的常用配置
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
			};
		},
		components: {
			MescrollUni
		},
		methods: {
			init() {
				this.initNav()
				this.initMescrollTop()
			},
			initNav() {
				this.switchNav(34654, 0)
			},
			initMescrollTop() {
				// #ifdef H5
				this.mescrollTop = 186
				// #endif
			},
			// 导航切换
			switchNav(id, index) {
				this.curNav = id
				this.sliderWidth = index === 1 ? 140 : 60;
				this.sliderOffset = 126 * index + (index > 1 ? 80 : 16) + (index === 0 && 16);
				this.getVideoLists(1, 10, res => {
					this.videoLists = res
				})
			},
			// 
			// 获取相关视频
			getVideoLists(pageNum, pageSize, successCallback, errorCallback) {
				const params = {
					id: this.curNav,
					pageNum,
					pageSize,
				}
				apiGetVideoLists(params).then(res => {
					//联网成功的回调
					successCallback && successCallback(res.data);
				}, res => {
					//联网失败的回调
					errorCallback && errorCallback();
				})
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				//联网加载数据
				this.getVideoLists(mescroll.num, mescroll.size, (res) => {
					//设置列表数据
					if (mescroll.num == 1) this.videoLists = []; //如果是第一页需手动置空列表
					this.videoLists = this.videoLists.concat(res)
					mescroll.endSuccess();
				}, () => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				})
			},
		},
		onLoad() {
			this.init()
		}
	}
</script>

<style lang="scss">
	.scroll-view {
		position: fixed;
		top: 64px;
		width: 100%;
		height: 86rpx;
		white-space: nowrap;
		text-align: center;
		line-height: 86rpx;
		color: #333;
		font-weight: 600;
		border-bottom: 1rpx solid #e6e6e6;
		z-index: 10;
		background: #fff;
		/* #ifdef H5 */
		top: 44px;
		/* #endif */

		.item {
			position: relative;
			display: inline-block;
			min-width: 126rpx;
			padding: 0 20rpx;
			line-height: 34rpx;
			padding-bottom: 16rpx;

			&.active {
				color: #f32628;
			}
		}
	}

	.slide {
		position: absolute;
		width: 60rpx;
		height: 4rpx;
		left: 0;
		bottom: 0rpx;
		background: #f32628;
		transition: transform 0.3s;
	}

	.video-list {
		color: #333;
		background: #f8f8f8;

		.tit-bar {
			padding-left: 32rpx;
		}

		.video-item {
			padding-top: 32rpx;
			background: #fff;
			border-bottom: 24rpx solid #f8f8f8;
		}

		.video-wrap {
			width: 686rpx;
			margin: 0 auto;
		}

		.img {
			display: block;
			width: 686rpx;
			height: 390rpx;
			border-radius: 10rpx;
			background: #eee;
		}

		.desc {
			font-size: 30rpx;
			font-weight: 600;
			line-height: 84rpx;
			border-bottom: 1rpx solid #e6e6e6;
		}
	}

	.creater-bar {
		height: 100rpx;
		justify-content: space-between;
		align-items: center;

		.avactor-box {
			align-items: center;
		}

		.avactor {
			width: 66rpx;
			height: 66rpx;
			margin-right: 10rpx;
			border-radius: 66rpx;
			background: #eee;
		}

		.name {
			line-height: 100rpx;
		}
	}
</style>