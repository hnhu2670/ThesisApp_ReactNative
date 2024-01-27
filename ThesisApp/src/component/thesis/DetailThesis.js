import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, useWindowDimensions } from 'react-native';
import styles from '../../assets/js/style';
import login from '../../login/style';
import axios from 'axios';
import { authApiToken, endpoints } from '../../configs/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import color from '../../assets/js/color';
import thesis from './style';

const DetailThesis = ({ route, navigation }) => {
    const { id, name } = route.params;

    const FirstRoute = () => {
        const [detail, setDetail] = useState([]);

        const getList = async () => {
            const { data } = await axios.get(endpoints["get-thesis"](id));
            setDetail(data);
        };

        useEffect(() => {
            getList();
        }, []);

        return (
            <View>
                <View style={login.text_input}>
                    <Text style={[thesis.textTile]}>Hội đồng chấm</Text>
                    <Text style={[thesis.inforText]}>{detail?.committee?.name}</Text>
                </View>

                {detail?.students?.length < 1 ? (
                    <ActivityIndicator />
                ) : (
                    <>
                        <View style={[login.text_input]}>
                            <Text style={[thesis.textTile]}>Danh sách sinh viên thực hiện: {detail?.students?.length}</Text>
                        </View>
                        {detail?.students?.map((c, index) => (
                            <View key={c.id} style={[login.text_input, thesis.inforText]}>
                                <Text>
                                    {index + 1}{') '}{c.user.first_name + ' ' + c.user.last_name}
                                </Text>
                            </View>
                        ))}
                    </>
                )}

                {detail?.supervisors?.length < 1 ? (
                    <ActivityIndicator />
                ) : (
                    <>
                        <View style={login.text_input}>
                            <Text style={[thesis.textTile]}>Danh sách giảng viên</Text>
                        </View>
                        {detail?.supervisors?.map((c, index) => (
                            <View key={c.id} style={[login.text_input, thesis.inforText]}>
                                <Text>
                                    {index + 1}{') '}{c.user.first_name + ' ' + c.user.last_name}{'\n'}
                                </Text>
                            </View>
                        ))}
                    </>
                )}
            </View>
        );
    };

    const SecondRoute = () => {
        const [mark, setMark] = useState([]);
        const [getDetail, setGetDetail] = useState([]);

        const myScore = async () => {
            const token = await AsyncStorage.getItem('token');
            const { data } = await authApiToken(token).get(endpoints['score-of-student'](id));
            setMark(data);
        };

        const detailScore = async () => {
            const token = await AsyncStorage.getItem('token');
            const { data } = await authApiToken(token).get(endpoints['detail-score'](id));
            setGetDetail(data);
        };

        const renderItem = ({ item }) => {
            return (
                <View >
                    {/* <Text>Điểm của tôi: {mark.total}</Text> */}
                    <View key={item.id} style={[thesis.row]}>
                        <Text style={[thesis.fcol]}>
                            {item.criteria.id}{': '}{item.criteria.name}{'\n'}

                        </Text>
                        <Text style={[thesis.scol]}>{item.score}{'\n'}</Text>
                    </View>
                </View>



            )
        }
        useEffect(() => {
            myScore();
            detailScore();
        }, []);

        return (
            <View>

                <Text style={[thesis.textName]}>BẢNG ĐIỂM CHI TIẾT</Text>
                {getDetail?.length < 1 ? (
                    <ActivityIndicator />
                ) : (
                    <>
                        <FlatList
                            data={getDetail}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem} />
                    </>
                )}

                <Text style={{
                    color: 'red',
                    fontSize: 15,
                    fontStyle: 'italic',
                    marginVertical: 10
                }}>
                    Điểm trung bình: {mark.total}</Text>
            </View>
        );
    };

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Thông tin', titleStyle: { backgroundColor: 'blue' } },
        { key: 'second', title: 'Bảng điểm', titleStyle: { backgroundColor: 'red' } },
    ]);

    return (
        <TabView
            style={styles.container}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={props => <TabBar {...props} style={{ backgroundColor: color.green }} />}
        />


    );
}
export default DetailThesis