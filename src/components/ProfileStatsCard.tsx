import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { UserCircle, Calendar, ListTodo } from 'lucide-react';

const ProfileStatsCard = ({ username, todayTasks, allTasks }) => {
  return (
    <Card className="p-6 mb-6">
      <div className="flex items-center gap-4 mb-4">
        <UserCircle className="h-16 w-16 text-primary" />
        <div>
          <h2 className="text-xl font-semibold">Welcome, {username}</h2>
          <p className="text-sm text-muted-foreground">Your task dashboard</p>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium">Tasks for today</p>
            <p className="text-2xl font-bold">{todayTasks}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <ListTodo className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium">All tasks</p>
            <p className="text-2xl font-bold">{allTasks}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileStatsCard;