import request from '@/utils/request/index.js'

// 获取轮播图
export function apiGetBanner(data) {
	return request.request({
		url: '/banner',
		method: 'GET',
		data,
		authType: 'None'
	})
}
// 获取推荐歌单
export function apiGetRecommendSongs(data) {
	return request.request({
		url: '/personalized',
		method: 'GET',
		data,
	})
}
// 获取新碟
export function apiGetLatestAlbums(data) {
	return request.request({
		url: '/album/newest',
		method: 'GET',
		data,
	})
}
// 获取精选视频
export function apiGetRecommendVideos(data) {
	return request.request({
		url: '/related/allvideo',
		method: 'GET',
		data,
		hideLoading: true
	})
}
// 获取歌单详情
export function apiAlbumDetail(data) {
	return request.request({
		url: '/playlist/detail',
		method: 'GET',
		data,
	})
}
// 获取歌曲链接
export function apiSongUrl(data) {
	return request.request({
		url: '/song/url',
		method: 'GET',
		data,
	})
}

// 获取歌曲详情
export function apiSongDetail(data) {
	return request.request({
		url: '/song/detail',
		method: 'GET',
		data,
	})
}