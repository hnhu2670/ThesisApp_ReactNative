import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const list_thesis = StyleSheet.create({

    top: {
        height: 'auto',
        marginBottom: '3%'
    },
    bottom: {
        height: windowHeight * 0.75,
        marginVertical: '3%'
    },
    row: {
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    right: {
        flexDirection: "row",
        width: windowWidth * 0.8,
        height: 'auto',
        borderWidth: 1,
        borderColor: '#d0eacef5',
        // backgroundColor: '#e1eee0e8',
        backgroundColor: '#dde8dcfc',
        padding: 20,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    left: {
        width: windowWidth * 0.1,
        height: 80,
        marginRight: -15,
        position: 'relative',
        zIndex: 99
    },
    text: {
        height: 40,
        width: 40,
        borderRadius: 50,
        backgroundColor: "#2d665f",
        color: "#FFFF",
        textAlign: "center",
        textAlignVertical: "center",
        padding: 10,

    },
    name: {
        width: "90%",
        height: 'auto',
        color: "#2d665f",
        // color: "black",
        fontSize: 16
    },
    edit: {
        textAlign: "right",
        justifyContent: "center",
    },
    lazy: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: 'transparent'
    }
})
export default list_thesis