import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    // this.loadUser();
  }

  login(
    username: string | undefined,
    password: string | undefined
  ): Observable<any> {
    return this.http
      .post<any>(
        `${environment.apiUrl}/login`,
        { username, password },
        { withCredentials: true }
      )
      .pipe(
        tap((user) => {
          this.userSubject.next(user.user);
        })
      );
  }
  loadUser(): void {
    const url = `${environment.apiUrl}/user`;

    this.http.get<any>(url, { withCredentials: true }).subscribe({
      next: (user) => {
     
        this.userSubject.next(user.user);
      },
      error: (err) => {
        console.log(err);
        
        this.userSubject.next(null);
      },
    });
  }
  fetchLoggedinUser(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user`, { withCredentials: true });
  }
}
