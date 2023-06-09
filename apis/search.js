import request from '@/utils/request/index.js'

export function apiGetSearcHot(data) {
	return request.request({
		url: '/search/hot/detail',
		method: 'GET',
		data: data,
		authType: 'None'
	})
}

export function apiSearchSuggest(data) {
	return request.request({
		url: '/search/suggest',
		method: 'GET',
		data: data,
		authType: 'None'
	})
}
// 获取搜索
export function apiSearch(data) {
	return request.request({
		url: '/search',
		method: 'GET',
		data,
	})
}