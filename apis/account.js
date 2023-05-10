import request from '@/utils/request/index.js'

export function apiLogin(data) {
	return request.request({
		url: '/login/cellphone',
		method: 'GET',
		data,
		hideLoading: true
	})
}