import { ActivatedRoute, Router, Params } from '@angular/router';
import { DeveloperService } from './../developer.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Developer } from './../developer.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-developer',
  templateUrl: './create-developer.component.html',
  styleUrls: ['./create-developer.component.css']
})
export class CreateDeveloperComponent implements OnInit {
  id!: number
  editMode = false
  developer!: Developer
  developerForm!: FormGroup

  constructor(private developerService: DeveloperService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']
          this.editMode = params['id'] != null
          this.initForm()
        }
      )
  }

  private initForm() {
    let name = ''
    let location = ''
    let fee = ''

    if (this.editMode) {
      name = this.route.snapshot.queryParams['name']
      location = this.route.snapshot.queryParams['location']
      fee = this.route.snapshot.queryParams['fee']
    }

    this.developerForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'location': new FormControl(location, Validators.required),
      'fee': new FormControl(fee,
        [
          Validators.required, 
          Validators.pattern("^[0-9]*$")
        ])
    })
  }

  onSubmit() {
    console.log(this.developerForm.value)
    if (this.editMode) {
      this.developerService.updateDeveloper(
        this.id,
        this.developerForm.value
      ).subscribe(() => {
        this.fetchData()
      })
    } else {
      this.developerService.addDeveloper(
        this.developerForm.value
      ).subscribe(() => {
        this.fetchData()
      })
    }
  }

  fetchData() {
    this.developerService.fetchDeveloper().subscribe(
      response => {
        this.developerService.developersChanged.next(response)
        this.router.navigate(['../'], {relativeTo: this.route})
      }
    )
  }
}
