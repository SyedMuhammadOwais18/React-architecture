import React from "react";
import Alert from "@material-ui/lab/Alert"
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    message : {
        fontSize:'20px !important'
    },
    icon:{
        paddingTop:'11px',
        paddingBottom:'10px',
        paddingLeft:'0px',
        paddingRight:'0px'
    }
}))
export default CustomAlert = ({ severity, message }) => {

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Alert severity={severity} classes={{icon:classes.icon}}>
                <Typography className={classes.message}>
                    {message}
                </Typography>
            </Alert>

        </div>
    )

}