import { StyleSheet } from "react-native";

// css
const login = StyleSheet.create({
    top: {
        justifyContent: 'center',
        height: "45%",
        width: "100%",
    },
    bottom: {
        backgroundColor: "#ffff",
        height: "55%",
        width: "100%"
    },
    text_input: {
        marginTop: 30,
        marginLeft: 30
    },
    input: {
        height: 50,
        marginTop: 10,
        marginRight: 30,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: "#2d665f"
    },
    text: {
        color: "#2d665f"
    },
    button: {
        height: 45,
        marginTop: 10,
        marginRight: 30,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        textAlign: "center",
        backgroundColor: "#2d665f",
        color: "#ffff",
        fontWeight: "bold",
        borderColor: "#2d665f"

    },
    link: {
        flexDirection: 'row',
        width: "80%",
        justifyContent: "space-between",
        marginTop: 40
    },
    text_link: {
        textDecorationLine: 'underline',
        fontStyle: 'italic'
    },
    image: {
        marginLeft: -230,
        width: "130%",
        height: 300,
        opacity: 0.3
    }
});
export default login