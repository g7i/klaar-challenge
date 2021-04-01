export type Bank = {
    ifsc: string,
    branch: string,
    address: string,
    city: string,
    district: string,
    state: string,
    bank_name: string,
    bank_id: number,
}

export enum REQUEST_STATUS {
    LOADING,
    ERROR,
    SUCCEED,
}
