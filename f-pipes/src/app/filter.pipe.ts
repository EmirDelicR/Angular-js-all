import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(
    value: Array<any> | string,
    filterString: string,
    propName: string
  ): Array<any> | string {
    if (value.length === 0 || filterString === '') {
      return value;
    }

    const result = [];

    for (const item of value) {
      if (item[propName] === filterString) {
        result.push(item);
      }
    }
    return result;
  }
}
