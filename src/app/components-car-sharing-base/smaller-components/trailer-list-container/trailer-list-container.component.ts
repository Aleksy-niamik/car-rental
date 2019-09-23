import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { Trailer } from 'src/app/models/trailer';
import { TrailerListComponent } from './trailer-list/trailer-list.component';

@Component({
  selector: 'trailer-list-container',
  templateUrl: './trailer-list-container.component.html',
  styleUrls: ['./trailer-list-container.component.css']
})
export class TrailerListContainerComponent implements OnInit {

  public selectedTrailer: Trailer;

  @ViewChild(TrailerListComponent, {static: false})
  public trailerListComponent: TrailerListComponent;

  constructor() { }

  ngOnInit() { 
  }

  public trailerSelected(data: Trailer): void {
    this.selectedTrailer = data;
  }

  private close(): void {
    this.trailerListComponent.selectedTrailer = undefined;
    this.selectedTrailer = undefined;    
  }
}