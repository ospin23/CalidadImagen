import { normalizeGenFileSuffix } from '@angular/compiler/src/aot/util';
import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentChecked {

  title = 'image-cleaning';
  name = '';
  constructor(
    private authService: MsalService,
    private shareDataService: ShareDataService,
    private cdref: ChangeDetectorRef
  ) { }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  ngOnInit(): void {
    window.localStorage.clear();
    this.shareDataService.getUsers()
      .subscribe(data => {
        if (data != 0) {
          this.name = data[0].split(' ').map(n => n.substring(0, 1)).join('').toUpperCase();
          console.log('nombre -> ', data[0]);
          console.log('name -> ', this.name);
		  localStorage.nombreUsuario= data[0];
        }
        console.log('data -> ', data);
      });
  }

  logout(): void {
    this.authService.logout();
  }


}
