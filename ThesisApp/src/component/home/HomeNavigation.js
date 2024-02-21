import HomeChat from "../chat/HomeChat";
import Profile from "../user/Profile";
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
        route: HomeChat,
        name: 'Tin nhắn',
        activeIconName: 'wechat',
        typeIcon: "AntDesign",
        activeSize: 25,
        unactiveSize: 15,
    },
    {
        id: 3,
        route: Profile,
        name: 'Thông tin cá nhân',
        activeIconName: 'edit',
        typeIcon: "AntDesign",
        activeSize: 25,
        unactiveSize: 15,
    },

];