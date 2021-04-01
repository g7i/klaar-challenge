import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Bank} from "../types/Types";
import {Link} from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {IconButton} from "@material-ui/core";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function DataTable({banks, offset}: { banks: Bank[], offset: number }) {
    const classes = useStyles();
    const [favs, setFavs] = useState<string[]>(JSON.parse(localStorage.getItem("favs") ?? "[]"));

    const toggleFavs = (ifsc: string): void => {
        if (favs.includes(ifsc))
            setFavs(prev => {
                const res: string[] = prev.filter(fav => fav !== ifsc);
                localStorage.setItem("favs", JSON.stringify(res));
                return res;
            })
        else {
            setFavs(prev => {
                const res: string[] = [...prev, ifsc];
                localStorage.setItem("favs", JSON.stringify(res));
                return res;
            })
        }
    }

    return (
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Sr. No.</TableCell>
                    <TableCell>IFSC</TableCell>
                    <TableCell>Branch</TableCell>
                    <TableCell>Bank Name</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell align="right">Favourite</TableCell>
                </TableRow>
            </TableHead>
            <TableBody id="tableData">
                {
                    banks.map((bank, index) => (
                        <TableRow key={bank.ifsc}>
                            <TableCell component="th" scope="row">
                                {index + offset + 1}
                            </TableCell>
                            <TableCell>
                                <Link to={`/${bank.ifsc}`}>
                                    {bank.ifsc}
                                </Link>
                            </TableCell>
                            <TableCell>{bank.branch}</TableCell>
                            <TableCell>{bank.bank_name}</TableCell>
                            <TableCell>{bank.city}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => toggleFavs(bank.ifsc)}>
                                    {
                                        favs.includes(bank.ifsc) ? (
                                            <FavoriteIcon style={{fill: "red"}}/>
                                        ) : (
                                            <FavoriteBorderIcon/>
                                        )
                                    }
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    );
}
