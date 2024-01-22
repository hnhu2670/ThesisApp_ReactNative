import Chat from "../chat/Chat";
import Committee from "../committee/Committee";
import Criteria from "../criteria/Criteria";
import ConfirmMessage from "../layout/ConfirmMessage";
import ModalConfirm from "../layout/ModalConfirm";
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
        route: Chat,
        name: 'Chat',
        activeIconName: 'wechat',
        typeIcon: "AntDesign",
        activeSize: 25,
        unactiveSize: 15,
    },
    {
        id: 3,
        route: ConfirmMessage,
        name: 'Confirm',
        activeIconName: 'wechat',
        typeIcon: "AntDesign",
        activeSize: 25,
        unactiveSize: 15,
    }
];