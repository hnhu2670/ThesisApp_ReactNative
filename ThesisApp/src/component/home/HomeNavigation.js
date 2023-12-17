import Committee from "../committee/Committee";
import Criteria from "../criteria/Criteria";
// import Criteria from "../criteria/Criteria";
import Thesis from "../thesis/Thesis";
import Home from "./Home";


export const HomeNavigation = [
    {
        id: 1,
        route: Home,
        name: 'Trang chủ',
        activeIconName: 'home',
        size: 25,
        unFocusSize: 28,
    },
    {
        id: 2,
        route: Thesis,
        name: 'Khóa luận',
        activeIconName: 'home',
        size: 25,
        unFocusSize: 28,
    },
    {
        id: 3,
        route: Committee,
        name: 'Hội đồng',
        activeIconName: 'youtube-tv',
        size: 25,
        unFocusSize: 25,
    },
    {
        id: 4,
        route: Criteria,
        name: 'Tiêu chí chấm điểm',
        activeIconName: 'people-sharp',
        size: 25,
        unFocusSize: 25,
    }
];