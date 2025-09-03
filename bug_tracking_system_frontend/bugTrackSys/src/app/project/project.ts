import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { debounceTime } from 'rxjs/operators';
import { ProjectService } from '../services/project/project';
import { User } from '../services/user/user';
import { Navbar } from '../shared/navbar/navbar';
import { ProjectAdd } from './project-add/project-add';
import { ProjectItems } from './project-items/project-items';
// ..............................imports ends ..................................

@Component({
  selector: 'app-project',
  imports: [Navbar, ProjectItems, ReactiveFormsModule, MatPaginatorModule],
  templateUrl: './project.html',
  styleUrl: './project.scss',
})
export class Project implements OnInit {
  // component variable

  loggedInUser: any | null = null;
  searchControl = new FormControl('');
  originalProjects: any[] = [];
  currentPageNumber: any = 0;
  limit: any = 10;
  totalRecords: any = 0;
  isManager = false;

  // constructor

  constructor(
    public dialog: MatDialog,
    private project_service: ProjectService,
    private user_service: User
  ) {}

  ngOnInit() {
    this.project_service.projectsShownLimit.subscribe((value) => {
      this.limit = value;
    });

    // get the logged in user

    this.loggedInUser = this.user_service.loggedInUserInfo$.pipe(
      (user: any) => {
        if (user) return user;
      }
    );

    // logged in users type check
    this.user_service.loggedInUserInfo$.subscribe((user) => {
      if (user && user.user_type) {
        this.isManager = user.user_type !== 'manager';
      } else {
        this.isManager = false;
      }
    });

    //  get projects
    this.project_service.projects$.subscribe((projects) => {
      if (projects.length > 0) {
        this.originalProjects = [...projects];
        this.project_service.projectsInfo$.next(projects);
      }
    });

    // when filter by name the project.
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((keyword) => {
        if (!keyword || keyword.trim() === '') {
          console.log('fjakdl;s');
          this.project_service.onProjectAddRefetchProjects.next();
        } else {
          console.log('fjakdl;s');
          this.project_service.getProjectsByName(keyword).subscribe({
            next: (response: any) => {
              if (response.data[0].length === 0) {
                console.log(response.data[0]);
                this.project_service.projectsInfo$.next([]);
              } else {
                const projects = response.data[0].map((project: any) => {
                  let projectTotalTasks = 0;
                  let completedTasksCount = 0;
                  projectTotalTasks = project.Bugs?.length;
                  completedTasksCount = project.Bugs.filter(
                    (bug: any) =>
                      bug.status === 'resolved' || bug.status === 'completed'
                  ).length;

                  return {
                    ...project,
                    projectTotalTasks: projectTotalTasks,
                    completedTasksCount: completedTasksCount,
                  };
                });

                this.project_service.projects$.next(projects);
              }
            },
            error: (err: any) => {},
          });
        }
      });
  }

  receiveDataFromChild(totProjects: string) {
    this.totalRecords = totProjects;
  }

  // page number get for pagination

  onPageChange(event: PageEvent): void {
    this.currentPageNumber = event.pageIndex;
    this.project_service.projectsShownLimit.next(event.pageSize || 1);
    this.totalRecords = event.length;
  }

  // sort by name
  onClickSortByName() {
    const sortedProjects = [
      ...this.project_service.projectsInfo$.getValue(),
    ].sort((a, b) => a.projectName.localeCompare(b.projectName));

    this.project_service.projectsInfo$.next(sortedProjects);
  }
  // sory by date

  onClickSoryByDate() {
    const sortedProjects = [
      ...this.project_service.projectsInfo$.getValue(),
    ].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    this.project_service.projectsInfo$.next(sortedProjects);
  }

  // Project add dialog
  openDialog() {
    const dialogRef = this.dialog.open(ProjectAdd, {
      backdropClass: 'popup',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
