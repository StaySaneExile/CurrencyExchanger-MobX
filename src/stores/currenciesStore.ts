import {action, computed, observable} from "mobx";
import {AllCoinsType, TCoinDiff} from "../types/types";
import axios from "axios";


class CurrenciesStore {
    @observable private items: Array<AllCoinsType> = []
    @observable private diffObj: TCoinDiff = {}

    @computed
    get getItems() {
        return this.items;
    }

    @computed
    get getDiffObj() {
        return this.diffObj;
    }

    @action
    setItems = (items: Array<AllCoinsType>): void => {
        this.diffObj = this.diffCurrencies(this.items, items).reduce(
            (initObj: TCoinDiff, obj: AllCoinsType) => {
                const newObj = items.find(o => o.name === obj.name)!;
                const oldObj:AllCoinsType = this.items.find(itemObj => itemObj.name === newObj.name)!;
                const color: string = newObj.price === oldObj.price ? '' : newObj.price > oldObj.price ? 'green' : 'red';

                initObj[newObj.name] = color;

                return initObj
            },
            {}
            )
        this.items = items;
    };

    @action
    getCoins = () => {
        axios.get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD')
            .then(({data}) => {
                const coins = data.Data.map((obj: any) => {
                    const coin = {
                        name: obj.CoinInfo.Name,
                        fullName: obj.CoinInfo.FullName,
                        imgUrl: `https://cryptocompare.com/${obj.CoinInfo.ImageUrl}`,
                        price: obj.RAW.USD.PRICE,
                        volume24: parseInt(obj.RAW.USD.VOLUME24HOUR)
                    }
                    return coin
                })
                this.setItems(coins)
            })
    }

    diffCurrencies(arr1: Array<AllCoinsType>, arr2: Array<AllCoinsType>) {
        return arr1.filter((obj, index) => {
            if (obj.price !== arr2[index].price) {
                return true
            }
            return false
        })
    }
}


export default CurrenciesStore