import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData()

    formData.append('file', file)

    const req = new HttpRequest('POST', 
      "http://localhost:8085/image",
      formData,
      {
        reportProgress: true,
        responseType: 'json'
      })

      return this.http.request(req)
  }
  
  getProfile() {
    return this.http.get<{
      'id': number,
      'email': string,
      'roles': string
    }>(
      "http://localhost:8085/auth/user"
    )
  }
}
