import {applyMiddleware, compose, createStore, Store} from 'redux';
import reduxThunk from 'redux-thunk';
import {state, State} from './reducers/reducers';
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'user-manager',
    storage,
    whitelist: []
}
const persistedReducer = persistReducer(persistConfig, state)

export const store: Store<State> = createStore(
    persistedReducer,
    compose(
        applyMiddleware(reduxThunk),
    )
);