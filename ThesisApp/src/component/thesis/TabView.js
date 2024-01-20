import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import DetailThesis from './DetailThesis'
import styles from '../../assets/js/style'
import { MyContext } from './StudentThesis'

const TabView = () => {
    const { thesisId } = useContext(MyContext)
    return (
        <View>
            <Text>thông tin{thesisId}</Text>
            {/* <DetailThesis id={{ id }} /> */}
        </View>
        // <View style={styles.container}><DetailThesis
        //     id={id}
        //     name={name}
        // /></View>
    )
}

export default TabView