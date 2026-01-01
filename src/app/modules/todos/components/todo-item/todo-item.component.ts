import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() todo: Todo | null = null;
  @Output() toggle = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onToggle(): void {
    if (this.todo) {
      this.toggle.emit(this.todo.id);
    }
  }

  onDelete(): void {
    if (this.todo) {
      this.delete.emit(this.todo.id);
    }
  }
}
