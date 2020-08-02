import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CryptoTable from "./components/cryptoTable";
import Converter from "./components/converter";
import {useStyles} from "./styles/styles";


const App = () => {

    const classes = useStyles();

    return (
        <Container className={classes.root} maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <CryptoTable classes={classes}/>
                </Grid>
                <Grid item xs={4}>
                    <Converter classes={classes}/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default App;