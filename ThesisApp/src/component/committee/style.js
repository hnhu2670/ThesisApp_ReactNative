import { Dimensions, StyleSheet } from "react-native";
import color from "../../assets/js/color";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const hoidong = StyleSheet.create({

    top: {
        height: '10%',
        marginVertical: '2%'
    },
    bottom: {
        height: '100%'
    },
    contain_top: {
        height: 'auto',
        marginBottom: '3%',
    },
    contain_bottom: {
        height: windowHeight * 0.7,
        marginVertical: '3%'
    },
    row: {
        flexDirection: 'row',
        width: windowWidth * 0.9,
        height: 'auto',
        borderWidth: 1,
        marginVertical: 10,
        // paddingHorizontal: '5%',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: color.green,
        backgroundColor: color.lightgreen,
        shadowColor: 'black',
        shadowOpacity: 0.7,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 6,
        elevation: 5,

    },
    first: {
        textAlign: "center",
        borderRightWidth: 1,
        borderRightColor: 'lightgray',
        marginLeft: 10,
        width: '15%',
        color: color.green,
        paddingVertical: 20,
        fontSize: 16

    },
    second: {
        width: '75%',
        padding: 10,
        fontSize: 15,
        color: color.green,
    },
    // listCom
    name: {
        width: '60%',
        marginLeft: '2%'
    },
    edit: {
        textAlign: "center",
        padding: 10,
        width: '15%'

    }
})
export default hoidong