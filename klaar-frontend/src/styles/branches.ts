import {createStyles, fade, makeStyles, Theme} from "@material-ui/core/styles";

export const useBranchStyles = makeStyles((theme: Theme) => createStyles({
    mainDiv: {
        marginBottom: '10vh',
        padding: '50px 10vw',
    },
    opts: {
        display: "flex",
        justifyContent: "space-around",
    },
    tableDiv: {
        textAlign: 'center',
        marginTop: '5vh'
    },
    title: {
        display: "inline-block"
    },
    search: {
        height: '33px',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
        border: '1px solid black',
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 2, 2, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 150,
            '&:focus': {
                width: 200,
            },
        },
    },
    progress: {
        display: "flex",
        height: "60vh",
        justifyContent: "center",
        alignItems: "center"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));
