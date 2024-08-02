import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) {}
getTop3Users():Observable<User[]> {
  return this.http.get<User[]>(`${environment.apiUrl}/top3users`);
}
getAllUsers():Observable<any[]> {
  return this.http.get<any>(`${environment.apiUrl}/users`);
}

getStats():Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/statistics`);
}
geteGroups():Observable<any> {
  return this.http.get<any>(`${environment.apiUrl}/group`);
}
}