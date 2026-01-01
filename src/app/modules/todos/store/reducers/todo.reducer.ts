import { createReducer, on } from '@ngrx/store';
import { loadTodos, loadTodosSuccess, loadTodosFailure, toggleTodo, addTodo, deleteTodo } from '../actions/todo.actions';
import { Todo } from '../../models/todo.model';

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: any;
}

export const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null
};

export const todoReducer = createReducer(
  initialState,
  on(loadTodos, (state) => ({ ...state, loading: true, error: null })),
  on(loadTodosSuccess, (state, { todos }) => ({ ...state, todos, loading: false })),
  on(loadTodosFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(toggleTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  })),
  on(addTodo, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo]
  })),
  on(deleteTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id)
  }))
);
