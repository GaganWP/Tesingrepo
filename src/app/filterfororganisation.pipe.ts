import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterfororganisation'
})
export class FilterfororganisationPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(args){
      return value.filter((item:any)=>item.orgToken.toString().indexOf(args) > -1 
         || item.acctId.toString().toUpperCase().indexOf(args) > -1 || item.organisationName.toString().toUpperCase().indexOf(args) > -1
         || item.organisationName.toString().toLowerCase().indexOf(args) > -1 )
    }

    return value;
  }

}
