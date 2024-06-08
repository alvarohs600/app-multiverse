import { Component, OnInit } from '@angular/core';
import { RickMortyService } from '../shared/services/rick-morty.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit{
   questions:any [] = [];
  constructor(private service: RickMortyService, private router: Router){

  }
  ngOnInit() {
  
  }

 
  
}
