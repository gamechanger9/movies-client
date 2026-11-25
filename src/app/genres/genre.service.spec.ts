import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { GenresService } from './genres.service';
import { firstValueFrom } from 'rxjs';

describe('GenresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
  });

  it('should render the service correctly', () => {
    const genresService = TestBed.inject(GenresService);
    expect(genresService).toBeTruthy();
  });

  it('should issue a GET request to obtain all of the genres', () => {
    const genresService = TestBed.inject(GenresService);
    const httpsTesting = TestBed.inject(HttpTestingController);
    const getAll$ = genresService.getAll();

    firstValueFrom(getAll$);

    const req = httpsTesting.expectOne((request) => request.url.endsWith('/api/genres/all'));
    expect(req.request.method).toBe('GET');
  })
});
