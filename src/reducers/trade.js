import * as types from '../actions/types'

const initialState = []

export const trades = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_TRADES:
            return [ ...state, action.payload.value ]
        default:
            return state
    }
}

