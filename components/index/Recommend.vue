<template>
	<view class="recommend flex-box">
		<view class="flex-item" v-for="(item, index) in recommends" :key="index" @click="goUrl(item)">
			<image :src="'/static/image/index/t_' + (index + 1) + '.png'" class="img"></image>
			<view>{{ item.name }}</view>
			<view v-if="index == 0" class="date">{{ curDate }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			recommends: {
				type: Array,
				require: true,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				curDate: '',
			}
		},
		created() {
			this.curDate = new Date().getDate()
		},
		methods: {
			goCloud() {
				uni.showToast({
					icon: 'none',
					title: '功能未开发',
				});
			},
			goUrl(item) {
				if (!item.url) {
					this.goCloud()
					return false;
				}
				uni.navigateTo({
					url: item.url
				})
			},
		}
	}
</script>

<style lang="scss">
	.recommend {
		padding-bottom: 22rpx;
		text-align: center;
		line-height: 70rpx;
		color: #666;
		border-bottom: 1rpx solid #e6e6e6;

		.img {
			display: block;
			width: 92rpx;
			height: 92rpx;
			margin: 0 auto;
		}

		.flex-item {
			position: relative;

			.date {
				position: absolute;
				left: 50%;
				top: 40rpx;
				line-height: 1;
				font-size: 24rpx;
				color: #ff392d;
				transform: translateX(-50%) scale(0.8);
			}
		}
	}
</style>