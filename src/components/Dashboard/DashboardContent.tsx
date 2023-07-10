import useSWR from 'swr';
import fetcher from '../../api/fetcher';
import { urlGainersLosers } from '../../utils/createUrl';
import { BadgeDelta, Card, Flex, Metric, Text } from '@tremor/react';
import styles from './Dashboard.module.css';

interface GainersLosersRowProps {
    header: string;
    response: any;
}

interface ContentCardProps {
    ticker: string;
    todaysChangePerc: number;
    close: number;
}

function ContentCard({ ticker, todaysChangePerc, close}: ContentCardProps) {
    return (
        <Card key={ticker} style={{margin: '12px'}}>
            <BadgeDelta 
                className='mb-4'
                deltaType={todaysChangePerc > 0 ? "increase" : "decrease"}
            >
                {+todaysChangePerc.toFixed(2)}%
            </BadgeDelta>
            <div className="truncate">
              <Text>{ticker}</Text>
              <Metric className="truncate">{close}</Metric>
            </div>
        </Card>
    )
}

function GainersLosersRow({ header, response }: GainersLosersRowProps) {
    return (
        <Flex 
            className={styles.contentContainer}
            style={{marginTop: header === "Losers" ? '40px' : '0'}}
        >
            <Metric className='fixed'>{header}</Metric>
            <Flex className={styles.gainersContainer}>
                {response && response?.data?.tickers.map((gainer: any) => 
                    <ContentCard
                        key={gainer.ticker}
                        ticker={gainer.ticker}
                        todaysChangePerc={gainer.todaysChangePerc}
                        close={gainer.day.c}
                    />
                )}
            </Flex>
        </Flex>
    )
}

function DashboardContent() {
    const gainersUrl = urlGainersLosers(true);
    const losersUrl = urlGainersLosers(false);

    const gainersResponse = useSWR(gainersUrl, fetcher);
    const losersResponse = useSWR(losersUrl, fetcher);

    return (
        <div className={styles.container}>
            <GainersLosersRow header="Gainers" response={gainersResponse} />
            <GainersLosersRow header="Losers" response={losersResponse} />
        </div>
    )
}

export default DashboardContent;