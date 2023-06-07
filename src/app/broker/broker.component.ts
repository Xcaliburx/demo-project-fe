import { Broker } from './broker.model';
import { BrokerService } from './broker.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-broker',
  templateUrl: './broker.component.html',
  styleUrls: ['./broker.component.css']
})
export class BrokerComponent implements OnInit, OnDestroy {
  brokers: Broker[] = []
  subscription!: Subscription
  
  constructor(private brokerService: BrokerService, 
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchData()
    this.subscription = this.brokerService.brokersChanged
      .subscribe(() => {
        this.fetchData()
      })
  }

  fetchData() {
    this.brokerService.fetchBroker().subscribe(response => {
      this.brokers = response
    })
  }

  onAddBroker() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
