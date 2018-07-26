import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HeroService } from '../hero.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    const svcSpy = jasmine.createSpyObj<HeroService>(['getHeroes']);
    svcSpy.getHeroes.and.returnValue(of([
      {id: 0, name: 'Atta Boy'},
      {id: 1, name: 'Thatsmy Girl'},
      {id: 2, name: 'Soccer Mom'},
    ]));

    TestBed.configureTestingModule({
      declarations: [DashboardComponent, HeroSearchComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        { provide: HeroService, useValue: svcSpy }
      ],
      // schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should skip the first hero', () => {
    expect(component.heroes).toEqual([{id: 1, name: 'Thatsmy Girl'}, {id: 2, name: 'Soccer Mom'}]);
  });

  it('should display 1 link', () => {
    expect(fixture.nativeElement.querySelectorAll('a').length).toBe(2);
  });
});
