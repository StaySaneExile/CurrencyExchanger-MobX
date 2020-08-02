import {action, computed, observable} from "mobx";
import {AllCoinsType} from "../types/types";



export type SelectedCoinType = {
    name: string,
    price: number
}

class ConverterStore {

    @observable private selectedCoin: SelectedCoinType = {
        name: 'string',
        price: 0
    }

    @computed
    get getSelectedCoin() {
        return this.selectedCoin;
    }

    @action
    setSelectedCoin(coin: AllCoinsType) {
         this.selectedCoin = {
            name: coin.name,
            price: coin.price
        }
    }



}

export default ConverterStore