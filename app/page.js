'use client'

import { useEffect, useState } from 'react';
import NewTaskForm from '../components/NewTaskForm';
import TaskList from '../components/TaskList';
import TaskFilter from '../components/TaskFilter';
import axios from 'axios';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);



  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const addTask = async (newTask) => {
    console.log(newTask)
    try {
      const response = await axios.post('/api/tasks', JSON.stringify(newTask));
      setTasks([...tasks, response.data.newTask]);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };



  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management App</h1>

      <NewTaskForm onAddTask={addTask} />

      <TaskFilter setTasks = {setTasks} />

      <TaskList
        tasks={tasks}
        fetchTasks={fetchTasks}
      />
    </div>
  );
};

export default HomePage;
