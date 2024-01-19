import { StyleSheet } from "react-native";

const hoidong = StyleSheet.create({

    top: {
        height: '10%',
        marginVertical: '2%'
    },
    bottom: {
        height: '100%'
    },
    row: {
        flexDirection: "row",
        width: "100%",
        height: 'auto',
        // justifyContent: "space-around",
        borderRadius: 15,
        borderColor: color.green,
        borderWidth: 1,
        backgroundColor: color.lightgreen,
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
        shadowColor: 'black', // Màu sắc của bóng
        shadowOpacity: 0.7, // Độ sắc nét của bóng (0-1)
        shadowOffset: {
            width: 0,
            height: 2,
        }, // Khoảng cách dịch chuyển theo chiều ngang và chiều dọc
        shadowRadius: 6, // Bán kính của bóng
        elevation: 5, // Áp dụng bóng (chỉ áp dụng cho Android)
    },
    cell: {
        height: 'auto',
        padding: 10,
        textAlign: "left",
        fontSize: 16,
        color: color.green,
        width: '80%'
        // borderRightWidth: 2
    },
    text: {
        color: color.green, fontSize: 16
    },
    first: {
        // backgroundColor: "green",
        textAlign: "center",
        borderRightWidth: 1,
        borderRightColor: 'lightgray',
        marginLeft: 10,

    },
    edit: {
        textAlign: "center",
        padding: 10
    }
})
export default hoidong