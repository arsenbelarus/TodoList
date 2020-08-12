import React from 'react';
import AppWithRedux from "../AppWithRedux"
import {Meta} from "@storybook/react/types-6-0";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";


export default {
    title: 'Example/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

export const AppWithReduxBaseExample = (props: any) => {
    return (
            <AppWithRedux/>
    )
}