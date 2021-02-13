import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../core/interface/task';
import { environment } from 'src/environments/environment';
import { Request } from '../core/interface/request';
import { Observable } from 'rxjs';
import { Model } from '../core/models/model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient
  ) { }

  getAllTasks(): Observable<Task[]> {
    const path = environment.endpoint;
    return this.http.get<Task[]>(path);
  }

  getTask(id: string): Observable<Task> {
    const path = `${environment.endpoint}/${id}`;
    return this.http.get<Task>(path);
  }

  createTask(task: Task): Observable<any> {
    const path = `${environment.endpoint}`;
    return this.http.post(path, task);
  }

  createJob(request: Model): Observable<any> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    console.log(headers)
    const path = `${environment.endpoint}`;
    return this.http.post(path, request, { 'headers': headers });
  }

}
