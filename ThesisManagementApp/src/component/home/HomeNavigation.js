import Committee from "../committee/Committee";
import Criteria from "../criteria/Criteria";
import Thesis from "../thesis/Thesis";
import Home from "./Home";


export const HomeNavigation = [
    {
        id: 2,
        route: Home,
        name: 'Trang chủ',
        activeIconName: 'home',
        // activeiconType: 'Entypo',
        // inactiveIconName: 'home-outline',
        // inactiveIconType: 'MaterialCommunityIcons',
        size: 25,
        unFocusSize: 28,
    },
    {
        id: 2,
        route: Thesis,
        name: 'Khóa luận',
        activeIconName: 'home',
        // activeiconType: 'Entypo',
        // inactiveIconName: 'home-outline',
        // inactiveIconType: 'MaterialCommunityIcons',
        size: 25,
        unFocusSize: 28,
    },
    {
        id: 3,
        route: Committee,
        name: 'Hội đồng',
        activeIconName: 'youtube-tv',
        // activeiconType: 'MaterialCommunityIcons',
        // inactiveIconName: 'television-play',
        // inactiveIconType: 'MaterialCommunityIcons',
        size: 25,
        unFocusSize: 25,
    },
    {
        id: 4,
        route: Criteria,
        name: 'Tiêu chí chấm điểm',
        activeIconName: 'people-sharp',
        // activeiconType: 'Ionicons',
        // inactiveIconName: 'people-outline',
        // inactiveIconType: 'Ionicons',
        size: 25,
        unFocusSize: 25,
    }
];