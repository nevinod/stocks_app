import { Outlet } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import { Card, Divider, Metric } from "@tremor/react";
import styles from './Layout.module.css'

function PageLayout() {    
    return (
        <>
            <div className={styles.header}>
                <Metric className='ml-8'>STOCKS</Metric>
                <div className='flex flex-row items-center'>
                    <div className='mr-8' >
                        <UserButton showName={true} />
                    </div>
                </div>
            </div>
            <Divider className='mt-8' />

            <Outlet />
        </>
        
    )
}

export default PageLayout;