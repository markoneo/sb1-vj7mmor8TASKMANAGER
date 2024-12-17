import React, { useState } from 'react';
import { Plus, Calendar as CalendarIcon, Clock, History, Menu, X } from 'lucide-react';
import { TaskForm } from './components/TaskForm/TaskForm';
import { TaskList } from './components/TaskList/TaskList';
import { Calendar } from './components/Calendar/Calendar';
import { HistoryList } from './components/History/HistoryList';
import { useTasks } from './hooks/useTasks';
import { sortTasksByDate } from './utils/taskUtils';
import { Modal } from './components/Modal/Modal';

type View = 'list' | 'calendar' | 'history';

export default function App() {
  const { tasks, addTask, updateTask, completeTask, deleteTask } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [view, setView] = useState<View>('list');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const sortedTasks = sortTasksByDate(tasks);
  const completedTasks = tasks.filter(task => task.completed);
  const activeTasks = tasks.filter(task => !task.completed);

  const handleTaskSubmit = (taskData: { title: string; description: string; datetime: string; assignee: string }) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      setEditingTask(null);
    } else {
      addTask(taskData);
    }
    setShowForm(false);
  };

  const renderView = () => {
    switch (view) {
      case 'calendar':
        return <Calendar tasks={sortedTasks} />;
      case 'history':
        return (
          <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
            <h2 className="text-xl font-bold mb-4">Task History</h2>
            <HistoryList tasks={completedTasks} onDelete={deleteTask} />
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-lg shadow-sm p-4 lg:p-6">
            <h2 className="text-xl font-bold mb-4">Active Tasks</h2>
            <TaskList
              tasks={activeTasks}
              onComplete={completeTask}
              onDelete={deleteTask}
              onEdit={(task) => {
                if (!task.completed) {
                  setEditingTask(task);
                  setShowForm(true);
                }
              }}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-gray-900">Task Manager</h1>
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="border-t border-gray-200 p-4 space-y-2">
            <button
              onClick={() => {
                setView('list');
                setShowMobileMenu(false);
              }}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                view === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
            >
              <Clock className="inline-block w-5 h-5 mr-2" />
              Tasks
            </button>
            <button
              onClick={() => {
                setView('calendar');
                setShowMobileMenu(false);
              }}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                view === 'calendar' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
            >
              <CalendarIcon className="inline-block w-5 h-5 mr-2" />
              Calendar
            </button>
            <button
              onClick={() => {
                setView('history');
                setShowMobileMenu(false);
              }}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                view === 'history' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
            >
              <History className="inline-block w-5 h-5 mr-2" />
              History
            </button>
          </div>
        )}
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setView('history')}
                className={`p-2 rounded-lg transition-colors ${
                  view === 'history' ? 'bg-gray-200 text-gray-800' : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <History className="w-5 h-5" />
              </button>
              <button
                onClick={() => setView(view === 'list' ? 'calendar' : 'list')}
                className={`p-2 rounded-lg transition-colors ${
                  view === 'calendar' ? 'bg-gray-200 text-gray-800' : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                {view === 'list' ? <CalendarIcon className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-8 pt-20 lg:pt-0">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="text-lg font-medium">Active Tasks</h3>
                <p className="text-2xl font-bold">{activeTasks.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <History className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="text-lg font-medium">Completed Tasks</h3>
                <p className="text-2xl font-bold">{completedTasks.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Task Button */}
        <div className="mb-6">
          <button
            onClick={() => {
              setEditingTask(null);
              setShowForm(true);
            }}
            className="w-full lg:w-auto px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Task
          </button>
        </div>

        {renderView()}
      </div>

      <Modal isOpen={showForm} onClose={() => {
        setShowForm(false);
        setEditingTask(null);
      }}>
        <TaskForm
          task={editingTask}
          onSubmit={handleTaskSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      </Modal>
    </div>
  );
}