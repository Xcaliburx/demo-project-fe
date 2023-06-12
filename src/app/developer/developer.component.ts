import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DeveloperService } from './developer.service';
import { Developer } from './developer.model';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.css']
})
export class DeveloperComponent implements OnInit, OnDestroy {
  developers: Developer[] = []
  subscription!: Subscription

  constructor(private developerService: DeveloperService,
    private router:Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchData()
    this.subscription = this.developerService.developersChanged
      .subscribe(() => {
        this.fetchData()
      })
  }

  fetchData () {
    this.developerService.fetchDeveloper().subscribe(response => {
      this.developers = response
    })
  }

  onAddDeveloper() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
