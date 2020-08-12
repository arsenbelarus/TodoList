import React from 'react';
import {action} from "@storybook/addon-actions"
import {Task} from "../Task"
import {Meta} from "@storybook/react/types-6-0";


export default {
    title: 'Example/AddItemForm',
    component: Task,
} as Meta;

export const TaskBaseExample = (props: any) => {
    return (
        <>
            <Task
                taskId={"1"}
                title={"Title"}
                isDone={false}
                onFinalChange={action("Final change")}
                changeStatus={action("Change status")}
                todolistId={"todolistId"}
                removeTask={action("Remove task")}/>
            <Task
                taskId={"2"}
                title={"Shmitle"}
                isDone={true}
                onFinalChange={action("Final change")}
                changeStatus={action("Change status")}
                todolistId={"todolistId"}
                removeTask={action("Remove task")}/>
        </>
    )
}