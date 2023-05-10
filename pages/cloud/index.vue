<template>
	<view class="cloud-page">
		<uni-nav-bar fixed :status-bar="true" @clickLeft="goCloud" @clickRight="goCloud">
			<block slot="left">
				<image class="top-img left" src="/static/image/cloud/y_03.png"></image>
			</block>
			<view class="top-tab flex-box">
				<view v-for="(item, index) in navList" :class="{active: curNav === index }" :key="index"
					@click="switchTab(item.id, index)">{{item.name}}</view>
			</view>
			<!-- #ifdef APP-PLUS || H5 -->
			<block slot="right">
				<image class="top-img" src="/static/image/mine/r.png"></image>
			</block>
			<!-- #endif -->
		</uni-nav-bar>
		<view class="page-content">
			<mescroll-uni ref="mescroll" :fixed="false" :down="downOption" :up="upOption" @down="downCallback"
				@up="upCallback">
				<view class="date-bar flex-box">
					<view class="date-bar-left">
						云村热评墙 
						<!-- <svg-icon iconType="jiantouyou"></svg-icon> -->
						<swiper class="date-bar-swiper" :autoplay="true" :duration="500" :circular="true"
							:vertical="true">
							<swiper-item v-for="(item, index) in dateMsg.msgList" :key="index">
								{{item.name}}
							</swiper-item>
						</swiper>
					</view>
					<view>
						<view>{{dateMsg.curDate[1]}}.</view>
						<view class="date-bar-num">{{dateMsg.curDate[2]}}</view>
					</view>
				</view>
				<view class="list-content flex-box">
					<view class="video-list flex-box">
						<view class="video-item" v-for="(item, index) in showList.colList1" :key="index">
							<view class="video-wrap">
								<image class="img" :src="item.coverUrl" mode="widthFix"></image>
								<view class="video-con">
									<view class="desc">{{item.title}}</view>
									<view class="creater-bar flex-box">
										<view class="avactor-box flex-box">
											<image class="avactor" src=""></image>
											<view class="name">{{item.creator[0].userName}}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="video-list flex-box">
						<view class="video-item" v-for="(item, index) in showList.colList2" :key="index">
							<view class="video-wrap">
								<image class="img" :src="item.coverUrl" mode="widthFix"></image>
								<view class="video-con">
									<view class="desc">{{item.title}}</view>
									<view class="creater-bar flex-box">
										<view class="avactor-box flex-box">
											<image class="avactor" src=""></image>
											<view class="name">{{item.creator[0].userName}}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import {
		apiGetVideoLists
	} from '@/apis/video.js';
	import {
		Cloud_NavLists,
		Cloud_MsgLists
	} from '@/model/index.js'

	import UniNavBar from '@/components/global/uni-nav-bar/uni-nav-bar.vue'
	import MescrollUni from "@/components/global/mescroll-uni/mescroll-uni.vue"

	export default {
		components: {
			UniNavBar,
			MescrollUni
		},
		data() {
			return {
				navList: Cloud_NavLists,
				curNav: 1,
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
				dateMsg: {
					curDate: String(new Date()).split(' '),
					msgList: Cloud_MsgLists,
				},
				allList: [],
				showList: {},
			};
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				this.switchTab(3245, 1)
			},
			goCloud() {
				uni.showToast({
					icon: 'none',
					title: '功能未开发'
				});
			},
			// 标题栏切换
			switchTab(id, index) {
				this.curNav = index
				this.getList(1, 10, res => {
					this.allList = res
					this.formatList()
				})
			},
			downCallback(mescroll) {
				mescroll.resetUpScroll()
			},
			upCallback(mescroll) {
				this.getList(mescroll.num, mescroll.size, (res) => {
					if (mescroll.num == 1) this.allList = []; //如果是第一页需手动置空列表
					if (mescroll.num == 1) res = [...res, ...res]; // 第一页数据量太少模拟数据
					this.allList = this.allList.concat(res)
					this.formatList()
					mescroll.endSuccess();
				}, () => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				})
			},
			getList(pageNum, pageSize, successCallback, errorCallback) {
				const params = {
					id: this.curNav + 1,
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
			formatList() {
				let i = 0,
					colList1 = [], // 第一列数据
					colList2 = [], // 第二列数据
					lsit = this.allList;

				while (i < lsit.length) {
					colList1.push(lsit[i++]);
					if (i < lsit.length) {
						colList2.push(lsit[i++]);
					}
				}

				this.showList = {
					colList1, // 第一列数据
					colList2 // 第二列数据
				};
			},
		},
	}
</script>

<style lang="scss">
	page {
		background: #f8f8f8;
	}

	.page-content {
		position: fixed;
		top: 64px;
		left: 0;
		right: 0;
		bottom: 0;
		/* #ifdef H5 */
		top: 44px; // h5 无状态栏
		/* #endif */
	}

	.top-img {
		width: 50rpx;
		height: 40rpx;

		&.left {
			margin-left: 10rpx;
		}
	}

	.top-tab {
		width: 310rpx;
		/* #ifdef MP-WEIXIN */
		width: 250rpx;
		/* #endif */
		margin: 0 auto;
		justify-content: space-between;

		.active {
			position: relative;
			color: #f32628;

			&:after {
				position: absolute;
				content: '';
				left: 50%;
				width: 94rpx;
				height: 4rpx;
				bottom: 0rpx;
				transform: translateX(-50%);
				background: #f32628;
				border-radius: 4rpx;
			}
		}
	}

	.date-bar {
		width: 686rpx;
		height: 160rpx;
		padding: 20rpx 34rpx;
		margin: 20rpx auto;
		border-radius: 14rpx;
		color: #fff;
		background: rgba(0, 0, 0, .7);
		line-height: 70rpx;
		font-weight: 600;
		justify-content: space-between;

		.date-bar-left {
			font-size: 34rpx;
			font-weight: 600;
		}

		.date-bar-num {
			margin-top: -20rpx;
			font-size: 44rpx;
		}
	}

	.list-content {
		padding-left: 30rpx;
		flex-direction: row; // 主轴方向设置为水平方向
	}

	.video-list {
		flex-direction: column; // 主轴方向设置为垂直方向
	}

	.video-item {
		width: 334rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		border-radius: 14rpx;
		overflow: hidden;
		color: #353536;
		background: #fff;
		line-height: 36rpx;

		.img {
			display: block;
			width: 100%;
			min-height: 188rpx;
		}

		.avactor {
			width: 28rpx;
			height: 28rpx;
			margin-right: 10rpx;
			border-radius: 28rpx;
			background: #ddd;
		}

		.video-con {
			padding: 16rpx 16rpx 30rpx;
		}

		.avactor-box {
			align-items: center;
		}

		.creater-bar {
			margin-top: 10rpx;
			align-items: center;
			color: #999;
			font-size: 20rpx;
		}
	}

	.date-bar-swiper {
		width: 430rpx;
		height: 40rpx;
		line-height: 40rpx;
		color: #d0d2d3;
		font-size: 24rpx;
	}
</style>