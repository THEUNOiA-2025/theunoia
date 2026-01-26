import { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { TaskForm } from './TaskForm';
import { getPhasesForCategory } from './phaseMapping';
import { Task, TaskStatus } from './types';
import { Activity } from './ProjectTrackingDashboard';
import { useAuth } from '@/contexts/AuthContext';
import { 
  CheckCircle2, Clock, AlertCircle, TrendingUp, TrendingDown, 
  Folder, MessageCircle, Eye 
} from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ProjectTrackingBoardProps {
  projectId: string;
  projectCategory: string | null;
}

export const ProjectTrackingBoard = ({ projectId, projectCategory }: ProjectTrackingBoardProps) => {
  const { user } = useAuth();
  const phases = useMemo(() => getPhasesForCategory(projectCategory), [projectCategory]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showFormForPhase, setShowFormForPhase] = useState<string | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);

  // Get user name for activities
  const getUserName = () => {
    if (user?.user_metadata?.first_name || user?.user_metadata?.last_name) {
      return `${user.user_metadata.first_name || ''} ${user.user_metadata.last_name || ''}`.trim();
    }
    return user?.email?.split('@')[0] || 'User';
  };

  const handleCreateTask = (phase: string, taskData: {
    title: string;
    description: string;
    assignee: string;
    deadline: string;
    priority: 'high' | 'medium' | 'low';
    status: TaskStatus;
  }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
      phase,
      projectId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setTasks([...tasks, newTask]);
    setShowFormForPhase(null);
  };

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const oldStatus = task.status;
    
    // Update task
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: newStatus, updatedAt: new Date().toISOString() }
        : task
    ));

    // Log activity
    if (oldStatus !== newStatus) {
      const newActivity: Activity = {
        id: Date.now().toString(),
        userName: getUserName(),
        taskName: task.title,
        oldStatus: oldStatus,
        newStatus: newStatus,
        phase: task.phase,
        timestamp: new Date().toISOString(),
      };
      setActivities(prev => [newActivity, ...prev].slice(0, 50)); // Keep last 50 activities
    }
  };

  const getTasksForPhase = (phase: string): Task[] => {
    return tasks.filter(task => task.phase === phase);
  };

  // Calculate metrics
  const metrics = useMemo(() => {
    const total = tasks.length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const completed = tasks.filter(t => t.status === 'done').length;
    const overdue = tasks.filter(t => {
      if (t.status === 'done') return false;
      return new Date(t.deadline) < new Date();
    }).length;
    return { total, inProgress, completed, overdue };
  }, [tasks]);

  // Calculate phase progress
  const phaseProgress = useMemo(() => {
    return phases.map((phase, index) => {
      const phaseTasks = tasks.filter(t => t.phase === phase);
      const totalTasks = phaseTasks.length;
      const completedTasks = phaseTasks.filter(t => t.status === 'done').length;
      const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
      const assignees = Array.from(new Set(phaseTasks.map(t => t.assignee)));
      return {
        phase,
        phaseNumber: index + 1,
        totalTasks,
        completedTasks,
        progress,
        assignees,
      };
    });
  }, [phases, tasks]);

  // Calculate task status distribution for chart
  const taskStatusData = useMemo(() => {
    const toDo = tasks.filter(t => t.status === 'to-do').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const done = tasks.filter(t => t.status === 'done').length;
    return [
      { name: 'Not Started', value: toDo, color: '#8b5cf6' },
      { name: 'On Progress', value: inProgress, color: '#3b82f6' },
      { name: 'Completed', value: done, color: '#10b981' },
    ].filter(item => item.value > 0);
  }, [tasks]);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatActivityDate = (date: string) => {
    const d = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (d.toDateString() === today.toDateString()) {
      return `Today ${d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}`;
    } else if (d.toDateString() === yesterday.toDateString()) {
      return `Yesterday ${d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}`;
    } else {
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
  };

  const groupedActivities = useMemo(() => {
    const groups: Record<string, Activity[]> = {};
    activities.forEach(activity => {
      const date = formatActivityDate(activity.timestamp);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(activity);
    });
    return groups;
  }, [activities]);

  const getStatusLabel = (status: TaskStatus) => {
    switch (status) {
      case 'to-do': return 'Not Started';
      case 'in-progress': return 'On Progress';
      case 'done': return 'Completed';
      default: return status;
    }
  };

  const chartConfig = {
    'not-started': { label: 'Not Started', color: '#8b5cf6' },
    'on-progress': { label: 'On Progress', color: '#3b82f6' },
    'completed': { label: 'Completed', color: '#10b981' },
  };

  const phaseColors = ['#10b981', '#8b5cf6', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <div className="w-full pb-4 px-3.5 space-y-3.5">
      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200 rounded-sm p-3 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-slate-600 font-medium">Total task</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-bold text-slate-900">{metrics.total}</span>
            <div className="flex items-center gap-0.5 text-green-600">
              <TrendingUp className="w-2.5 h-2.5" />
              <span className="text-[9px] font-semibold">+7%</span>
            </div>
          </div>
          <p className="text-[8px] text-slate-500 mt-0.5">from last month</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-sm p-3 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-slate-600 font-medium">On progress</span>
            <Clock className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-bold text-slate-900">{metrics.inProgress}</span>
            <div className="flex items-center gap-0.5 text-green-600">
              <TrendingUp className="w-2.5 h-2.5" />
              <span className="text-[9px] font-semibold">+3%</span>
            </div>
          </div>
          <p className="text-[8px] text-slate-500 mt-0.5">from last month</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-sm p-3 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-slate-600 font-medium">Completed</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-bold text-slate-900">{metrics.completed}</span>
            <div className="flex items-center gap-0.5 text-green-600">
              <TrendingUp className="w-2.5 h-2.5" />
              <span className="text-[9px] font-semibold">+9%</span>
            </div>
          </div>
          <p className="text-[8px] text-slate-500 mt-0.5">from last month</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-sm p-3 shadow-sm">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-slate-600 font-medium">Overdue</span>
            <AlertCircle className="w-3.5 h-3.5 text-red-600" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-bold text-slate-900">{metrics.overdue}</span>
            <div className="flex items-center gap-0.5 text-red-600">
              <TrendingDown className="w-2.5 h-2.5" />
              <span className="text-[9px] font-semibold">-2%</span>
            </div>
          </div>
          <p className="text-[8px] text-slate-500 mt-0.5">from last month</p>
        </div>
      </div>

      {/* Project Overview */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-900">Project overview</h3>
        <div className="overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex gap-3 min-w-max [&::-webkit-scrollbar]:hidden">
            {phaseProgress.map((phase, index) => {
              const color = phaseColors[index % phaseColors.length];
              return (
                <div key={phase.phase} className="flex-shrink-0 w-56 bg-white border border-slate-200 rounded-sm p-3 shadow-sm">
                  <div className="flex items-start justify-between mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-7 h-7 rounded-sm flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                        <Folder className="w-3.5 h-3.5" style={{ color }} />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-bold text-slate-900">
                          Phase {phase.phaseNumber}: {phase.phase}
                        </h4>
                        <div className="flex items-center gap-1 mt-0.5">
                          {phase.assignees.slice(0, 4).map((assignee, idx) => (
                            <div
                              key={idx}
                              className="w-4 h-4 rounded-full bg-primary-purple text-white flex items-center justify-center text-[8px] font-bold"
                            >
                              {getInitials(assignee)}
                            </div>
                          ))}
                          {phase.assignees.length > 4 && (
                            <span className="text-[8px] text-slate-600">+{phase.assignees.length - 4}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] text-slate-600">
                      {phase.completedTasks} of {phase.totalTasks} tasks completed
                    </span>
                    <span className="text-[9px] font-bold text-slate-900">{phase.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{ width: `${phase.progress}%`, backgroundColor: color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Kanban Board - Full Width */}
      <div>
        <h3 className="text-xs font-bold text-slate-900 mb-3">Kanban Board</h3>
        <div className="w-full overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex gap-3.5 min-w-max [&::-webkit-scrollbar]:hidden">
            {phases.map((phase, index) => {
              const phaseTasks = getTasksForPhase(phase);
              const isFormOpen = showFormForPhase === phase;

              return (
                <div
                  key={phase}
                  className="flex-shrink-0 w-72 bg-slate-50 rounded-sm border border-slate-200 p-3.5"
                >
                  {/* Phase Header */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-primary-purple text-white text-[11px] font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <h3 className="font-bold text-xs text-slate-900">{phase}</h3>
                    </div>
                    {!isFormOpen && (
                      <button
                        onClick={() => setShowFormForPhase(phase)}
                        className="w-5 h-5 rounded-full bg-primary-purple text-white flex items-center justify-center hover:bg-primary-purple/90 transition-colors"
                        title="Add task"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Task Form */}
                  {isFormOpen && (
                    <TaskForm
                      phase={phase}
                      projectId={projectId}
                      onSave={(taskData) => handleCreateTask(phase, taskData)}
                      onCancel={() => setShowFormForPhase(null)}
                    />
                  )}

                  {/* Task Cards */}
                  <div className="space-y-0">
                    {phaseTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onStatusChange={handleStatusChange}
                      />
                    ))}
                  </div>

                  {/* Empty State */}
                  {!isFormOpen && phaseTasks.length === 0 && (
                    <div className="text-center py-6 text-slate-400 text-[11px]">
                      No tasks yet
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tasks Progress and Latest Activity - Below Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Tasks Progress */}
          <div className="bg-white border border-slate-200 rounded-sm p-3 shadow-sm">
            <h3 className="text-xs font-bold text-slate-900 mb-2.5">Tasks progress</h3>
            {taskStatusData.length > 0 ? (
              <div className="relative h-[180px]">
                <ChartContainer config={chartConfig} className="h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={taskStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {taskStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <p className="text-[9px] text-slate-600 font-medium">Total task</p>
                    <p className="text-lg font-bold text-slate-900">{metrics.total}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[180px] flex items-center justify-center text-slate-400 text-[10px]">
                No tasks yet
              </div>
            )}
            <div className="mt-2.5 space-y-1">
              {taskStatusData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-[9px]">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-600">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">
                    {metrics.total > 0 ? Math.round((item.value / metrics.total) * 100) : 0}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Activity */}
          <div className="bg-white border border-slate-200 rounded-sm p-3 shadow-sm">
            <h3 className="text-xs font-bold text-slate-900 mb-2.5">Latest Activity</h3>
            <div className="space-y-2.5 max-h-[350px] overflow-y-auto">
              {Object.entries(groupedActivities).map(([date, dateActivities]) => (
                <div key={date}>
                  <h4 className="text-[9px] font-bold text-slate-600 mb-1.5">{date}</h4>
                  <div className="space-y-2">
                    {dateActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-primary-purple text-white flex items-center justify-center text-[8px] font-bold flex-shrink-0">
                          {getInitials(activity.userName)}
                        </div>
                        <div className="flex-1">
                          <p className="text-[9px] text-slate-900 leading-relaxed">
                            <span className="font-semibold">{activity.userName}</span>
                            {' '}changed task{' '}
                            <span className="font-semibold">"{activity.taskName}"</span>
                            {activity.oldStatus && (
                              <> from <span className="font-semibold">{getStatusLabel(activity.oldStatus)}</span></>
                            )}
                            {' '}to <span className="font-semibold">{getStatusLabel(activity.newStatus)}</span>
                            {' '}in <span className="font-semibold">Phase {phases.findIndex(p => p === activity.phase) + 1}: {activity.phase}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {activities.length === 0 && (
                <div className="text-center py-3 text-slate-400 text-[9px]">
                  No activity yet
                </div>
              )}
            </div>
          </div>
      </div>
    </div>
  );
};

