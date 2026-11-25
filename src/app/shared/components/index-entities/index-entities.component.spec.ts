import { TestBed } from '@angular/core/testing';
import { IndexEntitiesComponent } from './index-entities.component';
import { ICRUDService } from '../../interfaces/ICRUDService';
import { CRUD_SERVICE_TOKEN } from '../../providers/providers';
import { of } from 'rxjs';
import { RouterModule } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import Swal, { SweetAlertResult } from 'sweetalert2';

describe('IndexEntitiesComponent', () => {
  let mockICRUDService: jasmine.SpyObj<ICRUDService<object, object>>;

  beforeEach(async () => {
    mockICRUDService = jasmine.createSpyObj<ICRUDService<object, object>>(
      'ICRUDService',
      ['getPaginated', 'delete'],
    );

    mockICRUDService.getPaginated.and.returnValue(of());
    mockICRUDService.delete.and.returnValue(of({}));
    await TestBed.configureTestingModule({
      imports: [IndexEntitiesComponent, RouterModule.forRoot([])],
      providers: [{ provide: CRUD_SERVICE_TOKEN, useValue: mockICRUDService }],
    }).compileComponents();
  });

  it('should render the component', () => {
    const fixture = TestBed.createComponent(IndexEntitiesComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should set page to 1 when delete is called', async () => {
    spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve({ isConfirmed: true } as SweetAlertResult),
    );
    const fixture = TestBed.createComponent(IndexEntitiesComponent);
    const component = fixture.componentInstance;
    const id = 1;
    component.pagination.page = 2;

    component.delete(id);

    await fixture.whenStable();

    expect(component.pagination.page).toBe(1);
  });

  it('should render the table if there are records to display', () => {
    const fixture = TestBed.createComponent(IndexEntitiesComponent);
    const component = fixture.componentInstance;
    const response = new HttpResponse<object[]>({body: [{}]});

    mockICRUDService.getPaginated.and.returnValue(of(response));

    component.loadRecords();

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('table').length).toBe(1);
  })
});
