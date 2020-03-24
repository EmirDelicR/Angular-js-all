import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, limit: number = 20) {
    const short = value.length > limit ? `${value.substr(0, limit)}...` : value;
    return short;
  }
}
