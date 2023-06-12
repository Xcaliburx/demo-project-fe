import { Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  selectedFiles?: FileList
  currentFile?: File
  profile!: {
    'id': number,
    'email': string,
    'roles': string
  }

  constructor(private profileService: ProfileService,
    private router: Router) {}

  ngOnInit(): void {
    this.profileService.getProfile()
      .subscribe(response => this.profile = response)
  }

  selectFile (event: any) {
    this.selectedFiles = event.target.files
  }

  upload () {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0)

      if (file) {
        this.currentFile = file

        this.profileService.upload(this.currentFile).subscribe(
          response => {
            console.log(response)
          }
        )
      }

      this.selectedFiles = undefined
      this.router.navigate(['/developers'])
    }
  }
}
