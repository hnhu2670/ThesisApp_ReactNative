import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import login from '../../login/style';
import { AntDesign } from '@expo/vector-icons';

const AddCom = () => {
    const [textInputs, setTextInputs] = useState([]);

    const addTextInput = () => {
        setTextInputs(prevInputs => [
            ...prevInputs,
            { member: '', position: '' },
        ]);
    };

    const handleMemberChange = (text, index) => {
        const updatedInputs = [...textInputs];
        updatedInputs[index].member = text;
        setTextInputs(updatedInputs);
    };

    const handlePositionChange = (text, index) => {
        const updatedInputs = [...textInputs];
        updatedInputs[index].position = text;
        setTextInputs(updatedInputs);
    };

    return (
        <View>
            <View>
                <ScrollView style={{ height: "85%" }}>
                    {textInputs.slice(0, 5).map((input, index) => (
                        <View style={login.text_input} key={index + 3}>
                            <Text style={[login.text]}>Thành viên {index + 1}</Text>
                            <TextInput
                                style={[login.input]}
                                placeholder={`Thành viên ${index + 1}`}
                                value={input.member}
                                onChangeText={text => handleMemberChange(text, index)}
                            />
                            <Text style={[login.text, { marginTop: 10 }]}>Chức vụ</Text>
                            <TextInput
                                style={login.input}
                                placeholder='Chức vụ'
                                value={input.position}
                                onChangeText={text => handlePositionChange(text, index)}
                            />
                        </View>
                    ))}
                    <View style={[login.text_input]}>
                        <TouchableOpacity onPress={addTextInput}
                            style={[{ flexDirection: "row" }]}>
                            <Text style={[login.text]}>Thêm thành viên</Text>
                            <AntDesign
                                style={comm.plus}
                                name='plus' size={20} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <View style={[login.text_input]}>
                    <TouchableOpacity>
                        <Text style={login.button}
                        >THÊM</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const comm = StyleSheet.create({
    plus: {
        marginLeft: 20,
        padding: 5,
        borderWidth: 1,
        color: "green",
        borderRadius: 10,
        textAlign: "center"
    }
})
export default AddCom;