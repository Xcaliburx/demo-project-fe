import { ActivatedRoute, Router, Params } from '@angular/router';
import { DeveloperService } from './../developer.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Developer } from './../developer.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-developer-detail',
  templateUrl: './developer-detail.component.html',
  styleUrls: ['./developer-detail.component.css']
})
export class DeveloperDetailComponent implements OnInit, OnDestroy {
  developer!: Developer
  id!: number
  subscription!: Subscription
  serviceSubs!: Subscription
  image?: SafeUrl

  constructor(private developerService: DeveloperService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer) {}

    ngOnInit(): void {
      this.image = undefined
      this.subscription = this.route.params
        .subscribe(
          (params: Params) => {
            this.id = +params['id']
            this.serviceSubs = this.developerService.getDeveloperById(this.id)
              .subscribe(developer => {
                this.developer = developer
                console.log(developer)
                if (developer.image) {
                  let objectURL = 'data:image/png;base64,' + developer.image.file
                  this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL)
                }
              })
          }
        )
    }

    onEdit() {
      this.router.navigate(['edit'],
        {
          relativeTo: this.route,
          queryParams: {
            'name': this.developer.name,
            'location': this.developer.location,
            'fee': this.developer.fee
          }
        })
    }

    onDelete() {
      if (confirm("Are you sure you want to delete this data?")) {
        this.developerService.deleteDeveloper(this.developer.id).subscribe()
        this.developerService.fetchDeveloper().subscribe(
          response => {
            this.developerService.developersChanged.next(response)
            this.router.navigate(['../'], {relativeTo: this.route})
          }
        )
      
      }
    }

    onDeleteProject(id: number) {
      if (confirm("Are you sure you want to delete this project?")) {
        this.developerService.deleteProject(id).subscribe()
        this.router.navigate(['../'], {relativeTo: this.route})
      }
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe()
      this.serviceSubs.unsubscribe()
    }
}
