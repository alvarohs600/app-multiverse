import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',

})
export class LoadingComponent {

  ngOnInit(): void {
    
  }

  showAlertAfterDelay(): void {
    setTimeout(() => {
      alert('There isn´t any characters');
    }, 2000);
  }

}
