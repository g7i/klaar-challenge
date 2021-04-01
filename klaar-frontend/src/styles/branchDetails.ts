import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => createStyles({
    card: {
        width: '80%',
        margin: "auto",
        marginTop: "15vh"
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    progress: {
        display: "flex",
        height: "40vh",
        justifyContent: "center",
        alignItems: "center"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4, 4, 3),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '30vw',
        height: '30vh',
    },
}));
