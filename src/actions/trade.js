import * as types from './types'

export const updateTrades = (value) => ({
    payload: { value },
    type: types.UPDATE_TRADES
})