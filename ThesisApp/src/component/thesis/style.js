import { Dimensions, StyleSheet } from "react-native";
import color from "../../assets/js/color";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const thesis = StyleSheet.create({
    top: {
        height: windowHeight * 0.22,
        width: windowWidth,
        // backgroundColor: 'red',
        marginBottom: '5%'
    },
    bottom: {
        height: windowHeight * 0.65,
        backgroundColor: color.background,
    },
    img: {
        position: 'absolute',
        width: 160,
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: color.lightgreen,
        // backgroundColor: 'red',
        // padding: 20,
        marginVertical: '2%',
        marginHorizontal: '28%'
    },
    image: {
        width: 140,
        height: 140,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputName: {
        height: 'auto',
        width: windowWidth * 0.9,
        marginHorizontal: 20,
        textAlign: 'center',
        paddingVertical: 10,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        color: color.green
    },
    container: {

        marginVertical: '10%',
        // marginRight: windowWidth * 0.1,
        // marginLeft: windowWidth * 0.1,
        marginHorizontal: 15,
        paddingVertical: 20,
    },
    contain: {
        height: windowHeight,
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
        width: windowWidth,
        height: windowHeight
    },
    text_input: {
        marginTop: 10,
        marginLeft: 30,
    },
    select: {
        width: windowWidth * 0.9,
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
        marginRight: windowWidth * 0.05,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    // detailThesis
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: 'gray',
        borderRadius: 10,
        marginVertical: 10,
        height: 'auto'

    },
    fcol: {
        width: '50%',
        // marginRight: 20,
        borderRightWidth: 1.5,
        borderRightColor: 'gray',
        paddingHorizontal: 15,
        paddingTop: 20,
        alignItems: 'center',
        backgroundColor: 'lightgray',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    scol: {
        width: '50%',
        textAlign: 'right',
        backgroundColor: 'lightgray',
        paddingHorizontal: 15,
        paddingTop: 20,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    textName: {
        textAlign: 'center',
        color: color.green,
        fontSize: 25,
        marginVertical: '7%'
    },
    textTile: {
        color: color.green,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
        marginVertical: 10,
        fontSize: 16,
        paddingBottom: 10
    },
    inforText: {
        // marginLeft: 10
        paddingLeft: 30
    }

});
export default thesis