import React, {useEffect, useState} from 'react';
import axios from 'axios'
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import {MenuItem} from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



const useStyles = makeStyles((theme: Theme) =>
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
      }
    }),
);

type AllCoinsType = {
  name: string,
  fullName: string,
  imgUrl: string,
  price: number,
  volume24: number
}

const App = () => {
  const classes = useStyles();
  const [allCoins, setAllCoins] = useState<Array<AllCoinsType>>([]);

  useEffect (()=> {
    axios.get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD')
        .then(({data}) => {
          const coins = data.Data.map((obj: any)=> {
            const coin = {
              name: obj.CoinInfo.Name,
              fullName: obj.CoinInfo.FullName,
              imgUrl: `https://cryptocompare.com/${obj.CoinInfo.ImageUrl}`,
              price: obj.RAW.USD.PRICE,
              volume24: parseInt(obj.RAW.USD.VOLUME24HOUR)
            }
            return coin
          })
          setAllCoins(coins)
          console.log(coins)
        })
  }, [])

  return (
      <Container className={classes.root} maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={8}>

            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left"></TableCell>
                    <TableCell>Full name</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Price</TableCell>
                    <TableCell align="left">Volume 24h</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allCoins.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          <img className={classes.imgCoin} src={row.imgUrl} />
                        </TableCell>
                        <TableCell align="left">{row.fullName}</TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">${row.price}</TableCell>
                        <TableCell align="left">{row.volume24}</TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <div className={classes.cryptoInputBox}>
                <FormControl className={classes.currencyInput}>
                  <TextField label="Currency"/>
                </FormControl>
                <FormControl className={classes.currencyType}>
                  <InputLabel id="demo-simple-select-label">
                    Currency
                  </InputLabel>
                  <Select
                      id="demo-simple-select-outlined"
                      value={10}
                      label="Age"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className={classes.cryptoInputBox}>
                <FormControl className={classes.currencyInput}>
                  <TextField label="Currency"/>
                </FormControl>
                <FormControl className={classes.currencyType}>
                  <InputLabel id="demo-simple-select-label" />
                  <Select
                      id="demo-simple-select-outlined"
                      value={10}
                      label="Age"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <Typography variant="h4" component="h2">
                70 dollars USA
              </Typography>
            </Paper>
          </Grid>

        </Grid>
      </Container>
  )
}

export default App;