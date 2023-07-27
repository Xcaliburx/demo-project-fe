import { DeveloperService } from './../developer.service';
import { Project } from './project.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projectForm!: FormGroup
  project!: Project
  id!: number

  constructor(private developerService: DeveloperService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.initForm()
  }

  private initForm() {
    let name = ''
    let desc = ''
    let price = ''
    this.id = this.route.snapshot.queryParams['developerId']

    this.projectForm = new FormGroup({
      'projectName': new FormControl(name, Validators.required),
      'description': new FormControl(desc, Validators.required),
      'price': new FormControl(price,
        [
          Validators.required, 
          Validators.pattern("^[0-9]*$")
        ]),
      'developerId': new FormControl(this.id)
    })
  }

  onSubmit() {
    this.developerService.createProject(
      this.projectForm.value
    ).subscribe(() => {
      this.router.navigate(['../' + this.id], {relativeTo: this.route})
    })
  }
}
