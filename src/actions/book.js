import * as types from './types'

export const updateOrderBook = (value) => ({
    payload: { value },
    type: types.UPDATE_ORDER_BOOK
})