import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { loadTodos, loadTodosSuccess, loadTodosFailure } from '../actions/todo.actions';

@Injectable()
export class TodoEffects {
  loadTodos$;

  constructor(private actions$: Actions, private todoService: TodoService) {
    this.loadTodos$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadTodos),
        mergeMap(() =>
          this.todoService.fetchTodos().pipe(
            map((todos) => loadTodosSuccess({ todos })),
            catchError((error) => of(loadTodosFailure({ error })))
          )
        )
      )
    );
  }
}
