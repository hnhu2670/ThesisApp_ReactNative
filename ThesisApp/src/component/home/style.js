import { Dimensions, StyleSheet } from "react-native";
import color from "../../assets/js/color";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const home = StyleSheet.create({
    top: {
        height: "15%",
        width: "100%",
        marginBottom: "5%",
        textAlign: "center",
        backgroundColor: "#2d665f",
        justifyContent: "center"

    },
    header: {
        color: "#fff",
        fontSize: 25
    },
    bottom: {
        position: "relative",

    },
    item: {
        width: "90%",
        backgroundColor: "#2d665f",
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        height: 100,
        borderRadius: 20

    },
    text: {
        paddingTop: 15,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 15,
        color: "#ffff"
    },

    // chỉnh icon các chức năng chi tiết *
    title: {
        fontSize: 16,
        color: 'white',
        marginBottom: 10,
        marginTop: 15,
        marginLeft: 20,
        // paddingLeft: '10%',
        paddingVertical: '3%',
        backgroundColor: color.green,
        borderRadius: 50,
        width: '60%',
        textAlign: 'center'
    },
    items: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    thumb: {
        width: '27%',
        paddingVertical: 20,
        marginHorizontal: '3%',

    },
    icon: {
        textAlign: 'center',
        marginBottom: 10,

    },
    infor: {
        textAlign: 'center',
        color: 'black'
    }



})
export default home