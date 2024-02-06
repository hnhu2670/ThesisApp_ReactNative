
const MyThesisReducer = (currentState, action) => {
    switch (action.type) {
        case "getData":
            AsyncStorage.setItem('user', JSON.stringify(action.payload));
            return action.payload;
        default:
            return currentState;
    }
};

export default MyThesisReducer;