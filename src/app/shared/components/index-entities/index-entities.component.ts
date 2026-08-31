import { Component, inject, input, Input } from '@angular/core';
import { PaginationDTO } from '../../models/paginationDTO';
import { CRUD_SERVICE_TOKEN } from '../../providers/providers';
import { HttpResponse } from '@angular/common/http';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { GenericListComponent } from '../generic-list/generic-list.component';
import { ICRUDService } from '../../interfaces/ICRUDService';

@Component({
  selector: 'app-index-entities',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    GenericListComponent,
    MatPaginatorModule,
  ],
  templateUrl: './index-entities.component.html',
  styleUrl: './index-entities.component.css',
})
export class IndexEntitiesComponent<TDTO, TCreationDTO> {
  CRUDService = inject(CRUD_SERVICE_TOKEN) as ICRUDService<TDTO, TCreationDTO>;
  entities!: TDTO[];
  pagination: PaginationDTO = { page: 1, recordsPerPage: 5 };
  totalRecordsCount!: number;

  @Input({ required: true })
  title!: string;

  @Input({ required: true })
  createRoute!: string;

  @Input({ required: true })
  editRoute!: string;

  @Input()
  columnsToDisplay = ['id', 'name', 'actions'];

  constructor() {
    this.loadRecords();
  }

  loadRecords() {
    this.CRUDService.getPaginated(this.pagination).subscribe(
      (response: HttpResponse<TDTO[]>) => {
        this.entities = response.body as TDTO[];
        const header = response.headers.get('total-records-count') as string;
        this.totalRecordsCount = parseInt(header, 10);
      },
    );
  }

  updatePagination(data: PageEvent) {
    this.pagination = {
      page: data.pageIndex + 1,
      recordsPerPage: data.pageSize,
    };
    this.loadRecords();
  }

  delete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Genre has been deleted.',
          icon: 'success',
        });
        this.CRUDService.delete(id).subscribe({
          next: () => {
            this.loadRecords();
            this.pagination.page = 1;
          },
        });
      }
    });
  }

  firstLetterToUppercase(text: string) {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
