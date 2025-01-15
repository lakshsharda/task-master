import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  userEmail: string;
  scheduledFor?: string;
  priority: boolean;  // Added this property
}

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, scheduledDate?: Date) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  togglePriority: (id: string) => void;  // Added this function
  getTodayStats: () => { total: number; completed: number };
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    const checkScheduledTasks = () => {
      const now = new Date();
      tasks.forEach(task => {
        if (task.scheduledFor && new Date(task.scheduledFor).toDateString() === now.toDateString()) {
          toast("Task Reminder", {
            description: `${task.title} is scheduled for today!`
          });
        }
      });
    };

    const interval = setInterval(checkScheduledTasks, 60000);
    return () => clearInterval(interval);
  }, [tasks]);

  const saveTasks = (newTasks: Task[]) => {
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  const addTask = (title: string, scheduledDate?: Date) => {
    if (!user?.email) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
      userEmail: user.email,
      priority: false,
      ...(scheduledDate && { scheduledFor: scheduledDate.toISOString() })
    };
    saveTasks([...tasks, newTask]);

    if (scheduledDate) {
      toast("Task Scheduled", {
        description: `Task scheduled for ${scheduledDate.toLocaleDateString()}`
      });
    }
  };

  const toggleTask = (id: string) => {
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks(newTasks);
  };

  const togglePriority = (id: string) => {
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, priority: !task.priority } : task
    );
    saveTasks(newTasks);
  };

  const deleteTask = (id: string) => {
    saveTasks(tasks.filter(task => task.id !== id));
  };

  const getTodayStats = () => {
    if (!user?.email) return { total: 0, completed: 0 };
    
    const today = new Date().toISOString().split('T')[0];
    const userTasks = tasks.filter(task => 
      task.userEmail === user.email && 
      task.createdAt.startsWith(today)
    );
    
    return {
      total: userTasks.length,
      completed: userTasks.filter(task => task.completed).length
    };
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask, togglePriority, getTodayStats }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};