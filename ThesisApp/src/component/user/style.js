import { Dimensions, StyleSheet } from "react-native";
import color from "../../assets/js/color";
const windowHeight = Dimensions.get('window').height;

const profile = StyleSheet.create({
    container: {
        borderRadius: 20,
        width: 200,
        height: 200,
        borderColor: "white",
        borderWidth: 2,
        marginTop: 20
    },
    name: {
        marginBottom: 25
    },
    item: {
        // backgroundColor: 'lightgray',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 10,
        width: "90%",
        height: 70,
        borderColor: color.green,
        borderWidth: 2,
        alignItems: "center",
        paddingLeft: 10,
        marginBottom: 10,
        borderRadius: 10
    },
    link: {
        fontSize: 16,
        width: "75%"
    },
    icon: {
        width: "10%",
        textAlign: "center",
    },
    content: {
        fontSize: 20,

    },
    text: {
        textAlign: "center",
        fontSize: 15,
        color: "white",
        marginBottom: 20,
        marginTop: 20
    },
    camera: {
        backgroundColor: "lightgray",
        width: 50,
        height: 50,
        borderRadius: 50,
        borderColor: "white",
        borderWidth: 2,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: -10,
        right: -20

    },
    // change pass
    topChange: {
        height: windowHeight * 0.35,
        backgroundColor: color.green
    },
    bottomChange: {
        backgroundColor: "#ffff",
        height: windowHeight * 0.55,
        width: "100%",
    },
    tile: {
        fontSize: 30,
        textAlign: 'center',
        paddingVertical: 30,
        justifyContent: 'center'
    },
    // profile
    top: {
        height: windowHeight * 0.55,
        paddingVertical: windowHeight * 0.05,
        backgroundColor: color.green
    },
    bottom: {
        height: windowHeight * 0.45,
        paddingVertical: windowHeight * 0.05,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    // update
    scroll: {
        height: windowHeight * 0.75,

    },
    text_input: {
        textAlign: 'center',
        marginVertical: 10
    },
    input: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: 'gray',
        padding: 10
    }


});
export default profile;