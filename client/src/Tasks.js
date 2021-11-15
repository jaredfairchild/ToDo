import React, {Component} from 'react';
import {
    addTask,
    getTasks,
    updateTask,
    deleteTask
} from './services/taskServices';

class Tasks extends Component {
    state = { tasks: [], currentTask: ""}

    async componentDidMount() {
        try{
            const{data} = await getTasks();
            this.setState({tasks: data});
        } catch (err) {
            console.log(err)
        }
    }

    handleChange = ({currentTarget: input}) => {
        this.setState({currentTask: input.value});
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const originalTasks = this.state.tasks;
        try {
            const {data} = await addTask({task:this.state.currentTask});
            const tasks = originalTasks;
            tasks.push(data);
            this.setState({tasks, currentTask: ""})
        } catch (err) {
            console.log(err);
        }
    }

    handleUpdate = async (currentTask) => {
        const originalTasks = this.state.tasks;
        try{
            const tasks = [...originalTasks];
            const index = tasks.findIndex((task) =>task._id === currentTask);
            tasks[index] = {...tasks[index]};
            tasks[index].completed = !tasks[index].completed;
            this.setState({tasks});
            await updateTask(currentTask, {completed: tasks[index].completed});
        } catch(err){
            this.setState({tasks: originalTasks});
            console.log(err);
        }
    }

    handleDelete = async (currentTask) => {
        const originalTasks = this.state.tasks;
        try{
            const tasks = originalTasks.filter(
                (task) => task._id !== currentTask
            );
            this.setState({tasks});
            await deleteTask(currentTask);
        } catch (err) {
            this.setState({originalTasks})
            console.log(err);
        }
    }
}

export default Tasks;