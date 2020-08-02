import React, {FC, useEffect} from 'react'
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import {AllCoinsType, TCoinDiff} from "../types/types";
import {inject, observer} from "mobx-react";
import CurrenciesStore from "../stores/currenciesStore";
import ConverterStore from "../stores/converterStore";


type CryptoTableType = {
    classes: any,
    currenciesStore?: CurrenciesStore
    converterStore?: ConverterStore
}


const CryptoTable = inject('currenciesStore', 'converterStore')(
    observer(({classes, currenciesStore, converterStore}: CryptoTableType) => {

            const items: Array<AllCoinsType> = currenciesStore!.getItems
            const diffObj: TCoinDiff = currenciesStore!.getDiffObj

            React.useEffect(() => {
                if (currenciesStore) {
                    currenciesStore.getCoins();
                    /*setInterval(()=> {
                        currenciesStore.getCoins();
                    }, 30 * 1000)*/
                }
            }, [])


            const onClickSelectedCoin = (coin: AllCoinsType) => {
                if(converterStore) {
                    converterStore.setSelectedCoin(coin);
                }
            }


            return (
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
                            {items.map((row) => (
                                <TableRow onClick={()=> onClickSelectedCoin(row)} hover key={row.name}>
                                    <TableCell component="th" scope="row">
                                        <img className={classes.imgCoin} src={row.imgUrl}/>
                                    </TableCell>
                                    <TableCell align="left">{row.fullName}</TableCell>
                                    <TableCell align="left">{row.name}</TableCell>


                                    <TableCell
                                        className={diffObj[row.name] && classes[`${diffObj[row.name]}Price`]}
                                        align="left">${row.price}</TableCell>


                                    <TableCell align="left">{row.volume24}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        }
    )
)
export default CryptoTable;