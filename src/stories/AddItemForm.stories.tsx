import React from 'react';
import {action} from "@storybook/addon-actions"
import AddItemForm from "../AddItemForm"
import {Meta} from "@storybook/react/types-6-0";


export default {
    title: 'Example/AddItemForm',
    component: AddItemForm,
} as Meta;

export const AddItemFormBaseExample = (props: any) => {
    return (
        <AddItemForm addItem={action ("Clicked add item button")}/>
    )
}