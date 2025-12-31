import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable()
export class TodoService {
  private readonly API = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  fetchTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.API + '?_limit=20');
  }
}
