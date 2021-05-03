const Initial_State={
    currentUser: null,
    createData: true,
    edit: true
}

const userReducer=(state=Initial_State,action)=>{
    switch(action.type){
        case 'SET_CURRENT_USER':
            return{
                ...state,
                currentUser: action.payload
            }
        case 'CREATE_DB':
            return{
                ...state,
                createData: action.payload
            }
        case 'EDIT':
            return{
                ...state,
                edit: action.payload
            }
        default:
            return state
    }
}
export default userReducer