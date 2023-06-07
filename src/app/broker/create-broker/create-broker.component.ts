import { Broker } from './../broker.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BrokerService } from './../broker.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-broker',
  templateUrl: './create-broker.component.html',
  styleUrls: ['./create-broker.component.css']
})
export class CreateBrokerComponent implements OnInit {
  id!: number
  editMode = false
  broker!: Broker
  brokerForm!: FormGroup;

  constructor(private brokerService: BrokerService, 
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
    let description = ''
    let phone = ''
    let location = ''

    if (this.editMode) {
      name = this.route.snapshot.queryParams['name']
      description = this.route.snapshot.queryParams['desc']
      phone = this.route.snapshot.queryParams['phone']
      location = this.route.snapshot.queryParams['location']
    }

    this.brokerForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'description': new FormControl(description, Validators.required),
      'phone': new FormControl(phone, 
        [
          Validators.required, 
          Validators.pattern("^[0-9]*$"), 
          Validators.minLength(10)
        ]),
      'location': new FormControl(location, Validators.required)
    })
  }

  onSubmit() {
    if (this.editMode) {
      this.brokerService.updateBroker(
        this.id,
        this.brokerForm.value
      ).subscribe(() => {
        this.fetchData()
      })
    } else {
      this.brokerService.addBroker(
        this.brokerForm.value
      ).subscribe(() => {
        this.fetchData()
      })
    }
  }

  fetchData() {
    this.brokerService.fetchBroker().subscribe(
      response => {
        this.brokerService.brokersChanged.next(response)
        this.router.navigate(['../'], {relativeTo: this.route})
      }
    )
  }
}
