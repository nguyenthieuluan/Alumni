import {Pipe, PipeTransform} from "@node_modules/@angular/core";
@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
    transform(users: any, searchKey: any): any {
        // check if searchKey is undefined
        if (searchKey === undefined) return users;
        // return update users array
        return users.filter( user => user.name.toLowerCase().includes(searchKey.toLowerCase()));
    }
}