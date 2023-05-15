<template>
	<view>
		<!-- H5端，只可账号密码登录 -->
		<view class="login-form">
			<input class="input-row js-input-numer" v-model="account" type="number" maxlength="11"
				placeholder="输入手机号" />
			<input class="input-row" v-model="password" @confirm="goLogin" type="password" maxlength="20"
				placeholder="输入密码" confirm-type="登录" />
			<button type="button" class="btn login-btn" @click="goLogin">登录</button>
			<view class="bot flex-box">
				<navigator class="sign" hover-class="none">立即注册</navigator>
				<navigator class="forget" hover-class="none">忘记密码?</navigator>
			</view>
		</view>
		<view class="auth-row" v-if="hasProvider">
			<view class="auth-image" v-for="provider in providerList" :key="provider.value">
				<!-- App 端可 QQ，微信，微博授权登录 -->
				<!-- #ifdef APP-PLUS -->
				<image class="img" :src="provider.image" @click="authLogin(provider.value)"></image>
				<!-- #endif -->

				<!-- 小程序可微信授权登录 -->
				<!-- #ifdef MP-WEIXIN -->
				<button v-if="provider.value == 'weixin'" class="log-btn" open-type="getUserInfo"
					@getuserinfo="getUserInfo">
					<image class="img" :src="provider.image"></image>
				</button>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
	import {
		apiLogin
	} from '@/apis/account.js';
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {
				hasProvider: false, // 是否有服务商平台可登录
				providerList: [],
				account: '',
				password: '',
			};
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			...mapMutations(['storeLogin']),
			setInputNumber() {
				this.$nextTick(() => {
					document.querySelector('.js-input-numer input').setAttribute("pattern", "[0-9]*")
				})
			},
			// 获取服务供应商
			getProvider() {
				uni.getProvider({
					service: 'oauth',
					success: res => {
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								var tempProvider = res.provider[i];
								this.providerList.push({
									value: tempProvider,
									image: '/static/image/login/' + tempProvider + '.png'
								});
							}
							this.hasProvider = true;
						}
					},
					fail: err => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			verifyLogin() {
				const account = this.account.trim()
				const password = this.password.trim()
				if (!account.length) {
					this.alert('请输入手机号')
					return false;
				}
				if (!(/^1[3456789]\d{9}$/.test(account))) {
					this.alert("手机号码有误，请重填");
					return false;
				}
				if (password.length < 6) {
					this.alert('密码最短为 6 个字符')
					return false;
				}
				return true
			},
			goLogin() {
				const ifLogin = this.verifyLogin()
				if (ifLogin) {
					const params = {
						phone: this.account,
						password: this.password
					};
					apiLogin(params).then(res => {
						if (res.code !== 200) { // 不成功信息提示
							uni.showToast({
								icon: 'none',
								title: res.msg,
							});
							return false
						}
						const temp = {
							token: res.access_token,
							profile: res.data.profile
						}
						this.storeLogin(temp)
					})
				}
			},
			// 验证报错
			alert(msg) {
				uni.showToast({
					icon: 'none',
					title: msg
				});
			},
			// 微信授权登陆
			getUserInfo(res) {
				uni.login({
					success(res) {
						console.log('login-res', res)
						uni.getUserInfo({
							success(res) {
								console.log('uni.getUserInfo', res)
							}
						})
					}
				})

			},
			// 第三方授权登录
			authLogin(value) {
				uni.login({
					provider: value,
					success: res => {
						console.log(res)
						uni.getUserInfo({
							provider: value,
							success: infoRes => {
								console.log(infoRes)
								// 这里有一个验证用户接口，判定授权的QQ/微博/微信有无绑定平台账号，如果没有新建账号，有的话平台账号登录
								// uni.request({
								// })
								let profile = {}
								infoRes.userInfo.nickname = infoRes.userInfo.nickName
								profile = infoRes.userInfo

								const temp = {
									token: '',
									profile,
								}

								this.storeLogin(temp)

								// 登录完之后到首页
								uni.switchTab({
									url: '/pages/index/index'
								});
							}
						});
					},
					fail: err => {
						console.error('授权失败：' + JSON.stringify(err));
					}
				});
			},
		},
		onReady() {
			this.getProvider()
			// #ifdef H5
			this.setInputNumber()
			// #endif
		},
	}
</script>

<style lang="scss">
	.input-row {
		width: 600rpx;
		height: 75rpx;
		margin: 0 auto;
		border: 1px solid $color;
		color: #6c6c6c;
		border-radius: 75rpx;
		padding: 0 50rpx;
		line-height: 75rpx;
		margin-bottom: 45rpx;
		font-size: 26rpx;
	}

	.login-form {
		padding-top: 220rpx;
	}

	.login-btn {
		width: 600rpx;
		height: 75rpx;
		margin: 0 auto;
		border: 1px solid $color;
		border-radius: 75rpx;
		padding: 0 50rpx;
		line-height: 75rpx;
		margin-bottom: 45rpx;
		font-size: 26rpx;
		color: #fff;
		background: $color;
	}

	.bot {
		width: 600rpx;
		padding: 0 17rpx;
		font-size: 26rpx;
		margin: 0 auto;
		justify-content: space-between;
	}

	.sign {
		color: $color;
	}

	.auth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		bottom: 100rpx;
		left: 0;
		width: 100%;

		.auth-image {
			width: 50px;
			height: 50px;
			border: 1px solid #dddddd;
			border-radius: 50px;
			margin: 0 20px;
			background-color: #ffffff;
			overflow: hidden;
		}

		.img {
			width: 30px;
			height: 30px;
			margin: 10px;
		}

		input {
			outline: none;
			border: none;
			list-style: none;
		}
	}

	.log-btn {
		margin: 0;
		padding: 0;
		background: #fff !important;
		height: 48px;

		&::after {
			background-color: transparent;
			margin: 0;
			padding: 0;
			border: 0;
		}
	}
</style>