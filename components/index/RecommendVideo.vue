<template>
	<view class="recommend-video">
		<view class="tit-bar">
			{{title}}
			<view class="more fr">更多></view>
		</view>
		<view class="video-item" v-for="(item, index) in recommendVideos" :key="index">
			<image class="img" :src="item.coverUrl"></image>
			<view class="desc ellipsis">{{ item.title }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			recommendVideos: {
				type: Array,
				default () {
					return []
				}
			},
		}
	}
</script>

<style lang="scss">
	.recommend-video {
		padding-left: 0;

		.tit-bar {
			padding-left: 32rpx;
			font-size: 34rpx;
			font-weight: 600;
			line-height: 110rpx;
		}

		.video-item {
			width: 686rpx;
			height: 490rpx;
			margin: 0 auto;
			background: #f8f8f8;
			border-radius: 10rpx;
			overflow: hidden;
			margin-bottom: 24rpx;
		}

		.more {
			width: 150rpx;
			height: 50rpx;
			line-height: 50rpx;
			text-align: center;
			margin-top: 30rpx;
			margin-right: 32rpx;
			color: #333;
			font-weight: 400;
			font-size: 24rpx;
			border: 2rpx solid #e6e6e6;
			border-radius: 50rpx;
		}

		.img {
			display: block;
			width: 686rpx;
			height: 390rpx;
			background: #eee;
		}

		.desc {
			padding-left: 40rpx;
			font-size: 30rpx;
			font-weight: 600;
			line-height: 100rpx;
		}
	}
</style>