import useSWR from 'swr';
import { Card, List, Title } from "@tremor/react";
import fetcher from '../../api/fetcher';
import SidebarItem from './SidebarItem';
import AddFavorite from './AddFavorite';
import { FavoriteType } from '../../types/DashboardTypes';


interface SidebarProps {
    user: string | undefined;
}

function Sidebar({ user }: SidebarProps) {    
    const { data, mutate } = useSWR(
        `${import.meta.env.VITE_DATABASE_URL}/favorites`, 
        fetcher
    )

    const favorites = data 
        ? data.filter((favorite: FavoriteType) => favorite.user === user)
        : [];
    
    return (
        <Card className="max-w-xs fixed h-full left-0">
            <Title>Favorites</Title>
            <List>
                {favorites && favorites.map((favorite: FavoriteType) => (
                    <SidebarItem key={favorite.ticker} ticker={favorite.ticker} />
                ))}
                <AddFavorite user={user} mutate={mutate} favorites={favorites} />
            </List>
        </Card>
    )
}

export default Sidebar;