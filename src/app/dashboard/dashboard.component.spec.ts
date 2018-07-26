import { TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';

import { HeroService } from '../hero.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;

  beforeEach(async(() => {
    const svcSpy = jasmine.createSpyObj<HeroService>(['getHeroes']);
    svcSpy.getHeroes.and.returnValue(of([
      {id: 0, name: 'Atta Boy'},
      {id: 1, name: 'Thatsmy Girl'},
      {id: 2, name: 'Soccer Mom'},
    ]));

    TestBed.configureTestingModule({
      providers: [
        DashboardComponent,
        { provide: HeroService, useValue: svcSpy }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    component = TestBed.get(DashboardComponent);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should skip the first hero', () => {
    component.ngOnInit();
    expect(component.heroes).toEqual([{id: 1, name: 'Thatsmy Girl'}, {id: 2, name: 'Soccer Mom'}]);
  });
});
