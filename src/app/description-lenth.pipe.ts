import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionLenth'
})
export class DescriptionLenthPipe implements PipeTransform {

  transform(description: string, start?: any): any {

    const result = description;
    let str = '';
    if (result.length > 200) {
      str = result.slice(0, 201) + '...';
    }
    return str;
   }
  }
