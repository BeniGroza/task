import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { TableService } from "../core/services/table.service";
import { map, take, tap } from 'rxjs/operators';
import { IUser } from "../core/models/user.interface";
import { IAddUser } from "../core/models/addUser.interface";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html'
})
export class TableComponent {

    public dataTable$: Observable<IUser[]>;

    private isSorted: boolean;
    private filterTxt: string;

    constructor(private tableService: TableService) {
        this.dataTable$ = this.getUsers();
    }

    private getUsers(sorted?: boolean, filtered?: string): Observable<IUser[]> {
        return this.tableService.getTableData().pipe(
            /**
             * if filtered exists, filter the data.
             */
            map(data => data.filter(item => item.name.includes(filtered) || !!!filtered)),
            map(data => this.sortArray(data, sorted)),
            tap(data => console.log('Users', data))
        )
    }

    public getSortedData() {
        this.isSorted = true;
        this.dataTable$ = this.getUsers(this.isSorted, this.filterTxt)
    }

    public getFilteredData($event) {
        this.filterTxt = $event;
        this.dataTable$ = this.getUsers(this.isSorted, this.filterTxt);
    }

    /**
     * Used for sorting only ascending
     * @param data User[]
     * @param sorted boolean
     * @returns IUsers[]
     */
    private sortArray(data: IUser[], sorted: boolean): IUser[] {
        if (sorted) {
            return data.sort((x, y) => x.username.localeCompare(y.username))
        }
        return data;
    }

    public deleteUser($event) {
        this.tableService.deleteUser($event).pipe(
            take(1)
        ).subscribe(
            () => {
                /**
                 * Even the delete works, the user is still 
                 * available in request from Jsonplaceholder.
                 */
                console.warn('succes');
                this.dataTable$ = this.getUsers(this.isSorted, this.filterTxt).pipe(
                    map(data => data.filter( i => i.id !== $event))
                );
            },
            () => {
                console.warn('Failed to delete');
                this.dataTable$ = this.getUsers(this.isSorted, this.filterTxt);
            }
        )

    }
    /**
     * Instend of creating a reactive form to fill
     * with user data.
     * We just choose an user and generate an id.
     */
    public addUser(addUserObj: IAddUser) {
        const newUser: IUser = { ...addUserObj.user, id: addUserObj.id, name: addUserObj.name, username: addUserObj.username }
        this.tableService.addUser(newUser).pipe(
            take(1)
        ).subscribe(
            () => {
                /**
                 * Api does not update the source so
                 * we add manually the user to show in table.
                 */
                console.warn('User added');
                this.dataTable$ = this.getUsers(this.isSorted, this.filterTxt).pipe(
                    map(data => [...data, newUser])
                );
            },
            () => {
                console.warn('Err');
                this.dataTable$ = this.getUsers(this.isSorted, this.filterTxt);
            }
        );
    }
}