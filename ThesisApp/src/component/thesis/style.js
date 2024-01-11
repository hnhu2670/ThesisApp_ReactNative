import { StyleSheet } from "react-native";
import color from "../../assets/js/color";

const thesis = StyleSheet.create({
    container: {
        // padding: 16
        borderWidth: 1,
        borderColor: 'lightgray',
        marginVertical: '10%',
        marginHorizontal: 15,
        paddingVertical: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 1,
    },
    contain: {
        height: '100%',
        flexDirection: 'column',
        // backgroundColor: "lightblue",
        alignItems: 'center',
        // marginTop: '10%',

    },
    dropdown: {
        // marginTop: 10,
        marginRight: 30,
        height: 70,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'white',
        shadowColor: '#000',
        marginTop: 8,
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    textSelectedStyle: {
        marginRight: 5,
        fontSize: 16,
    },
    banner: {
        width: "100%",
        height: "100%"
    },
    text_input: {
        marginTop: 10,
        marginLeft: 30,
        // width: "%"
    },
    select: {
        width: '90%',
        backgroundColor: "red"
    },
    items: { justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
    list: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: color.lightgreen,
        paddingVertical: 10
    },
    tile: {
        fontSize: 17
    },
    mini_icon: {
        width: 60,
        height: 60,
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginRight: '5%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }

});
export default thesis