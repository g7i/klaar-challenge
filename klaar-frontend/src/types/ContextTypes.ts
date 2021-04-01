import ActionTypes from "./ActionTypes";
import {Dispatch} from "react";
import {Bank, REQUEST_STATUS} from "./Types";

// Action model
export type Action = {
    type: ActionTypes,
    payload: any,
}

// Context state model
export type BankContextState = {
    banks: Bank[],
    requestStatus: REQUEST_STATUS,
    offset: {
        currentPage: number,
        rowsPerPage: number
    },
    dispatch?: Dispatch<Action>,
}
