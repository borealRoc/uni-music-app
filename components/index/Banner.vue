<template>
	<view class="banner">
		<swiper class="swiper" :autoplay="true" :indicator-dots="true" indicator-active-color="#ff372b"
			indicator-color='rgba(255,255,255, .5)' duration="500" :circular="true">
			<swiper-item v-for="(item,index) in banners" :key="index">
				<view class="item">
					<image :src="item.imageUrl" class="img"></image>
					<view class="tag">{{item.typeTitle}}</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			banners: {
				type: Array,
				require: true,
				default () {
					return []
				}
			}
		}
	}
</script>

<style lang="scss">
	.banner {
		width: 100%;
		height: 268rpx;
		margin: 30rpx auto 44rpx;

		.swiper {
			height: 268rpx;
		}

		.item {
			position: relative;
			display: block;
			width: 686rpx;
			height: 268rpx;
			margin: 0 auto;
			border-radius: 14rpx;
			overflow: hidden;
		}

		.img {
			display: block;
			width: 100%;
			height: 100%;
		}

		.tag {
			position: absolute;
			bottom: 0;
			right: 0;
			height: 34rpx;
			padding: 0 14rpx;
			line-height: 34rpx;
			color: #fff;
			background: #43a5f0;
			z-index: 10;
			border-top-left-radius: 14rpx;
		}
	}
</style>