import { combineReducers } from "redux";
import { ticker } from "./ticker";
import { books } from "./book";
import { trades } from "./trade";


export default combineReducers({ ticker, books, trades });
