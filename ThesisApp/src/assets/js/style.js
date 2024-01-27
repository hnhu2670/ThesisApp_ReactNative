import { Dimensions } from 'react-native';
import { StyleSheet, } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// marginTop: '10%',
// paddingHorizontal: '5%'
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#2d665f",
    },
    container: {
        paddingVertical: '10%',
        marginHorizontal: windowWidth * 0.05
    }
    ,
    text: {
        fontSize: 50,
        color: '#2d665f',
    },
    font: {
        color: "#2d665f",
        // #d5e7e9
    },
    button: {
        backgroundColor: "red",
        margin: "10%"
    },
    link: {
        display: "flex",
        flex: 2
    }
});
export default styles;
