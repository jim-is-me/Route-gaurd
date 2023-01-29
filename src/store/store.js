import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import appReducer from '../slices/appSlice';

export const store = configureStore({
    reducer: {
        app: appReducer,
    }
});

export default function AppProvider({ children }) {
    return <Provider store={store}>{children}</Provider>;
}
