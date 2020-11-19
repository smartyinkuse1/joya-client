import {Pipe, PipeTransform} from '@angular/core';
@Pipe ({
   name : 'today',
   pure: false
})

export class TodayPipe implements PipeTransform {
    transform(items: Array<any>, filter: {[key: string]: any }): Array<any> {
        return items.filter(item => {
            let notMatchingField = Object.keys(filter).find(key => item[key] !== filter[key]);

            return !notMatchingField; // true if matches all fields
        });
    }
}
