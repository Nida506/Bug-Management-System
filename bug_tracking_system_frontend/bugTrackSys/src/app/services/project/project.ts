import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projectsInfo$ = new BehaviorSubject<any[]>([]);
  projects$ = new BehaviorSubject<any[]>([]);
  projectsShownLimit = new BehaviorSubject<number>(10);
  onProjectAddRefetchProjects = new Subject<void>();
  constructor(private http: HttpClient) {}

  //  add the project

  addProject(formData: any) {
    return this.http.post(`${environment.url}/project`, formData);
  }

  // get all the projects

  getProjects(page: any, limit: any) {
    return this.http.get(
      `${environment.url}/project?page=${page + 1}&limit=${limit}`
    );
  }

  // get project by name

  getProjectsByName(title: any) {
    return this.http.get(`${environment.url}/project/${title}`);
  }

  // assign project

  assignUserToProject(email: string, project_id: any) {
    const reqBody = { email };
    return this.http.post(
      `${environment.url}/project/${project_id}/assign`,
      reqBody
    );
  }

  //  get top 4 developers in a project

  getTopDevelopers(project_id: any) {
    return this.http.get(
      `${environment.url}/project/${project_id}/users/developers`
    );
  }

  getDevByName(searchingName: any, project_id: any) {
    return this.http.get(
      `${environment.url}/project/${project_id}/users/developers?search=${searchingName}`
    );
  }

  isManagerBelongToProject(project_id: any) {
    return this.http.get(
      `${environment.url}/project/${project_id}/user/IsManager`
    );
  }

  isQABelongToProject(project_id: any) {
    return this.http.get(
      `${environment.url}/bug/project/${project_id}/user/QA/belong`
    );
  }
}
