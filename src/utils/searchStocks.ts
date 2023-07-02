import axios from 'axios';
import { StockType } from '../types/DashboardTypes';

function findStocks(stocks: StockType[], key: string) {
    const results: StockType[] = [];

    stocks.every(stock => {
        if(key.toLowerCase() === stock.Symbol.toLowerCase()) {
            results.unshift(stock);
        } else if(key.toLowerCase() === stock.Symbol.toLowerCase().substring(0, key.length)) {
            results.push(stock)
        }
        return true;
    })

    return results.slice(0, 4);
}

export async function search(key: string) {
    if(!key) return [];

    try {
        const response = await axios.get(import.meta.env.VITE_DATABASE_COMPANIES_URL)
        return findStocks(response.data, key)
    } catch (error) {
        alert(error)
        return []
    }
}