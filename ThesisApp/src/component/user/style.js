import { Dimensions, StyleSheet } from "react-native";
import color from "../../assets/js/color";
const windowHeight = Dimensions.get('window').height;

const profile = StyleSheet.create({
    container: {
        borderRadius: 20,
        width: 200,
        height: 200,
        borderColor: "green",
        borderWidth: 2,
        marginTop: 20
    },
    name: {
        marginBottom: 25
    },
    item: {
        backgroundColor: color.lightgreen,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 10,
        width: "90%",
        height: 70,
        borderColor: '#d0eacef5',
        borderWidth: 2,
        alignItems: "center",
        paddingLeft: 20,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    link: {
        fontSize: 16,
        width: "85%"
    },
    icon: {
        width: "12%",
        marginRight: 10,
        textAlign: "right",
    },
    content: {
        fontSize: 20,

    },
    text: {
        textAlign: "center",
        fontSize: 15,
        color: "gray",
        marginBottom: 20,
        marginTop: 20
    },
    camera: {
        backgroundColor: "lightgray",
        width: 50,
        height: 50,
        borderRadius: 50,
        borderColor: "#2d665f",
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
    }

});
export default profile;