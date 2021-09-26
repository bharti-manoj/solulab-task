import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { updateASK, updateASKSIZE, updateBID, updateBIDSIZE, updateDAILYCHANGE, updateDAILYCHANGERELATIVE, updateHIGH, updateLASTPRICE, updateLOW, updateVOLUME } from '../actions/ticker'
// import bitcoin from "../images/bitcoin.PNG"

function Ticker() {
    const ticker = useSelector(state => state["ticker"])
    const history = useHistory()
    const [data, setData] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        const connection = new WebSocket('wss://api-pub.bitfinex.com/ws/2')
        let msg = JSON.stringify({
            event: 'subscribe',
            channel: 'ticker',
            symbol: 'tBTCUSD'
            // symbol: 'ALL'
        })
        connection.onopen = () => connection.send(msg)
        connection.onmessage = (msg) => setData(msg.data)

        // if (value==='close'){
        //     connection.close()
        //     return
        // }
        // else if(value==='open') {
        //     connection.onopen =()=>connection.send(msg)
        //     connection.onmessage = (msg:any) => setData(msg.data)
        // }
    }, []);

    useEffect(() => {
        const arrayD = data.split(',')
        if (arrayD.length === 11) {
            arrayD[0] = arrayD[0].replace('[', '')
            arrayD[1] = arrayD[1].replace('[', '')
            arrayD[10] = arrayD[10].replace(']]', '')
            const a1 = arrayD[1]
            const a2 = arrayD[2].substr(0, 7)
            const a3 = arrayD[3]
            const a4 = arrayD[4].substr(0, 7)
            const a5 = arrayD[5].substr(0, 7)
            const a6 = (parseFloat(arrayD[6]) * 100).toFixed(2)
            const a7 = arrayD[7]
            const a8 = arrayD[8].substr(0, 7)
            const a9 = arrayD[9]
            const a10 = arrayD[10]
            dispatch(updateBID(a1))
            dispatch(updateBIDSIZE(a2))
            dispatch(updateASK(a3))
            dispatch(updateASKSIZE(a4))
            dispatch(updateDAILYCHANGE(a5))
            dispatch(updateDAILYCHANGERELATIVE(a6))
            dispatch(updateLASTPRICE(a7))
            dispatch(updateVOLUME(a8))
            dispatch(updateHIGH(a9))
            dispatch(updateLOW(a10))
        }
    }, [data, dispatch])
    return (
        <div className="row overflow-hidden justify-content-center">
            <div className="col-12 col-lg-7 mx-auto mb-3 pointer" style={{ maxWidth: "40%", minWidth: "500px" }} onClick={() => history.push("/order-book")}>
                <div className="jumbotron row justify-content-between border border-3 bg-dark py-3 px-3 text-light font-weight-bold text-uppercase mb-0">
                    <div className="col-1 h1 mr-2" style={{ fontSize: "60px" }}>&#x20BF;</div>
                    {/* <div className="col-1 h1 mr-2" style={{ fontSize: "60px" }}><img src={bitcoin} alt="bitcoin" /></div> */}
                    <div className="col-5">
                        <div className="coin">BTC/USD</div>
                        <div className="vol"><span className="pr-1 text-secondary">VOL</span>{ticker.VOLUME} <span className="pl-1 text-secondary underline pointer">BTC</span></div>
                        <div className="low"><span className="pr-1 text-secondary">low</span> {ticker.LOW}</div>
                    </div>
                    <div className="col-5 text-right">
                        <div className="coin">{ticker.BID}</div>
                        <div className={`inc${ticker.DAILY_CHANGE < 0 ? " text-danger" : " text-success"}`}>
                            {ticker.DAILY_CHANGE}
                            <i className={`fas fa-caret-${ticker.DAILY_CHANGE < 0 ? "down" : "up"} px-1`}></i>
                            ({ticker.DAILY_CHANGE_RELATIVE}%)
                        </div>
                        <div className="high"><span className="pr-1 text-secondary">high</span>{ticker.HIGH}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ticker
