import axios from 'axios';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask, fetchTasks }) => {
    const handleUpdateTask = async (taskId, newStatus) => {
        try {
          const response = await axios.put('/api/tasks', { id: taskId, status: newStatus });
        fetchTasks()
        } catch (error) {
          console.error('Error updating task:', error);
        }
      };
    
      const handleDeleteTask = async (taskId) => {
        try {
          const response = await axios.delete('/api/tasks', { data: { id: taskId } });
        fetchTasks()
        } catch (error) {
          console.error('Error deleting task:', error);
        }
      };
    return (
      <ul className="list-none p-0">
        {tasks?.map((task) => (
          <li key={task.id} className="border mb-2 p-2 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleUpdateTask(task.id, 'inprogress')}
                className={` h-8 px-4 rounded-md bg-yellow-500 hover:bg-yellow-800 disabled:bg-gray-600 text-white `}
                disabled= {task.status==='inprogress'? true: false}
              >
                In Progress
              </button>
              <button
                onClick={() => handleUpdateTask(task.id, 'done')}
                className="h-8 px-4 rounded-md bg-green-500 hover:bg-green-700 disabled:bg-gray-600 text-white"
                disabled= {task.status==='done'? true: false}
              >
                Done
              </button>
              <button onClick={() => handleDeleteTask(task.id)} className="h-8 px-4 rounded-md bg-red-700 hover:bg-red-800 disabled:bg-red-400 text-white">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  
  export default TaskList;
  