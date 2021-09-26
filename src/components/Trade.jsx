import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTrades } from '../actions/trade';

const Trade = () => {
    const trades = useSelector(state => state["trades"])
    // console.log(trades)
    const dispatch = useDispatch()
    const [data, setData] = useState('')
    useEffect(() => {
        const connection = new WebSocket('wss://api-pub.bitfinex.com/ws/2')
        let msg = JSON.stringify({
            event: 'subscribe',
            channel: 'trades',
            symbol: 'tBTCUSD',
            // hist: "25"
        })
        connection.onopen = () => connection.send(msg)
        connection.onmessage = (msg) => setData(msg.data)
    }, []);
    useEffect(() => {
        const arrayD = data.split(',')
        if (arrayD.length >= 121) {
            const finalData = []
            const temp = data.split(",[[")
            // const orderId = temp[0].replace('[', '')
            const otherData = temp[1]?.split('],[')
            for (let idx = 0; idx < otherData?.length; idx++) {
                if (idx === 29) otherData[idx] = otherData[idx].replaceAll("]", '')
                finalData.push([...otherData[idx].split(",")])
            }
            finalData.forEach(x => {
                dispatch(updateTrades({
                    ID: Number(x[0]),
                    MTS: Number(x[1]),
                    AMOUNT: Number(x[2]).toFixed(8),
                    PRICE: Number(x[3]).toFixed(2),
                }))
            });
        }
    }, [data, dispatch])
    return (
        <div
            className="col-12 col-md-4 mr-auto text-light bg-dark"
            style={{ border: "4px solid #cecccc", borderTopRightRadius: "3px", borderBottomRightRadius: "3px" }}
        >
            <div className="row">
                <div className="col-12 d-inline-flex justify-content-between mt-1">
                    <span>
                        <span><i className="fa fa-angle-down fa-lg pr-2 pointer" aria-hidden="true"></i></span>
                        <span className="text-uppercase">Trades
                            <span className="text-secondary pl-2">BTC/USD</span>
                        </span>
                    </span>
                    <span>
                        <span className="pr-2">Market</span>
                        <span className="pb-1 border-bottom">Yours</span>
                    </span>
                </div>
                <hr className="bg-secondary mb-0 mt-1" style={{ width: "98%" }} />
                <div className="col-12 pr-1">
                    <table className="table table-hover table-sm text-light">
                        <thead>
                            <tr className="text-muted muted">
                                <th style={{ width: "2%" }}></th>
                                <th className="text-center">TIME</th>
                                <th className="text-center">PRICE</th>
                                <th className="text-right pr-3">AMOUNT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trades.map((trade, idx) => {
                                if (idx > 5) return <></>
                                return (
                                    <>
                                        <tr>
                                            {/* <td colSpan="4" className="text-center" style={{ fontSize: "14px" }}>Wednesday, March 21st</td> */}
                                            <td colSpan="4" className="text-center" style={{ fontSize: "14px" }}>
                                                {(new Date(trade?.MTS)).toDateString()}
                                            </td>
                                        </tr>
                                        <tr style={{ backgroundColor: `${Number(trade?.AMOUNT) > 0 ? 'rgba(60, 119, 33, 0.068)' : 'rgba(255, 45, 45, 0.068)'}` }}>
                                            <td style={{ width: "2%" }}><span className={`${Number(trade?.AMOUNT) > 0 ? "round": "round-danger"}`}></span></td>
                                            <td className="text-center">
                                                {(new Date(trade?.MTS)).getHours()}:
                                                {(new Date(trade?.MTS)).getMinutes()}:
                                                {(new Date(trade?.MTS)).getSeconds()}
                                            </td>
                                            <td className="text-center">{trade?.PRICE}</td>
                                            <td className="text-right pr-3">{trade.AMOUNT}</td>
                                        </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Trade;
