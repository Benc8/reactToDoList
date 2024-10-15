import { useState, useEffect } from "react";

function ToDoList() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : ['eat', 'sleep', 'code'];
    });
    const [newTask, setNewTask] = useState("");
    const [taskClasses, setTaskClasses] = useState(Array(tasks.length).fill(""));

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function handleInputChange(e) {
        setNewTask(e.target.value);
    }

    function handleAddTask() {
        if (newTask) {
            setTasks(t => [...t, newTask]);
            setTaskClasses(c => [...c, ""]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        const updatedClasses = taskClasses.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        setTaskClasses(updatedClasses);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            const updatedClasses = [...taskClasses];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            [updatedClasses[index], updatedClasses[index - 1]] = ["moved-up", "moved-down"];
            setTasks(updatedTasks);
            setTaskClasses(updatedClasses);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            const updatedClasses = [...taskClasses];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            [updatedClasses[index], updatedClasses[index + 1]] = ["moved-down", "moved-up"];
            setTasks(updatedTasks);
            setTaskClasses(updatedClasses);
        }
    }

    return (
        <div className="to-do-list">
            <div className="hHolder">
                <p className="hF">T</p>
                <p className="hS">o</p>
                <p className="hT">D</p>
                <p className="hF">o</p>
                <p className="hS">L</p>
                <p className="hT">i</p>
                <p className="hF">s</p>
                <p className="hS">t</p>
            </div>
            <div className="textAdder">
                <input className="inputText" type="text" value={newTask} onChange={handleInputChange}
                       placeholder="Enter a task..."/>
                <button className="addButton" onClick={handleAddTask}>Add Task</button>
            </div>
            <ol>
                {tasks.map((task, index) => (
                    <li key={index} className={taskClasses[index]}>
                        <span className="text">{task}</span>
                        <button className="deleteB" onClick={() => deleteTask(index)}>Delete</button>
                        <button className="moveUpB" onClick={() => moveTaskUp(index)}>Up</button>
                        <button className="moveDownB" onClick={() => moveTaskDown(index)}>Down</button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;