import { Directive, HostListener, Output, EventEmitter, Input } from '@angular/core';
import { BehaviorSubject, debounceTime } from 'rxjs';

@Directive({
  selector: '[appDebounceClick]',
  standalone: true
})
export class DebounceClickDirective {
  @Input() debounceTime = 500;
  @Output() debounceClick = new EventEmitter<void>();

  private clicks$ = new BehaviorSubject<void>(undefined);
  private subscription: any;

  constructor() {
    this.subscription = this.clicks$
      .pipe(debounceTime(this.debounceTime))
      .subscribe(() => this.debounceClick.emit());
  }

  @HostListener('click')
  clickEvent() {
    this.clicks$.next();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}