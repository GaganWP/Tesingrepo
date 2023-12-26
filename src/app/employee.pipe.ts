import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'employee'
})
export class EmployeePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(args){
      return value.filter((item:any)=>item.token.toString().indexOf(args) > -1 || item.originalDocId.toString().indexOf(args) > -1 
      ||  item.firstName.toString().toLowerCase().indexOf(args) > -1  )
    }

    return value;
  }
}
