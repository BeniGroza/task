import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IUser } from "../models/user.interface";

@Injectable({
    providedIn: 'root'
})
export class TableService {

    private url: string = 'https://jsonplaceholder.typicode.com/users';

    constructor(private http: HttpClient) { }

    public getTableData(): Observable<IUser[]> {
        return this.http.get<IUser[]>(this.url);
    }

    public deleteUser(id: number): Observable<any> {
        return this.http.delete(`${this.url}/${id}`);
    }

    public addUser(user: IUser): Observable<any> {
        return this.http.post(this.url, user);
    }
}