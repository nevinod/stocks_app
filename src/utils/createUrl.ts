import { 
    format, 
    isWeekend, 
    previousFriday,
    subDays 
} from 'date-fns';

export function urlRangeFromToday( ticker: string, days: number) {
    let endDate = new Date();
    if(isWeekend(endDate)) {
        endDate = previousFriday(endDate);
    }
    const formattedEndDate = format(endDate, 'yyyy-MM-dd');
    const startDate = format(subDays(new Date(), days), 'yyyy-MM-dd');
    return `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${startDate}/${formattedEndDate}?adjusted=true&sort=asc&limit=120&apiKey=${import.meta.env.VITE_POLYGON_API_KEY}`
}

export function urlTodayOpenClose( ticker: string ) {
    let today = new Date();
    if(isWeekend(today)) {
        today = previousFriday(today);
    }
    const formattedDate = format(today, 'yyyy-MM-dd')
    return `https://api.polygon.io/v1/open-close/${ticker}/${formattedDate}?adjusted=true&apiKey=${import.meta.env.VITE_POLYGON_API_KEY}`
}

export function urlGainersLosers( gainers: boolean) {
    let type = gainers ? "gainers" : "losers";
    return `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/${type}?apiKey=${import.meta.env.VITE_POLYGON_API_KEY}`
}