import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userSignal = signal<User | null>(null);
  userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );
  public user$ = this.userSubject.asObservable();
  public connectedUser:any;

  constructor(private http: HttpClient) {

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
    console.log('starting load user');

    const url = `${environment.apiUrl}/user`;

    this.http
      .get<any>(url, { withCredentials: true })
      .pipe(
        tap((user) => {
          console.log('setting user subject');

          this.userSubject.next(user.user);
        }),
        catchError((err) => {
          console.log('Error fetching user:', err);
          this.userSubject.next(null);
          return of(null);
        })
      )
      .subscribe();
  }

  fetchLoggedinUser(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user`, {
      withCredentials: true,
    });
  }
}
