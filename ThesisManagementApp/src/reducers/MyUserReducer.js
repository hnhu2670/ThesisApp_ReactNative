import AsyncStorage from '@react-native-async-storage/async-storage';

const MyUserReducer = (currentState, action) => {
    switch (action.type) {
        case "login":
            // AsyncStorage.setItem('user', JSON.stringify(action.payload));
            return action.payload;
        case "logout":
            AsyncStorage.removeItem('token');
            AsyncStorage.removeItem('user');
            return null;
        default:
            return currentState;
    }
};

export default MyUserReducer;