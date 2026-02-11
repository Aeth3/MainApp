import { useEffect, useState } from "react";
import config from "../config.json";
import { getCats } from "../models/HomeModel";
import DynamicRenderer from "../../../components/DynamicRenderer";
import { faBell, faHome, faMessage, faSearch, faUser, faUsers, faVideo } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { iconMap } from "../../../assets/icons/iconMap";

import SwipeRenderer from "../../../components/SwipeRenderer";
import { useTheme } from "../../../theme/Theme";
import { useGlobal } from "../../../context/context";
import { useActionHandlers } from "../../../global/actionHandlers";

const secondaryIconsMap = {
    faHome,
    faUsers,
    faVideo,
    faUser,
    faBell,
};


export const useHomeController = () => {
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation()
    const colors = useTheme()
    const { setCurrentPage, currentPage } = useGlobal()
    const actionHandlers = useActionHandlers()

    useEffect(() => {
        const fetchCats = async () => {
            setLoading(true);
            try {
                const data = await getCats();
                setCats(data);
            } catch (error) {
                console.error("Error fetching cats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCats();
    }, []);

    const handleProfilePress = () => {
        setCurrentPage(5)
    }

    // Wrap DynamicRenderer for FlatList
    const renderItem = ({ item }) => (
        <DynamicRenderer
            item={item}
            config={{
                title: config.title,
                icons: config.icons,
                secondaryIcons: config.secondaryIcons,
                profilePicture: config.profilePicture,
                stories: config.stories,
                posts: config.posts,
                handleProfilePress,
                pages: config.pages,
                config,
                colors: colors.colors,
                isPrimaryVisible: currentPage !== 1
            }}
            iconMap={iconMap}
            secondaryIconsMap={secondaryIconsMap}
            actionHandlers={actionHandlers}
        />
    );
    const renderSwipePages = () => (
        <SwipeRenderer
            pages={config.pages}
            config={config}
            iconMap={iconMap}
        />
    );
    return {
        cats,
        loading,
        sections: config.sections,
        renderItem,
        renderSwipePages,
        paddingBottom: config.homeContainerStyles?.paddingBottom || 0,
    };
};
