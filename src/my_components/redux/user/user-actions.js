export const setCurrentUser = user=>({
    type: 'SET_CURRENT_USER',
    payload: user
})

export const createDB=(user)=>({
    type: 'CREATE_DB',
    payload: user
})
export const setEdit=(user)=>({
    type: 'EDIT',
    payload:user
})