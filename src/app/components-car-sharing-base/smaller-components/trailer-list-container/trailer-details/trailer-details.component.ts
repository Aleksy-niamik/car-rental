import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Trailer } from 'src/app/models/trailer';
import { Utils } from 'src/app/utils/utils';
import { HookType } from 'src/app/models/enums/hook-type';
import { LendStatus } from 'src/app/models/enums/lend-status';

@Component({
  selector: 'trailer-details',
  templateUrl: './trailer-details.component.html',
  styleUrls: ['./trailer-details.component.css']
})
export class TrailerDetailsComponent implements OnInit {
  @Input()
  public displayedTrailer: Trailer;

  @Output()
  public onClose: EventEmitter<void> = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit() { }

  async ngAfterViewInit() {
    await $('.table').animate({'width': '60%'}, 40, 'linear').promise();
    $('.details').animate({'right': '0%'}, 430, 'linear');
    
  }

  private async close(): Promise<void> {
    $('.table').animate({'width': '94%'}, 140, 'linear').promise();    
    await $('.details').animate({'right': '-33%'}, 430, 'linear').promise();
    this.onClose.emit();
    return new Promise<void>( (resolve, reject) => {});
  }
  
  public getHookType(type: HookType): string {
    return Utils.translateHookType(type);
  }

  public getLendStatus(type: LendStatus): string {
    return Utils.translateLendStatus(type);
  }
}
