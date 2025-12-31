import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadTodos } from '../../store/actions/todo.actions';
import { selectAllTodos, selectTodosLoading } from '../../store/selectors/todo.selectors';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.todos$ = this.store.select(selectAllTodos);
    this.loading$ = this.store.select(selectTodosLoading);
  }

  ngOnInit(): void {
    setTimeout(() => {  
        this.store.dispatch(loadTodos());
    }, 5000);
  }
}
