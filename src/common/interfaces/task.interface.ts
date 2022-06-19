import { ETaskPriority } from '../enums/taskPriority.enum';

export default interface ITask {
    title: string,
    description: string,
    createdAt: Date,
    deadline?: Date,
    priority: ETaskPriority,
    user: string | undefined
    completed: boolean
};