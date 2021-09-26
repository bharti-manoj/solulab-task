import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderBook } from '../actions/book';
import Trade from './Trade';

const OrderBook = () => {
    const books = useSelector(state => state["books"])
    const dispatch = useDispatch()
    const [data, setData] = useState('')
    useEffect(() => {
        const connection = new WebSocket('wss://api-pub.bitfinex.com/ws/2')
        let msg = JSON.stringify({
            event: 'subscribe',
            channel: 'book',
            symbol: 'tBTCUSD',
            len: "25"
        })
        connection.onopen = () => connection.send(msg)
        connection.onmessage = (msg) => setData(msg.data)
    }, []);
    useEffect(() => {
        const arrayD = data.split(',')
        if (arrayD.length === 151) {
            const finalData = []
            const temp = data.split(",[[")
            // const orderId = temp[0].replace('[', '')
            const otherData = temp[1]?.split('],[')
            for (let idx = 0; idx < otherData?.length; idx += 2) {
                if (idx === 48) otherData[idx + 1] = otherData[idx + 1].replaceAll("]", '')
                finalData.push([...otherData[idx].split(","), ...otherData[idx + 1].split(",")])
            }
            let bidTotal = 0
            let askTotal = 0
            finalData.forEach(x => {
                bidTotal += Number(x[2])
                askTotal += Number(x[5])
                dispatch(updateOrderBook({
                    PRICE: Number(x[0]).toFixed(2),
                    COUNT: Number(x[1]),
                    AMOUNT: Number(x[2]).toFixed(8),
                    TOTAL: bidTotal.toFixed(8),
                    ASKPRICE: Number(x[3]).toFixed(2),
                    ASKCOUNT: Number(x[4]),
                    ASKAMOUNT: Number(x[5]).toFixed(8),
                    ASKTOTAL: askTotal.toFixed(8)
                }))
            });
        }
    }, [data, dispatch])
    return (
        <div className="row overflow-hidden justify-content-center font-weight-bold" style={{ height: "83vh" }}>
            <div
                className="col-12 col-md-8 ml-auto text-light bg-dark"
                style={{ border: "4px solid #cecccc", borderRight: "0", borderTopLeftRadius: "3px", borderBottomLeftRadius: "3px" }}
            >
                <div className="row">
                    <div className="col-12 d-inline-flex justify-content-between mt-1">
                        <span>
                            <span><i className="fa fa-angle-down fa-lg pr-2 pointer" aria-hidden="true"></i></span>
                            <span className="text-uppercase">Order Book
                                <span className="text-secondary pl-2">BTC/USD</span>
                            </span>
                        </span>
                        <span>
                            <i className="fas fa-minus fa-sm px-2 pointer"></i>
                            <i className="fas fa-plus fa-sm px-2 text-muted"></i>
                            <i className="fas fa-bell fa-sm px-2 pointer"></i>
                            <i className="fas fa-cog fa-sm px-2 pointer"></i>
                            <i className="fas fa-search-minus fa-sm px-2 pointer"></i>
                            <i className="fas fa-search-plus fa-sm px-2 pointer"></i>
                        </span>
                    </div>
                    <hr className="bg-secondary mb-0 mt-1" style={{ width: "98%" }} />
                    <div className="col-12 col-md-6 pr-1">
                        <table className="table table-hover table-sm text-light">
                            <thead>
                                <tr className="text-muted muted">
                                    <th className="text-center">COUNT</th>
                                    <th>AMOUNT</th>
                                    <th>TOTAL</th>
                                    <th>PRICE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map(book => (
                                    <tr style={{ backgroundImage: `linear-gradient(to left, rgba(60, 119, 33, 0.353) ${book?.TOTAL}%, transparent 0)` }}>
                                        <td className="text-center">{book.COUNT}</td>
                                        <td>{book.AMOUNT}</td>
                                        <td>{book.TOTAL}</td>
                                        <td>{book.PRICE}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-12 col-md-6 pl-1">
                        <table className="table table-hover table-sm text-light">
                            <thead>
                                <tr className="text-muted muted">
                                    <th>PRICE</th>
                                    <th>TOTAL</th>
                                    <th>AMOUNT</th>
                                    <th className="text-center">COUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map(book => (
                                    <tr style={{ backgroundImage: `linear-gradient(to right, rgba(255, 45, 45, 0.408) ${book.ASKTOTAL}%, transparent 0)` }}>
                                        <td>{book.ASKPRICE}</td>
                                        <td>{book.ASKTOTAL}</td>
                                        <td>{book.ASKAMOUNT}</td>
                                        <td className="text-center">{book.ASKCOUNT}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-12 d-inline-flex justify-content-end mt-1" style={{ fontSize: "12px" }}>
                        <span>
                            <span className="text-uppercase text-info">Full Book
                                <span className="text-secondary pl-1 pr-3" style={{ verticalAlign: "text-bottom" }}>|</span>
                                <span className="round"></span>
                                <span className="text-secondary pl-2 pointer underline">real-time</span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <Trade/>
        </div>
    );
}

export default OrderBook;
