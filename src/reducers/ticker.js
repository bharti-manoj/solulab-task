import * as types from '../actions/types'

const InitialState = {
    BID: '',
    BID_SIZE: '',
    ASK: '',
    ASK_SIZE: '',
    DAILY_CHANGE: '',
    DAILY_CHANGE_RELATIVE: '',
    LAST_PRICE: '',
    VOLUME: '',
    HIGH: '',
    LOW: ''
}
export const ticker = (state = InitialState, action) => {
    switch (action.type) {
        case types.UPDATE_BID:
            return { ...state, BID: action.payload.value }
        case types.UPDATE_BID_SIZE:
            return { ...state, BID_SIZE: action.payload.value }
        case types.UPDATE_ASK:
            return { ...state, ASK: action.payload.value }
        case types.UPDATE_ASK_SIZE:
            return { ...state, ASK_SIZE: action.payload.value }
        case types.UPDATE_DAILY_CHANGE:
            return { ...state, DAILY_CHANGE: action.payload.value }
        case types.UPDATE_DAILY_CHANGE_RELATIVE:
            return { ...state, DAILY_CHANGE_RELATIVE: action.payload.value }
        case types.UPDATE_LAST_PRICE:
            return { ...state, LAST_PRICE: action.payload.value }
        case types.UPDATE_VOLUME:
            return { ...state, VOLUME: action.payload.value }
        case types.UPDATE_HIGH:
            return { ...state, HIGH: action.payload.value }
        case types.UPDATE_LOW:
            return { ...state, LOW: action.payload.value }
        default:
            return state
    }
}

