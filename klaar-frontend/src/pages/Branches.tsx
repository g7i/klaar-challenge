import React, {useContext, useEffect, useState} from 'react';
import {
    CircularProgress,
    FormControl,
    InputBase,
    InputLabel,
    MenuItem,
    Select,
    TableContainer,
    TablePagination
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {Bank, REQUEST_STATUS} from "../types/Types";
import DataTable from '../components/DataTable';
import {BankContextState} from "../types/ContextTypes";
import {BankContext} from "../contexts/BankContext";
import ActionTypes from "../types/ActionTypes";
import {useBranchStyles} from "../styles/branches";
import {containsQuery, fetchBanks} from "../utils/helperFunctions";

function Branches(): JSX.Element {
    const classes = useBranchStyles();
    const [filterQuery, setFilterQuery] = useState<string>('');
    const [city, setCity] = useState<string>('MUMBAI');
    const {banks, dispatch, requestStatus, offset} = useContext<BankContextState>(BankContext);

    useEffect(() => {
        fetchBanks(dispatch, city);
    }, [city, dispatch]);

    const getVisibleBanks = (): Bank[] => {
        const {currentPage, rowsPerPage} = offset;
        return (
            banks.filter(bank => containsQuery(bank, filterQuery))
        ).slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage);
    }

    const getContent = (): JSX.Element => {
        switch (requestStatus) {
            case REQUEST_STATUS.SUCCEED:
                return (
                    <div className={classes.tableDiv}>
                        <DataTable offset={offset.currentPage * offset.rowsPerPage}
                                   banks={getVisibleBanks()}/>
                    </div>
                );
            case REQUEST_STATUS.ERROR:
                return (
                    <div>An Error Occurred</div>
                );
            default:
                return (
                    <div className={classes.progress}>
                        <CircularProgress/>
                    </div>
                );
        }
    }

    return (
        <div className={classes.mainDiv}>
            <TableContainer className={classes.tableDiv}>
                <div>
                    <h2>Banks</h2>
                    <div className={classes.opts}>
                        <FormControl className={classes.formControl}>
                            <InputLabel shrink id="label">City</InputLabel>
                            <Select
                                onChange={e => {
                                    setFilterQuery('');
                                    setCity(e.target.value as string);
                                }}
                                value={city}
                            >
                                <MenuItem value="ALWAR">Alwar</MenuItem>
                                <MenuItem value="JAIPUR">Jaipur</MenuItem>
                                <MenuItem value="MUMBAI">Mumbai</MenuItem>
                                <MenuItem value="DELHI">Delhi</MenuItem>
                                <MenuItem value="KOLKATA">Kolkata</MenuItem>
                            </Select>
                        </FormControl>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder={"Filter"}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                value={filterQuery}
                                onChange={e => setFilterQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                {
                    getContent()
                }
            </TableContainer>
            {
                requestStatus === REQUEST_STATUS.SUCCEED && (
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 30, 50, 100]}
                        component="div"
                        count={banks.length}
                        rowsPerPage={offset.rowsPerPage}
                        page={offset.currentPage}
                        onChangePage={(e, newPage) => dispatch({
                            type: ActionTypes.SET_OFFSET,
                            payload: {
                                ...offset,
                                currentPage: newPage,
                            }
                        })}
                        onChangeRowsPerPage={(e) => dispatch({
                            type: ActionTypes.SET_OFFSET,
                            payload: {
                                ...offset,
                                rowsPerPage: Number(e.target.value),
                            }
                        })}
                    />
                )
            }
        </div>
    );
}

export default Branches;
