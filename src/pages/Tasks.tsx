import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext"; // To access user authentication details
import { useTasks } from "@/contexts/TaskContext"; // To access and manage task data
import { TaskDonutChart } from "@/components/TaskDonutChart"; // Component to display a donut chart for tasks
import { WeatherWidget } from "@/components/WeatherWidget"; // Component to display weather information
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner"; // Library for displaying toast notifications
import { UserCircle, Calendar as CalendarIcon, Bell, Trash2, Star, List, ListTodo } from "lucide-react";
import { format } from "date-fns";

export default function Tasks() {
  const [newTask, setNewTask] = useState(""); // State for the task input field
  const [date, setDate] = useState<Date>(); // State for scheduling a task
  const { user } = useAuth(); // Retrieve authenticated user details
  const { tasks, addTask, toggleTask, deleteTask, togglePriority } = useTasks(); // Task management functions

  // Function to handle the submission of a new task
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(newTask.trim(), date); // Add the task with an optional scheduled date
      setNewTask(""); // Clear the input field
      setDate(undefined); // Reset the selected date

      // If a task is scheduled, set a notification
      if (date) {
        const notification = new Date(date);
        const now = new Date();
        const timeUntilNotification = notification.getTime() - now.getTime();

        if (timeUntilNotification > 0) {
          setTimeout(() => {
            toast("Task Reminder", {
              description: `Your task "${newTask}" is due today!`,
            });
          }, timeUntilNotification);
        }
      }
    }
  };

  // Handle task deletion
  const handleDelete = (id: string) => {
    deleteTask(id);
    toast("Task deleted", {
      description: "The task has been removed.",
    });
  };

  // Toggle task priority
  const handleTogglePriority = (id: string) => {
    togglePriority(id);
    toast("Priority Updated", {
      description: "Task priority has been toggled.",
    });
  };

  // Filter tasks for the logged-in user
  const userTasks = tasks.filter((task) => task.userEmail === user?.email);

  // Get high-priority tasks
  const priorityTasks = userTasks.filter((task) => task.priority);

  // Filter tasks scheduled for today
  const todayTasks = userTasks.filter(
    (task) =>
      task.scheduledFor &&
      new Date(task.scheduledFor).toDateString() === new Date().toDateString()
  );

  return (
    <div className="min-h-screen p-4 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-6 md:grid-cols-[300px,1fr,300px]">
          {/* Left Column - Profile Stats */}
          <Card className="p-6 h-fit">
            <div className="flex items-center gap-4 mb-4">
              <UserCircle className="h-16 w-16 text-primary" />
              <div>
                <h2 className="text-xl font-semibold">Welcome, {user?.username}</h2>
                <p className="text-sm text-muted-foreground">Your task dashboard</p>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              {/* Display number of tasks for today */}
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">Tasks for today</p>
                  <p className="text-2xl font-bold">{todayTasks.length}</p>
                </div>
              </div>

              {/* Display total number of tasks */}
              <div className="flex items-center gap-3">
                <ListTodo className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium">All tasks</p>
                  <p className="text-2xl font-bold">{userTasks.length}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Middle Column - Task Management */}
          <Card className="p-6">
            {/* Form to add a new task */}
            <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task..."
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon">
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {date && (
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
              )}
              <Button type="submit">Add Task</Button>
            </form>

            {/* List of user tasks */}
            <div className="space-y-4">
              {userTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                    />
                    <div>
                      <span
                        className={
                          task.completed
                            ? "line-through text-muted-foreground"
                            : ""
                        }
                      >
                        {task.title}
                      </span>
                      {task.scheduledFor && (
                        <p className="text-sm text-muted-foreground">
                          Scheduled for: {format(new Date(task.scheduledFor), "PPP")}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Priority toggle */}
                    <Button
                      variant={task.priority ? "secondary" : "ghost"}
                      size="icon"
                      onClick={() => handleTogglePriority(task.id)}
                    >
                      <Star
                        className={`h-4 w-4 ${
                          task.priority ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                    {/* View priority tasks */}
                    <Sheet>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SheetTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <List className="h-4 w-4" />
                              </Button>
                            </SheetTrigger>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Check priority list</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <SheetContent side="right">
                        <SheetHeader>
                          <SheetTitle>Priority Tasks</SheetTitle>
                        </SheetHeader>
                        <div className="mt-4 space-y-4">
                          {priorityTasks.map((priorityTask) => (
                            <div
                              key={priorityTask.id}
                              className="flex items-center gap-2 p-2 border rounded"
                            >
                              <Checkbox
                                checked={priorityTask.completed}
                                onCheckedChange={() =>
                                  toggleTask(priorityTask.id)
                                }
                              />
                              <span
                                className={
                                  priorityTask.completed ? "line-through" : ""
                                }
                              >
                                {priorityTask.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      </SheetContent>
                    </Sheet>
                    {/* Delete task */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(task.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Right Column - Charts and Weather */}
          <div className="space-y-6">
            <TaskDonutChart />
            <WeatherWidget />
          </div>
        </div>
      </div>
    </div>
  );
}
