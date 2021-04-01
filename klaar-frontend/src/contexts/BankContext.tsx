import React, {Context, createContext, useReducer} from "react";
import {REQUEST_STATUS} from "../types/Types";
import {Action, BankContextState} from "../types/ContextTypes";
import ActionTypes from "../types/ActionTypes";

const initialState: BankContextState = {
    banks: [],
    offset: {
        currentPage: 0,
        rowsPerPage: 30,
    },
    requestStatus: REQUEST_STATUS.LOADING
}


const initialContext: BankContextState = {
    ...initialState,
    dispatch: (): void => {
        throw new Error('setDispatch function must be overridden');
    }
}

export const BankContext: Context<BankContextState> = createContext<BankContextState>(initialContext);

const bankReducer = (state: BankContextState, action: Action): BankContextState => {
    switch (action.type) {
        case ActionTypes.SET_BANKS:
            return {
                ...state,
                banks: action.payload,
            };
        case ActionTypes.SET_OFFSET:
            return {
                ...state,
                offset: action.payload,
            };
        case ActionTypes.SET_REQUEST_STATUS:
            return {
                ...state,
                requestStatus: action.payload,
            };
        default:
            return state;
    }
}


export const BankProvider = ({children}: any): JSX.Element => {
    const [state, dispatch] = useReducer(bankReducer, initialState);

    return (
        <BankContext.Provider value={{...state, dispatch}}>
            {children}
        </BankContext.Provider>
    )
}
