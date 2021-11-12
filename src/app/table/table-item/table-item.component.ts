import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IAddUser } from 'src/app/core/models/addUser.interface';
import { IUser } from 'src/app/core/models/user.interface';

@Component({
    selector: 'table-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'table-item.component.html'
})
export class ItemTableComponent {
    @Input() users: IUser[];

    @Output() sortOutput: EventEmitter<any> = new EventEmitter();
    @Output() filterOutput: EventEmitter<string> = new EventEmitter();
    @Output() deleteOutput: EventEmitter<number> = new EventEmitter();
    @Output() addUserOutput: EventEmitter<IAddUser> = new EventEmitter();

    constructor() { }

    public sort() {
        this.sortOutput.emit();
    }

    public filter($event) {
        this.filterOutput.emit($event.target.value);
    }

    public deleteUser($event) {
        const user = this.users.find(user => user.username === $event.target.value.trim())
        this.deleteOutput.emit(user.id)
    }

    public addUser($event) {
        const username = $event.target.value;
        // for name just add A
        const name = username + ' A'
        const id = this.getId();
        /**
         * for rest of the data
         * we just use an existing user.
         */
        const user = this.users[0];

        this.addUserOutput.emit({ user, username, name, id})
    }

    private getId(): number {
        let id = 0;
        this.users.forEach(element => {
            id = element.id > id ? element.id : id;
        });
        return id + 1;
    }
}