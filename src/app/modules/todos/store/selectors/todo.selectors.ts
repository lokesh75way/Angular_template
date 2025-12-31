import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from '../reducers/todo.reducer';

const selectTodoFeature = createFeatureSelector<TodoState>('todos');

export const selectAllTodos = createSelector(selectTodoFeature, (state) => state.todos);
export const selectTodosLoading = createSelector(selectTodoFeature, (state) => state.loading);
export const selectTodosError = createSelector(selectTodoFeature, (state) => state.error);
