import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(10),
            backgroundColor: '#D2B48C'
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            backgroundColor: '#F5DEB3'
        },
        cryptoInputBox: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',

        },
        currencyInput: {
            minWidth: "calc(70% - 10px)",
        },
        currencyType: {
            minWidth: "30%",
        },
        table: {
            minWidth: 650,
            backgroundColor: '#F5DEB3'
        },
        imgCoin: {
            width: '30px',
            height: '30px',
            borderRadius: 30
        },
         greenPrice : {
             backgroundColor: '#98FB98'
         },
        redPrice: {
            backgroundColor: '#CD5C5C'
        }

    }),
);