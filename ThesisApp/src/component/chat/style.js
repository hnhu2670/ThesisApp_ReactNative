import { Dimensions, StyleSheet } from "react-native";
import color from "../../assets/js/color";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const mess = StyleSheet.create({
    container: {
        marginVertical: 20,
        height: windowHeight * 0.60,
        marginBottomBottom: windowHeight * 0.05
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray'
    },
    formImage: {
        width: '25%'
    },
    image: {
        width: 65,
        height: 65,
        // backgroundColor: 'lightblue',
        borderRadius: 33,
        borderWidth: 1,
        borderColor: color.green
    },
    userName: {
        fontSize: 17,
        marginBottom: 5
    },
    fullName: {
        fontSize: 14,
        color: 'gray',
        fontStyle: 'italic'

    },
    // chatbox
    banner: {
        // backgroundColor: color.green,
        // height: windowHeight * 0.15,
        // paddingTop: '10%',
        // flexDirection: 'row',
        // alignItems: 'center',
        // paddingLeft: 20
        paddingVertical: '13%',
        paddingHorizontal: '5%',
        backgroundColor: color.green,
        height: windowHeight * 0.25,
    },
    nameApp: {
        color: 'white',
        fontSize: 35,
        textAlign: 'right',
    },
    title: {
        color: 'white',
        fontSize: 30,
        marginTop: 30,
        marginHorizontal: 10,
        fontSize: 30
    },
    // chat
    textInput: {
        // backgroundColor: color.background,
        borderRadius: 20,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 20,
        marginTop: 20,


    }
})
export default mess