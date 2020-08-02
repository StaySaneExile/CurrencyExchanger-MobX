import React, {ChangeEvent, FC} from 'react'
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import {MenuItem} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {inject, observer} from "mobx-react";
import CurrenciesStore from "../stores/currenciesStore";
import ConverterStore from "../stores/converterStore";


type ConverterType = {
    classes: any,
    currenciesStore?: CurrenciesStore
    converterStore?: ConverterStore
}
type StateReducerType = {
    value1: any,
    value2: any,
    inPrice: any,
    outPrice: number
}
type SetValue1Action = {
    type: string;
    payload: string
}


const reducer = (state: StateReducerType, action: any): StateReducerType => {
    switch (action.type) {

        case 'SET_VALUE':
            return {
                ...state,
                [action.payload.name]: action.payload.value,
                value2: String(Number(action.payload.value) * state.inPrice / state.outPrice)
            }
        case 'SET_PRICES':
            return {
                ...state,
                inPrice: action.payload.in,
                outPrice: action.payload.out,
            }
        default:
            return state
    }

}


const Converter: FC<ConverterType> = inject('currenciesStore', 'converterStore')(
    observer(({classes, currenciesStore, converterStore}) => {

            const coins: Array<string> = currenciesStore!.getItems.map(coin => coin.name)
        
            const [selectedCoin, setSelectedCoin] = React.useState('USD');
            const inPrice = Number(converterStore?.getSelectedCoin.price) || 0
            const outPrice = Number(currenciesStore!.getItems.find(obj => obj.name === selectedCoin)?.price) || 0


            const [state, dispatch] = React.useReducer(reducer, {
                value1: '',
                value2: '',
                inPrice,
                outPrice,
            });
            React.useEffect(() => {
                dispatch({
                    type: 'SET_PRICES',
                    payload: {
                        in: inPrice,
                        out: outPrice
                    }
                })
            }, [inPrice, outPrice])


            const onChangeUpdateField = (name: string, value: string) => {
                dispatch({
                    type: 'SET_VALUE',
                    payload: {
                        name,
                        value
                    }
                })
            }

            return (
                <Paper className={classes.paper}>
                    <div className={classes.cryptoInputBox}>
                        <FormControl className={classes.currencyInput}>
                            <TextField value={state.value1}
                                       onChange={(e: any) => onChangeUpdateField('value1', e.target.value)} label="value"/>
                        </FormControl>
                        <FormControl className={classes.currencyType}>
                            <InputLabel id="demo-simple-select-label">
                                Currency
                            </InputLabel>
                            <Select value={converterStore?.getSelectedCoin.name || ''}>
                                {
                                    coins.map(name => <MenuItem value={name}>{name}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div className={classes.cryptoInputBox}>
                        <FormControl className={classes.currencyInput}>
                            <TextField value={state.value2} label="value"/>
                        </FormControl>
                        <FormControl className={classes.currencyType}>
                            <InputLabel id="demo-simple-select-label">
                                Currency
                            </InputLabel>
                            <Select onChange={(e: any) => setSelectedCoin(e.target.value)} value={selectedCoin}>
                                <MenuItem value='USD'>USD</MenuItem>
                                {
                                    coins.map(name => <MenuItem value={name}>{name}</MenuItem>)
                                }
                            </Select>
                        </FormControl>
                    </div>
                </Paper>
            )
        }
    )
)

export default Converter;