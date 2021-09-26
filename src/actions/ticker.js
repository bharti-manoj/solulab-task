import * as types from "./types"
export const updateBID = (value) => {
    return {
        payload: { value },
        type: types.UPDATE_BID
    }
}

export const updateBIDSIZE = (value) => {
    return {
        payload: { value },
        type: types.UPDATE_BID_SIZE
    }
}

export const updateASK = (value) => {
    return {
        payload: { value },
        type: types.UPDATE_ASK
    }
}

export const updateASKSIZE = (value) => {
    return {
        payload: { value },
        type: types.UPDATE_ASK_SIZE
    }
}

export const updateDAILYCHANGE = (value) => {
    return {
        payload: { value },
        type: types.UPDATE_DAILY_CHANGE
    }
}

export const updateDAILYCHANGERELATIVE = (value) => {
    return {
        payload: { value },
        type: types.UPDATE_DAILY_CHANGE_RELATIVE
    }
}

export const updateLASTPRICE = (value) => {
    return {
        payload: { value },
        type: types.UPDATE_LAST_PRICE
    }
}

export const updateVOLUME = (value) => {
    return {
        payload: { value },
        type: types.UPDATE_VOLUME
    }
}

export const updateHIGH = (value) => {
    return {
        payload: { value },
        type: types.UPDATE_HIGH
    }
}

export const updateLOW = (value) => {
    return {
        payload: { value },
        type: types.UPDATE_LOW
    }
}
