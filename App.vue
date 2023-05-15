<script>
	import { mapMutations } from 'vuex';
	export default {
		onLaunch() {
			console.log('App Launch')
			uni.getStorage({
				key: 'userInfo',
				success: res => {
					console.log(res.data)
					this.storeLogin(JSON.parse(res.data))
					const mockMessage = {  // 模拟应用信息
						newMsg: [0, 1, 1, 0, 0],   // 红点信息
						account: 2   // 账号信息
					}
					this.storeMessage(mockMessage)
				}
			});
		},
		onShow: function() {
		},
		onHide: function() {
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
