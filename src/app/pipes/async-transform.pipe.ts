import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'asyncFormat',
  pure: false,
  standalone: true
})
export class AsyncFormatPipe implements PipeTransform {
  private datePipe = new DatePipe('en-US');
  private callCount = 0;

  transform(value: any, format: string = 'short'): string {
    this.callCount++;
    console.log(`Pipe called ${this.callCount} times`);
    
    if (value instanceof Date) {
      return this.datePipe.transform(value, format) || '';
    }
    return value;
  }
}