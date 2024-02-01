import axios from 'axios';

const TaskFilter = ({ setTasks }) => {
  const handleChangeFilter = async (value) => {
    try {
        const response = await axios.get('/api/tasks');
      console.log(response.data)
        if(value!=='all'){
      const filteredTasks= response.data?.filter(task=>task?.status==value)
      console.log(filteredTasks)
      setTasks(filteredTasks)
        }
        else{
            setTasks(response.data)
        }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

    return (
      <select
      onChange={(e) => handleChangeFilter(e.target.value)}
        className="border rounded py-2 px-3"
      >
        <option value="all">All</option>
        <option value="todo">To Do</option>
        <option value="inprogress">In Progress</option>
        <option value="done">Done</option>
      </select>
    );
  };
  
  export default TaskFilter;
  