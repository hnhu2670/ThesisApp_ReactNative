import React from 'react'
import { Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import styles from '../../assets/js/style';
import { Popup } from 'react-native-popup-confirm-toast';
import { SceneMap, TabView } from 'react-native-tab-view';
import StudentThesis from '../thesis/StudentThesis';

const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = SceneMap({
    first: StudentThesis,
    second: SecondRoute,
});
const ConfirmMessage = ({ navigation }) => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
    ]);

    return (
        <TabView
            style={styles.container}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />

    );
}

export default ConfirmMessage