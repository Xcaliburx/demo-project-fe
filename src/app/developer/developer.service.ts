import { Project } from './project/project.model';
import { Developer } from './developer.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {
  developersChanged = new Subject<Developer[]>
  constructor(private http: HttpClient) { }

  fetchDeveloper () {
    return this.http.get<Developer[]>(
      "http://localhost:8080/developer"
    )
  }

  getDeveloperById (id: number) {
    return this.http.get<Developer>(
      "http://localhost:8080/developer/" + id
    )
  }

  addDeveloper (developer: Developer) {
    return this.http.post(
      "http://localhost:8080/developer",
      developer
    )
  }

  updateDeveloper (id: number, developer: Developer) {
    return this.http.put(
      "http://localhost:8080/developer/" + id,
      developer
    )
  }

  deleteDeveloper (id: number) {
    return this.http.delete(
      "http://localhost:8080/developer/" + id
    )
  }

  createProject (project: Project) {
    return this.http.post(
      "http://localhost:8080/project",
      project
    )
  }

  deleteProject (id: number) {
    console.log("test")
    return this.http.delete(
      "http://localhost:8080/project/" + id
    )
  }

}
