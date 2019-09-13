import { Component, OnInit, Injectable, EventEmitter, Output } from '@angular/core';
import { Trailer } from 'src/app/models/trailer';
import { Subject } from 'rxjs';
import { TrailerRepository } from 'src/app/repositories/trailer.repository';
import { HookType } from 'src/app/models/enums/hook-type';
import { Utils } from 'src/app/utils/utils';
import { LendStatus } from 'src/app/models/enums/lend-status';

@Injectable()
@Component({
  selector: 'trailer-list',
  templateUrl: './trailer-list.component.html',
  styleUrls: ['./trailer-list.component.css']
})
export class TrailerListComponent implements OnInit {
  private dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<void> = new Subject<void>();
  public trailers: Trailer[];

  @Output()
  public onTrailerSelected = new EventEmitter<Trailer>();

  public selectedTrailer: Trailer;

  constructor( private trailerRepository: TrailerRepository) { }

  ngOnInit() { 
    this.initTable();
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  private onRowClicked(data: Trailer): void {
    this.onTrailerSelected.emit(data);
    this.selectedTrailer = data;
  }

  private async initTable(): Promise<void> {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.trailers = await this.trailerRepository.getAll();
    this.dtTrigger.next();
  }

  public getHookType(type: HookType): string {
      return Utils.translateHookType(type);
  }

  public getLendStatus(type: LendStatus): string {
    return Utils.translateLendStatus(type);
  }
}
