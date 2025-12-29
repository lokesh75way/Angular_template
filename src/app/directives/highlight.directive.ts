import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @Input() appHighlight = '#ffeb3b';
  @Input() textColor = '#000';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.appHighlight;
    this.el.nativeElement.style.color = this.textColor;
    this.el.nativeElement.style.padding = '8px';
    this.el.nativeElement.style.borderRadius = '4px';
    this.el.nativeElement.style.transition = 'all 0.3s ease';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = 'transparent';
  }
}
