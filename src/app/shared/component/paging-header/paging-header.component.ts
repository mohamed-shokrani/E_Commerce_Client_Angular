import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paging-header',
  templateUrl: './paging-header.component.html',
  styleUrls: ['./paging-header.component.scss'],
})
export class PagingHeaderComponent {
  @Input() pageNumber: number = 0;
  @Input() totalCount: number = 0;
  @Input() pageSize: number = 0;

  @Output() pageChanged = new EventEmitter<number>();
  onPagerChange(event: any) {
    this.pageChanged.emit(event.page);
  }
}
