import request from '../util/request'

// 查询试酒订单列表
export const waybillFind = (data) => request({ url: `api/waybill/find`, method: 'POST', data })

export const getWaybillTrace = (data) => request({ url: `api/waybill/getTrace`, method: 'POST', data })
