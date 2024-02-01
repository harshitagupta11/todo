import { useState } from 'react';
import axios from 'axios';

const NewTaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    //   const response = await axios.post('/api/tasks', { title, description, status: 'To Do' });
      onAddTask({ title, description, status: 'todo' });
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded w-full py-2 px-3 mb-2"
        required
      />

      <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded w-full py-2 px-3 mb-2"
      />

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Add Task
      </button>
    </form>
  );
};

export default NewTaskForm;
