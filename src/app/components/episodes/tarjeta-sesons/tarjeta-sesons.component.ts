import { Component, Input } from '@angular/core';
import { Episodes } from '../../interfaces/episode.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarjeta-sesons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-sesons.component.html',
  styleUrl: './tarjeta-sesons.component.css'
})
export class TarjetaSesonsComponent {

 @Input () items: Episodes[] = [];
 @Input() pathVideo: string='';
 @Input() pathImg: string = '';

 showVideo: boolean = false;

 toggleVideo() {
   this.showVideo = !this.showVideo;
 }

}
