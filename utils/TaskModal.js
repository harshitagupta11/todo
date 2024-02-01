import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
  });
  
  TaskSchema.set('toJSON', {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  });

  const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

  export default Task;