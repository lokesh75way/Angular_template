import {
  Component, OnInit, OnDestroy, OnChanges, DoCheck,
  AfterContentInit, AfterViewInit, Input, SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-lifecycle-demo',
  standalone: true,
  template: `<div>Lifecycle Component</div>`
})
export class LifecycleDemoComponent implements OnInit, OnDestroy, OnChanges, DoCheck, AfterContentInit, AfterViewInit {
  @Input() data: string = '';

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges:', changes);
  }

  ngOnInit() {
    console.log('ngOnInit: Component initialized');
  }

  ngDoCheck() {
    console.log('ngDoCheck: Change detection check');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit: Content initialized');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit: View initialized');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy: Component destroyed');
  }
}