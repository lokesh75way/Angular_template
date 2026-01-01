import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadTodos, toggleTodo, addTodo, deleteTodo } from '../../store/actions/todo.actions';
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
  newTodoTitle = '';

  constructor(private store: Store) {
    this.todos$ = this.store.select(selectAllTodos);
    this.loading$ = this.store.select(selectTodosLoading);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.store.dispatch(loadTodos());
    }, 3000);
  }

  onToggleTodo(id: number): void {
    this.store.dispatch(toggleTodo({ id }));
  }

  onDeleteTodo(id: number): void {
    this.store.dispatch(deleteTodo({ id }));
  }

  onAddTodo(): void {
    if (this.newTodoTitle.trim()) {
      const newTodo: Todo = {
        id: Date.now(), // Simple ID generation
        userId: 1,
        title: this.newTodoTitle.trim(),
        completed: false
      };
      this.store.dispatch(addTodo({ todo: newTodo }));
      this.newTodoTitle = '';
    }
  }
}
