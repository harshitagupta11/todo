import { NextResponse } from "next/server";
import connectDB from "@/utils/db";
import Task from "@/utils/TaskModal";

connectDB(); // Call the connectDB function to establish the MongoDB connection



export async function GET(req, res) {
    try{
        const tasks = await Task.find();
        return NextResponse.json(tasks);
    }
    catch(error) {
        return NextResponse.json({error:'Internal Server Error'},{ status: 500})
    }
    
}

export async function POST(req, res) {
  const { title, description, status } = await req.json();
  try{
    const newTask = await Task.create({ title, description, status });
    return NextResponse.json({newTask}, {status: 201});
  }
  catch(error){
    return NextResponse.json({ error: "Internal Server Error" }, {status: 500});
  }
}

export async function PUT(req, res) {
  const { id, ...updatedFields } = await req.json();
  try{
  const updatedTask = await Task.findByIdAndUpdate(id, {...updatedFields}, { new: true });
  if (updatedTask) {
    
    return NextResponse.json({updatedTask}, {status: 200});
  } else {
    return NextResponse.json({ error: "Task not found" }, {status: 404});
  }
}
catch(error){
    return NextResponse.json({ error: "Internal Server Error" }, {status: 500});
}
}

export async function DELETE(req, res) {
  const {id} = await req.json();
  console.log(id)
  const deletedTask = await Task.findByIdAndDelete(id);
  console.log(deletedTask)
  try{
  if (deletedTask) {
    return NextResponse.json({deletedTask},{status: 200});
  } else {
    return NextResponse.json({ error: "Task not found" }, {status: 404});
  }
}
catch(error){
    return NextResponse.json({ error: "Internal Server Error" }, {status: 500});
}
}

//  export function handler(req, res) {
//   if (req.method === 'GET') {
//     // Get all tasks
//     res.status(200).json(tasks);
//   } else if (req.method === 'POST') {
//     // Create a new task
//     const newTask = { id: tasks.length + 1, ...req.body };
//     tasks.push(newTask);
//     res.status(201).json(newTask);
//   } else if (req.method === 'PUT') {
//     // Update a task
//     const { id, ...updatedFields } = req.body;
//     const index = tasks.findIndex((task) => task.id === id);
//     if (index !== -1) {
//       tasks[index] = { ...tasks[index], ...updatedFields };
//       res.status(200).json(tasks[index]);
//     } else {
//       res.status(404).json({ error: 'Task not found' });
//     }
//   } else if (req.method === 'DELETE') {
//     // Delete a task
//     const id = req.body.id;
//     const index = tasks.findIndex((task) => task.id === id);
//     if (index !== -1) {
//       const deletedTask = tasks.splice(index, 1);
//       res.status(200).json(deletedTask[0]);
//     } else {
//       res.status(404).json({ error: 'Task not found' });
//     }
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// }
