import { Dimensions, StyleSheet } from "react-native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const mess = StyleSheet.create({
    container: {
        marginVertical: 20,
        height: windowHeight * 0.63,
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
        backgroundColor: 'lightblue',
        borderRadius: 33,
        borderWidth: 1,
        borderColor: 'gray'
    },
    userName: {
        fontSize: 17,
        marginBottom: 5
    },
    fullName: {
        fontSize: 14,
        color: 'gray',
        fontStyle: 'italic'

    }


})
export default mess