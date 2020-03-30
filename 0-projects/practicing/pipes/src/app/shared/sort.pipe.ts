import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(value: string[], orderBy: string): string[] {
    if (orderBy === 'desc') {
      return value.sort(this.sortDesc);
    }
    return value.sort();
  }

  private sortDesc(a, b) {
    if (a > b) {
      return -1;
    }
    if (b > a) {
      return 1;
    }
    return 0;
  }
}
