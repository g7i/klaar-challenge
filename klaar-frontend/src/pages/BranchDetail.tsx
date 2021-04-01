import React, {useContext, useEffect, useState} from "react";
import {Card, CardContent, Typography} from "@material-ui/core";
import {Bank} from "../types/Types";
import {useHistory} from "react-router-dom";
import {useStyles} from "../styles/branchDetails";
import {BankContextState} from "../types/ContextTypes";
import {BankContext} from "../contexts/BankContext";

export default function BranchDetail({match}: any): JSX.Element {
    const classes = useStyles();
    const [bank, setBank] = useState<Bank | null>(null);
    const {banks} = useContext<BankContextState>(BankContext);
    const history = useHistory();

    useEffect(() => {
        const {params: {branchID}} = match;
        const bankData = banks.find(b => b.ifsc === branchID);
        if (bankData) setBank(bankData);
        else history.push("/");
    }, [banks, history, match]);

    return (
        <div style={{marginTop: "100px", padding: "10px 150px"}}>
            <Typography variant="h3" component="h3">
                Bank Details
            </Typography>
            <Card className={classes.card} variant="outlined">
                {
                    bank != null && (
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {bank.branch}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {bank.city}
                            </Typography>
                            <Typography variant="body2" component="span">
                                IFSC :&nbsp;
                            </Typography>
                            <Typography variant="body2" component="span" color="textSecondary">
                                {bank.ifsc}
                            </Typography>
                            <br/>
                            <Typography variant="body2" component="span">
                                Bank ID :&nbsp;
                            </Typography>
                            <Typography variant="body2" component="span" color="textSecondary">
                                {bank.bank_id}
                            </Typography>
                            <br/>
                            <Typography variant="body2" component="span">
                                Bank Name:&nbsp;
                            </Typography>
                            <Typography variant="body2" component="span" color="textSecondary">
                                {bank.bank_name}
                            </Typography>
                            <br/>
                            <br/>

                            <Typography variant="body1" component="h6">
                                Address
                            </Typography>
                            <Typography variant="body2" component="span" color="textSecondary">
                                {bank.address}
                            </Typography>
                            <br/>
                            <Typography variant="body2" component="span">
                                District :&nbsp;
                            </Typography>
                            <Typography variant="body2" component="span" color="textSecondary">
                                {bank.district}
                            </Typography>
                            <br/>
                            <Typography variant="body2" component="span">
                                State :&nbsp;
                            </Typography>
                            <Typography variant="body2" component="span" color="textSecondary">
                                {bank.state}
                            </Typography>
                        </CardContent>
                    )
                }
            </Card>
        </div>
    );
}
