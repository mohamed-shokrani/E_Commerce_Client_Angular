import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './component/paging-header/paging-header.component';
import { PagerComponent } from './component/pager/pager.component';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent, NotfoundComponent],
  imports: [CommonModule, PaginationModule.forRoot(), CarouselModule.forRoot()],
  exports: [PaginationModule, PagerComponent, PagingHeaderComponent],
})
export class SharedModule {}
