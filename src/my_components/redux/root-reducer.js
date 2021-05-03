import {combineReducers} from 'redux'
import userErrorReducer from './userError/userError-reducer'
import userReducer from './user/user-reducer'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig={
    key: 'root',
    storage,
    blacklist: ['user'] ,
    whitelist: ['userError']
}

const rootReducer = combineReducers({
    user: userReducer,
    userError: userErrorReducer
})

export default persistReducer(persistConfig,rootReducer)