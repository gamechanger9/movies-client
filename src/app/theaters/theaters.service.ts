import { inject, Injectable } from '@angular/core';
import { TheaterCreationDTO, TheaterDTO } from './theaters.model';
import { ICRUDService } from '../shared/interfaces/ICRUDService';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginationDTO } from '../shared/models/paginationDTO';
import { environment } from '../../environments/environment';
import { buildQueryParams } from '../shared/functions/buildQueryParams';

@Injectable({
  providedIn: 'root',
})
export class TheatersService implements ICRUDService<
  TheaterDTO,
  TheaterCreationDTO
> {
  constructor() {}

  private http = inject(HttpClient);
  private baseURL = environment.apiURL + '/theaters';
  getPaginated(
    pagination: PaginationDTO,
  ): Observable<HttpResponse<TheaterDTO[]>> {
    let queryParams = buildQueryParams(pagination);
    return this.http.get<TheaterDTO[]>(this.baseURL, {
      observe: 'response',
      params: queryParams,
    });
  }
  getById(id: number): Observable<TheaterDTO> {
    return this.http.get<TheaterDTO>(`${this.baseURL}/${id}`);
  }
  create(entity: TheaterCreationDTO): Observable<any> {
    return this.http.post(this.baseURL, entity);
  }
  update(id: number, entity: TheaterCreationDTO): Observable<any> {
    return this.http.put(`${this.baseURL}/${id}`, entity);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
