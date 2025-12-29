import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusBadge',
  pure: true,
  standalone: true
})
export class StatusBadgePipe implements PipeTransform {
  transform(value: string): string {
    const badges: { [key: string]: string } = {
      'active': '🟢 Active',
      'inactive': '🔴 Inactive',
      'pending': '🟡 Pending',
      'success': '✅ Success',
      'error': '❌ Error'
    };
    return badges[value] || value;
  }
}