import { createReducer, on } from '@ngrx/store';
import { loadTodos, loadTodosSuccess, loadTodosFailure } from '../actions/todo.actions';
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
  on(loadTodosFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
