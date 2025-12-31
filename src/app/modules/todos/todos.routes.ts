import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';

export const TodosRoutes: Routes = [
  {
    path: '',
    component: TodoListComponent,
    data: { title: 'Todos' }
  }
];
