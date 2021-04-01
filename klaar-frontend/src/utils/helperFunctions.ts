import {Bank, REQUEST_STATUS} from "../types/Types";
import ActionTypes from "../types/ActionTypes";
import {BASE_API_URL} from "../config";
import axios from "axios";
import {Dispatch} from "react";
import {Action} from "../types/ContextTypes";
import ls from 'localstorage-ttl';

export function containsQuery(bank: Bank, filterQuery: string): boolean {
    return bank.state.toLowerCase().includes(filterQuery.toLowerCase()) ||
        bank.branch.toLowerCase().includes(filterQuery.toLowerCase()) ||
        bank.bank_name.toLowerCase().includes(filterQuery.toLowerCase()) ||
        bank.address.toLowerCase().includes(filterQuery.toLowerCase()) ||
        bank.ifsc.toLowerCase().includes(filterQuery.toLowerCase()) ||
        bank.city.toLowerCase().includes(filterQuery.toLowerCase()) ||
        bank.district.toLowerCase().includes(filterQuery.toLowerCase());
}

export async function fetchBanks(dispatch: Dispatch<Action>, city: string): Promise<void> {
    const dispatchAction = (type: ActionTypes, payload: any): void => {
        dispatch({
            type,
            payload
        });
    }

    dispatchAction(ActionTypes.SET_REQUEST_STATUS, REQUEST_STATUS.LOADING);
    const url: string = `${BASE_API_URL}?city=${city}`;
    const cache: string | null = ls.get(url);
    if (cache) {
        dispatchAction(ActionTypes.SET_REQUEST_STATUS, REQUEST_STATUS.SUCCEED);
        dispatchAction(ActionTypes.SET_BANKS, JSON.parse(cache));
    } else {
        axios.get(url)
            .then(res => {
                dispatchAction(ActionTypes.SET_REQUEST_STATUS, REQUEST_STATUS.SUCCEED);
                dispatchAction(ActionTypes.SET_BANKS, res.data);
                ls.set(url, JSON.stringify(res.data), [30 * 60 * 1000]);
            })
            .catch(err => {
                dispatchAction(ActionTypes.SET_REQUEST_STATUS, REQUEST_STATUS.ERROR);
                console.error(err.response);
            })
    }
}