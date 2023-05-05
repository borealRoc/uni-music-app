import request from '@/utils/request/index.js'

export function apiGetVideoLists(data) {
	return request.request({
		url: '/related/allvideo',
		method: 'GET',
		data,
		hideLoading: true
	})
}