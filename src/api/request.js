import request from '@/util/http.js'
// import urls from './urls.js'

function getReq (url, params) {
    return request({
        url,
        method: 'get',
        params
    })
}

function postReq (url, params) {
    return request({
        url,
        method: 'post',
        data: params
    })
}

function postReqOld (url, params) {
    return request({
        url: urls[url],
        method: 'post',
        data: params
    })
}

export {
    postReqOld,
    postReq,
    getReq
}