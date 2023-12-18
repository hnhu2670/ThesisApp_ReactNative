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
        typeIcon: "AntDesign",
        activeSize: 25,
        unactiveSize: 15,
    },
    {
        id: 2,
        route: Thesis,
        name: 'Khóa luận',
        activeIconName: 'book',
        typeIcon: "AntDesign",
        activeSize: 25,
        unactiveSize: 15,
    },
    {
        id: 3,
        route: Committee,
        name: 'Hội đồng',
        activeIconName: 'users',
        typeIcon: "Entypo",
        activeSize: 25,
        unactiveSize: 15,
    },
    {
        id: 4,
        route: Criteria,
        name: 'Điểm',
        activeIconName: 'star',
        typeIcon: "AntDesign",
        activeSize: 25,
        unactiveSize: 15,
    }
];