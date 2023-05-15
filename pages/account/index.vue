<template>
	<view class="account-page">
		<uni-nav-bar fixed :status-bar="true" @clickLeft="openScan" @clickRight="goCloud">
			<block slot="left">
				<image class="top-img left" src="/static/image/account/a16.png"></image>
			</block>
			<block slot="right">
				<image class="top-img" src="/static/image/mine/r.png"></image>
			</block>
			<view class="tac">{{title}}</view>
		</uni-nav-bar>
		<scroll-view scroll-y="true" class="page-content" @scroll="scroll" :scroll-top="scrollTop">
			<view class="empty-user" v-if="!userInfo.hasLogin">
				<view>登录网易云音乐</view>
				<view>手机电脑多端同步，尽享海量高品质音乐</view>
				<navigator class="btn" url="/pages/subpages/account/login">
					立即登录
				</navigator>
			</view>
			<view class="mall-bar flex-box">
				<view class="flex-item">
					<image class="icon" src="/static/image/account/a_m1.png"></image>
					消息
				</view>
				<view class="flex-item">
					<image class="icon" src="/static/image/account/a_m2.png"></image>
					商城
					<view class="txt">现实29包邮</view>
				</view>
				<view class="flex-item">
					<image class="icon" src="/static/image/account/a_m3.png"></image>
					演出
					<view class="txt">天鹅湖</view>
				</view>
				<view class="flex-item">
					<image class="icon" src="/static/image/account/a_m4.png"></image>
					个性换肤
				</view>
			</view>
			<view class="bgf8">
				<uni-list>
					<uni-list-item title="口袋彩铃" thumb="/static/image/account/a_16.png" size='mini' />
					<uni-list-item title="我的订单" thumb="/static/image/account/a_19.png" size='mini' border0 />
					<uni-list-item title="创作者中心" thumb="/static/image/account/a_09.png" size='mini' class="mt16"
						border0 />
					<uni-list-item title="设置" thumb="/static/image/account/a_21.png" size='mini' class="mt16" />
					<uni-list-item title="夜间模式" thumb="/static/image/account/a_23.png" size='mini' :show-switch="true"
						@switchChange="switchChange" />
					<uni-list-item title="定时开关" thumb="/static/image/account/13.png" size='mini' />
					<uni-list-item title="音乐闹钟" thumb="/static/image/account/13.png" size='mini' border0 />
					<uni-list-item title="在线听歌免流量" thumb="/static/image/account/14.png" size='mini' class="mt16" />
					<uni-list-item title="优惠券" thumb="/static/image/account/15.png" size='mini' border0 />
					<uni-list-item title="分享网易云音乐" thumb="/static/image/account/16.png" size='mini' class="mt16" />
					<uni-list-item title="关于" thumb="/static/image/account/17.png" size='mini' border0 />
				</uni-list>
			</view>
		</scroll-view>
		<view class="scan-box" :class="{active: isShowScan}">
			<uni-nav-bar if="isShowScan" fixed :status-bar="true" title="扫一扫" left-icon="back" @clickLeft="closeScan"></uni-nav-bar>
			<!-- <scan ref="scan" @success="getScanCode" /> -->
		</view>
	</view>
</template>

<script>
	import UniNavBar from '@/components/global/uni-nav-bar/uni-nav-bar.vue'
	import UniList from '@/components/global/uni-list/uni-list.vue'
	import UniListItem from '@/components/global/uni-list-item/uni-list-item.vue'
	// import Scan from '@/components/global/scan/Scan.vue'
	import { mapState, mapMutations } from 'vuex';
	export default {
		components: {
			UniNavBar,
			UniList,
			UniListItem,
			// Scan
		},
		data() {
			return {
				title: '',
				scrollTop: 0,
				isShowScan: false
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			openScan() {
				// this.$refs.scan.open()
				// this.isShowScan = true
				// 隐藏底部 tabbar
				// uni.hideTabBar({})
				
				uni.scanCode({
					success: function (res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			},
			closeScan() {
				// this.$refs.scan.close()
				this.isShowScan = false
				uni.showTabBar({})
			},
			goCloud() {
				uni.showToast({
					icon: 'none',
					title: '功能未开发'
				});
			},
			scroll(e) {
				let scrollTop = e.detail.scrollTop
				if (scrollTop < 5) {
					this.title = ''
					this.scrollTop = 0
				} else {
					this.title = '账号'
				}
			},
			getScanCode(val) {
				this.closeScan()
				uni.showToast({
					icon: 'none',
					title: '扫码成功',
				});
			},
		}
	}
</script>

<style lang="scss">
	.bgf8 {
		background: #f8f8f8;
	}

	.scan-box {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .8);
		transform: translateX(100%);
		transition: transform 0.05s;
		z-index: 999;

		&.active {
			transform: translateX(0)
		}
	}

	.tac {
		flex: 1;
		text-align: center;
	}

	.top-img {
		width: 50rpx;
		height: 40rpx;

		&.left {
			margin-left: 10rpx;
		}
	}

	.page-content {
		position: fixed;
		top: 64px;
		left: 0;
		right: 0;
		bottom: 0;
		/* #ifdef H5 */
		top: 44px; // h5 无状态栏
		bottom: 100rpx;
		/* #endif */
	}

	.mt16 {
		margin-top: 16rpx;
	}

	.bgf {
		background: #fff;
	}

	.empty-user {
		background: #fff;
		padding-top: 40rpx;
		text-align: center;
		line-height: 50rpx;

		.btn {
			width: 710rpx;
			height: 80rpx;
			margin: 22rpx auto 0;
			text-align: center;
			line-height: 80rpx;
			border: 2rpx solid #cdcdcd;
			border-radius: 80rpx;
			font-size: 32rpx;
		}
	}

	.userinfo-box {
		padding-top: 46rpx;

		.avator {
			width: 120rpx;
			height: 120rpx;
			margin: 0 32rpx;
			border-radius: 120rpx;
			color: #fff;
			background: #d6d8da;
			overflow: hidden;
		}

		.img {
			width: 100%;
			height: 100%;
		}

		.name {
			color: #302f30;
			line-height: 68rpx;
			font-weight: 600;
		}

		.sign {
			width: 128rpx;
			height: 52rpx;
			margin-top: 16rpx;
			margin-right: 32rpx;
			border-radius: 52rpx;
		}

		.level {
			width: 100rpx;
			height: 50rpx;
			text-align: center;
			line-height: 50rpx;
			border-radius: 50rpx;
			color: #838080;
			background: #d7d3d4;
			transform: scale(0.8);
		}
	}

	.nav-bar {
		margin-top: 38rpx;
		text-align: center;
		font-weight: 600;

		.flex-item {
			height: 80rpx;
			border-right: 1rpx solid #e5e1df;

			&:last-child {
				border: 0;
			}
		}

		.txt {
			color: #939293;
			font-weight: 400;
		}
	}

	.ad-bar {
		padding-top: 32rpx;

		.img {
			display: block;
			width: 686rpx;
			height: 120rpx;
			margin: 0 auto;
		}
	}

	.mall-bar {
		padding-top: 38rpx;
		padding-bottom: 20rpx;
		text-align: center;
		font-weight: 600;
		font-size: 26rpx;
		background: #fff;
		line-height: 35rpx;

		.icon {
			display: block;
			width: 48rpx;
			height: 48rpx;
			margin: 0 auto 24rpx;
		}

		.txt {
			color: #999;
			font-weight: 400;
			font-size: 24rpx;
			transform: scale(0.84);
		}
	}

	.line-item {

		.icon {
			float: left;
			width: 35rpx;
			height: 32rpx;
			margin-top: 30rpx;
			margin-right: 36rpx;
		}
	}

	.logout {
		height: 100rpx;
		margin-top: 16rpx;
		text-align: center;
		line-height: 100rpx;
		color: $color;
		background: #fff;
	}
</style>