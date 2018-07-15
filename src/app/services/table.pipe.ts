import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'table'
})
export class TablePipe implements PipeTransform {

	/**
	 * 
	 * @param transform 
	 * @desc lazy implementation of stirng filtering and flags of alerts
	 * @param searchString (String) - handles string filtering
	 */
	transform(value: any, searchString: string, paginate: number): any {
		let filteredArray = value.filter(item => {
			return JSON.stringify(item).toLowerCase().indexOf(searchString.toLowerCase()) >= 0;
		});;

		if (paginate) filteredArray = filteredArray.slice((paginate - 1) * 10, paginate * 10);

		return filteredArray;
	}

}
