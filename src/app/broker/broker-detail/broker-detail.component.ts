import { Subscription } from 'rxjs';
import { BrokerService } from './../broker.service';
import { Broker } from './../broker.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-broker-detail',
  templateUrl: './broker-detail.component.html',
  styleUrls: ['./broker-detail.component.css']
})
export class BrokerDetailComponent implements OnInit, OnDestroy {
  broker!: Broker
  id!: number
  subscription!: Subscription
  serviceSubs!: Subscription
  
  constructor(private brokerService: BrokerService, 
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']
          this.serviceSubs = this.brokerService.getBrokerById((this.id))
            .subscribe(broker => {
              this.broker = broker
            })
        }
      )
  }

  onEdit() {
    this.router.navigate(['edit'], 
      {
        relativeTo: this.route,
        queryParams: {
          'name': this.broker.name,
          'desc': this.broker.description,
          'phone': this.broker.phone,
          'location': this.broker.location
        }
      })
  }

  onDelete() {
    if (confirm("Are you sure you want to delete this data?")) {
      this.brokerService.deleteBroker(this.broker.id).subscribe()
      this.brokerService.fetchBroker().subscribe(
        response => {
          this.brokerService.brokersChanged.next(response)
          this.router.navigate(['../'], {relativeTo: this.route})
        }
      )
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
    this.serviceSubs.unsubscribe()
  }
}
