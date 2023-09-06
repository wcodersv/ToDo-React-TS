import React, { useEffect, useState } from 'react';
import './styles/global.css';
import Header from '../layout/Header';
import InputField from '../components/InputField';
import TodoList from '../components/TodoList';
import TodoItem from '../components/TodoItem';
import TaskSummary from '../components/TaskSummary';
import StateButton from '../components/StateButton';
import Button from '../ui/Button';

type Todo = {
  id: string;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodosFromLocalStorage());
  const [currentFilter, setСurrentFilter] = useState<string>('all');

  function loadTodosFromLocalStorage(): Todo[] {
    try {
      const storedTodos = localStorage.getItem('todos');
      return JSON.parse(storedTodos ? storedTodos : "[]");
    } catch (error) {
      console.error('Error loading todos from LocalStorage:', error);
      return [];
    }
  }

  function saveTodosToLocalStorage(todos: Todo[]): void {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos to LocalStorage:', error);
    }
  }

  useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);


  const handleAddTodo = (text: string) => {
    setTodos([
      ...todos,
      {
        id: `${Date.now()}-task`,
        text,
        completed: false,
      },
    ]);
  };

  const handleToggleTodoComplete = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  const clearCompleted = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  };

  const showActiveTasks = () => {
    setСurrentFilter('active');
  };

  const showCompletedTasks = () => {
    setСurrentFilter('completed');
  };

  function filterTodos(todos: Todo[], filter: string): Todo[] {
    if (filter === 'active') {
      return todos.filter((todo) => !todo.completed);
    } else if (filter === 'completed') {
      return todos.filter((todo) => todo.completed);
    } else {
      return todos;
    }
  }

  const visibleTodos = filterTodos(todos, currentFilter);

  return (
    <>
      <Header />
      <main>
        <div className="field">
          <InputField onEnter={handleAddTodo} />
          <TodoList>
            {visibleTodos.map((todo, index) => (
              <TodoItem
                key={`${Date.now()}-${index}`}
                toggleTodoComplete={handleToggleTodoComplete}
                {...todo}
              />
            ))}
          </TodoList>
          {todos.length > 0 && (
            <TaskSummary
              tasksCompleted={(todos.filter((todo) => !todo.completed)).length}
            >
              <StateButton
                showAllTasks={() => setСurrentFilter('all')}
                showActiveTasks={showActiveTasks}
                showCompletedTasks={showCompletedTasks}
                activeFilter={currentFilter}
              />
              <Button
                text="Clear completed"
                handle={clearCompleted}
              />
            </TaskSummary>

          )
          }
        </div>
      </main>
    </>
  );
}

export default App;
