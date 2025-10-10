import { configureStore } from '@reduxjs/toolkit';
import {authSlice} from "./auth/authReduce.js";
import {modulesAPI} from "./modules/moduleOperations.js";
import {foldersAPI} from "./folders/folderOperations.js";
import {dictionariesAPI} from "./dictionary/dictionaryOperations.js";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {definitionsAPI} from "./definitionList/definitionaList.js";
import {quizAPI} from "./quiz/quizOperations.js";

const middleware = getDefaultMiddleware => [
    ...getDefaultMiddleware({
        serializableCheck:{
            ignoredActions:[FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        },
    }),
    modulesAPI.middleware,
    foldersAPI.middleware,
    dictionariesAPI.middleware,
    definitionsAPI.middleware,
    quizAPI.middleware,
]
const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token'],
}
export const store = configureStore({
    reducer: {
        [authSlice.name]: persistReducer(authPersistConfig, authSlice.reducer),
        [modulesAPI.reducerPath]: modulesAPI.reducer,
        [foldersAPI.reducerPath]: foldersAPI.reducer,
        [dictionariesAPI.reducerPath]: dictionariesAPI.reducer,
        [definitionsAPI.reducerPath]: definitionsAPI.reducer,
        [quizAPI.reducerPath]: quizAPI.reducer,

    },
    middleware,
});
export const persistor = persistStore(store);