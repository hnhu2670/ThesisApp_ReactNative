import { Dimensions, StyleSheet } from "react-native";
import color from '../../assets/js/color'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const mark = StyleSheet.create({
    container: {
        height: windowHeight * 0.9,
        // marginBottom: windowHeight * 0.2
    },
    score: {
        backgroundColor: color.lightgreen,
        marginBottom: '5%',
        paddingHorizontal: 25,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textName: {
        backgroundColor: color.green,
        padding: 10,
        marginVertical: '5%',
        color: 'white',
        fontSize: 17
    },
    items: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderColor: 'gray',
        alignItems: 'center',
        marginBottom: 10
    },
    input: {
        marginLeft: '25%',
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 10,
        width: '40%',
        textAlign: 'center',
        fontSize: 16

    }
})

export default mark