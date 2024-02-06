import Chat from "../chat/Chat";
import HomeChat from "../chat/HomeChat";
import Committee from "../committee/Committee";
import Criteria from "../criteria/Criteria";
import CreateFile from "../file_pdf/CreateFile";
import ConfirmMessage from "../layout/ConfirmMessage";
import ModalConfirm from "../layout/ModalConfirm";
// import Criteria from "../criteria/Criteria";
import Thesis from "../thesis/Thesis";
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
    // {
    //     id: 2,
    //     route: Thesis,
    //     name: 'Khóa luận',
    //     activeIconName: 'book',
    //     typeIcon: "AntDesign",
    //     activeSize: 25,
    //     unactiveSize: 15,
    // },
    // {
    //     id: 3,
    //     route: Committee,
    //     name: 'Hội đồng',
    //     activeIconName: 'users',
    //     typeIcon: "Entypo",
    //     activeSize: 25,
    //     unactiveSize: 15,
    // },
    // {
    //     id: 2,
    //     route: Criteria,
    //     name: 'Điểm',
    //     activeIconName: 'star',
    //     typeIcon: "AntDesign",
    //     activeSize: 25,
    //     unactiveSize: 15,
    // },
    {
        id: 2,
        route: HomeChat,
        name: 'Chat',
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
    {
        id: 4,
        route: CreateFile,
        name: 'PDF',
        activeIconName: 'edit',
        typeIcon: "AntDesign",
        activeSize: 25,
        unactiveSize: 15,
    }
];