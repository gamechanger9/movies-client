import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ActorCreationDTO, ActorDTO } from './actors.models';
import { Observable } from 'rxjs';
import { PaginationDTO } from '../shared/models/paginationDTO';
import { buildQueryParams } from '../shared/components/functions/buildQueryParams';
import { ICRUDService } from '../shared/interfaces/ICRUDService';

@Injectable({
  providedIn: 'root',
})
export class ActorsService implements ICRUDService<ActorDTO, ActorCreationDTO> {
  constructor() {}

  private http = inject(HttpClient);
  private baseURL = environment.apiURL + '/actors';

  public create(actor: ActorCreationDTO) {
    const formData = this.buildFormData(actor);
    return this.http.post(this.baseURL, formData);
  }

  private buildFormData(actor: ActorCreationDTO): FormData {
    const formData = new FormData();

    formData.append('name', actor.name);
    formData.append(
      'dateOfBirth',
      actor.dateOfBirth.toISOString().split('T')[0],
    );

    if (actor.picture) {
      formData.append('picture', actor.picture);
    }
    return formData;
  }

  public getPaginated(
    pagination: PaginationDTO,
  ): Observable<HttpResponse<ActorDTO[]>> {
    let queryParams = buildQueryParams(pagination);
    return this.http.get<ActorDTO[]>(this.baseURL, {
      params: queryParams,
      observe: 'response',
    });
  }

  public getById(id: number): Observable<ActorDTO> {
    return this.http.get<ActorDTO>(`${this.baseURL}/${id}`);
  }

  public update(id: number, actor: ActorCreationDTO) {
    const formData = this.buildFormData(actor);
    return this.http.put(`${this.baseURL}/${id}`, formData);
  }

  public delete(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
