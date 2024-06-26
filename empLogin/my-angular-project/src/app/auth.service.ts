import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/api'; // Replace with your backend API base URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        map(response => {
          // Store JWT token in local storage or session storage
          localStorage.setItem('token', response.token);
          return response;
        }),
        catchError(error => {
          throw error;
        })
      );
  }

  logout(): void {
    // Remove JWT token from local storage or session storage
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    // Check if JWT token exists in local storage or session storage
    return !!localStorage.getItem('token');
  }
  getAllUser(){
    return this.http.get<any>(`${this.apiUrl}/`);
  }
  register(username: string, password: string){
    return this.http.post<any>(`${this.apiUrl}/users`, { username, password })
      .pipe(
        map(response => {
          // Store JWT token in local storage or session storage
          localStorage.setItem('token', response.token);
          return response;
        }),
        catchError(error => {
          throw error;
        })
      );

  }
  deleteUser(userId: string): Observable<any> {
    const deleteUrl = `${this.apiUrl}/users/${userId}`;
    return this.http.delete<any>(deleteUrl);
  }
  getUser(userId: string): Observable<any> {
    const getbyId = `${this.apiUrl}/${userId}`;
    return this.http.get<any>(getbyId);
  }

  updateUser(userId: string, username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}`; // Adjust endpoint as per your API
    const body = { username, password };
    return this.http.put(url, body);
  }
}
 


