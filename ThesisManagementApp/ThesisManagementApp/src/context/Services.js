import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';


const setUserAuth = async (value) => {
    await useAsyncStorage.setItem('userData', JSON.stringify(value))
}

const getUserAuth = async () => {
    const value = await AsyncStorage.getItem('userData');
    return JSON.parse(value)
}

const Logout = () => {
    AsyncStorage.clear()
}

export default {
    setUserAuth,
    getUserAuth,
    Logout,
}
