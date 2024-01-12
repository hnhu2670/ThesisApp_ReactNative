import { AntDesign } from '@expo/vector-icons';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'

const ToastifyMessage = forwardRef(({ type = 'success', text, description, timeout }, ref) => {

    const TOAST_TYPE = {
        success: {
            bgColol: '#2ecc71',
            icon: 'checkcircleo'
        },
        danger: {
            bgColol: '#e74c3c',
            icon: 'closecircleo'
        },
        info: {
            bgColol: '#3498db',
            icon: 'infocirlceo'
        },
        warning: {
            bgColol: '#f39c12',
            icon: 'warning'
        }
    }
    const background = TOAST_TYPE[type].bgColol;
    const icon = TOAST_TYPE[type].icon;

    const [visible, setVisible] = useState(true);

    useImperativeHandle(ref, () => ({
        show: showToast
    }));

    const showToast = (message) => {
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
        }, message.timeout || 5000);
    };

    if (!visible) {
        return null;
    }
    return (
        <>

            <Animated.View style={[style.container, { backgroundColor: background }]}>
                <View style={{ marginRight: 10 }}>
                    <AntDesign name={icon} size={30} color={'#ffff'} />
                </View>
                <View>
                    <Text style={style.text}>{text}</Text>
                    {/* <Text style={style.text}>{description}</Text> */}
                </View>
            </Animated.View>

        </>

    )
})
const style = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        // backgroundColor: backgroundColor,
        width: '90%',
        textAlign: 'center',
        padding: 20,
        position: 'absolute',
        top: '5%',
        marginLeft: '5%',
        borderRadius: 10,
        shadowColor: '#0000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.6,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white'
    }
})
export default ToastifyMessage