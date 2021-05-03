const Initial_State={
    currentVer: false,
    error: '',
    userAs: '',
    ID:'abcd',
    timeout: -1,
    email: 'abcd'
}
const userErrorReducer=(state=Initial_State,action)=>{
    switch(action.type){
        case 'SET_VERIFICATION':
            return{
                ...state,
                currentVer: action.payload
            }
        case 'SET_ERROR':
            return{
                ...state,
                error: action.payload
            }
        case 'SET_USER':
            return{
                ...state,
                userAs: action.payload
            }
        case 'SET_ID':
            return{
                ...state,
                userID:action.payload
            }
        case 'TIMEOUT':
            return{
                ...state,
                timeout: action.payload
            }
        case 'EMAIL':
            return{
                ...state,
                email: action.payload
            }
        default:
            return state
    }
}
export default userErrorReducer