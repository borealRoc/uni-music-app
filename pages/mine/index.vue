<template>
	<view>
		<uni-nav-bar fixed :status-bar="true" title="我的音乐" @clickLeft="goCloud" @clickRight="goCloud">
			<block slot="left">
				<image class="top-img left" src="/static/image/mine/l.png"></image>
			</block>
			<!-- #ifdef APP-PLUS || H5 -->
			<block slot="right">
				<image class="top-img" src="/static/image/mine/r.png"></image>
			</block>
			<!-- #endif -->
		</uni-nav-bar>
		<scroll-view scroll-y="true" class="page-content">
			<scroll-view class="nav-list scroll-view" scroll-x :show-scrollbar="false">
				<view class="item" v-for="(item, index) in navList" :key="index">
					<image class="img" :src="'/static/image/mine/' + item.imd + '.png'"></image>
					<view class="desc">{{ item.name }}</view>
				</view>
			</scroll-view>
			<uni-list>
				<uni-list-item title="本地音乐" thumb="/static/image/mine/m_15.png" />
				<uni-list-item title="最近播放" thumb="/static/image/mine/m_17.png" />
				<uni-list-item title="我的电台" thumb="/static/image/mine/m_19.png" />
				<uni-list-item title="我的收藏" thumb="/static/image/mine/m_21.png" />
			</uni-list>
		</scroll-view>
	</view>
</template>

<script>
	import {
		apiGetNavList
	} from '@/apis/mine.js';
	import {
		MyMusic_NavLists
	} from '@/model/index.js'

	import UniNavBar from '@/components/global/uni-nav-bar/uni-nav-bar.vue'
	import UniList from '@/components/global/uni-list/uni-list.vue'
	import UniListItem from '@/components/global/uni-list-item/uni-list-item.vue'


	export default {
		data() {
			return {
				navList: MyMusic_NavLists,
			}
		},
		components: {
			UniNavBar,
			UniList,
			UniListItem
		},
		methods: {
			goCloud() {
				uni.showToast({
					icon: 'none',
					title: '功能未开发'
				});
			},
		}
	}
</script>

<style lang="scss">
	.top-img {
		width: 50rpx;
		height: 40rpx;

		&.left {
			margin-left: 10rpx;
		}
	}

	.nav-list {
		height: 160rpx;
		padding-top: 10px;
		padding-bottom: 14rpx;
		white-space: nowrap;
		text-align: center;
		line-height: 76rpx;
		color: #666;
		border-bottom: 1rpx solid #e6e6e6;
		font-size: 24rpx;
		background: #fff;

		.item {
			position: relative;
			display: inline-block;
			height: 210rpx;
			width: 166rpx;

		}

		.img {
			display: block;
			width: 70rpx;
			height: 70rpx;
			margin: 0 auto;
			border-radius: 50%;
		}
	}

	.line-item {
		.icon {
			float: left;
			width: 70rpx;
			height: 70rpx;
			margin-top: 24rpx;
			margin-right: 36rpx;
		}

		.lab {
			font-size: 32rpx;
			color: #444;
		}

		.con {
			position: relative;
			height: 100rpx;
			overflow: hidden;

			&:before {
				position: absolute;
				content: "";
				right: 0;
				bottom: 0;
				width: 100%;
				border-bottom: 1rpx solid #e6e6e6;
			}
		}
	}

	.recommend-list {
		border-top: 16rpx solid #f8f8f8;
	}
</style>