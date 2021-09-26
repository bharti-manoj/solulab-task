import * as types from '../actions/types'

const initialState = []

export const books = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_ORDER_BOOK:
            return [ ...state, action.payload.value ]
        default:
            return state
    }
}

