import useSWR from 'swr';
import fetcher from '../../api/fetcher';
import { urlTodayOpenClose } from '../../utils/createUrl';
import { BadgeDelta, ListItem } from "@tremor/react";

interface AlternateItemProps {
    ticker: string;
    message: string;
}

function AlternateItem({ ticker, message }: AlternateItemProps) {
    return (
        <ListItem>
            <span>{ticker}</span>
            <span>{message}</span>
        </ListItem>
    )
} 


interface SidebarItemProps {
    ticker: string;
}

function SidebarItem({ ticker }: SidebarItemProps) {
    const url = urlTodayOpenClose(ticker);
    const { data, error, isLoading } = useSWR(url, fetcher);

    if(isLoading) return <AlternateItem ticker={ticker} message={"Loading..."} />;

    if(error) return <AlternateItem ticker={ticker} message={"Error"} />;

    const change = ((data.close - data.open) / data.open) * 100;

    return (
        <ListItem key={ticker}>
            <span>{ticker}</span>
            <div>
                <span className='mr-2'>{data.close}</span>
                <BadgeDelta 
                    size="md"
                    deltaType={change > 0 ? "increase" : "decrease"}
                >
                    {+change.toFixed(2)}%
                </BadgeDelta>
            </div>
            
        </ListItem>
    )
}

export default SidebarItem;

