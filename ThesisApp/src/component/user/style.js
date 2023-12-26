import { StyleSheet } from "react-native";

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
        marginTop: 10,
        marginLeft: 20,
        marginRight: 10,
        width: "90%",
        height: 70,
        borderColor: "white",
        borderWidth: 2,
        alignItems: "center",
        paddingLeft: 20,

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

    }
});
export default profile;