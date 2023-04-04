import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-angular';
  @HostListener('window:unload', ['$event'])
  unloadHandler(event:any) {
    localStorage.clear();
  }
}
