import { of } from 'rxjs';

import { HeroService } from '../hero.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;

  beforeEach(() => {
    const svcSpy = jasmine.createSpyObj<HeroService>(['getHeroes']);
    svcSpy.getHeroes.and.returnValue(of([
      {id: 0, name: 'Atta Boy'},
      {id: 1, name: 'Thatsmy Girl'},
      {id: 2, name: 'Soccer Mom'},
    ]));

    component = new DashboardComponent(svcSpy);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should skip the first hero', () => {
    component.ngOnInit();
    expect(component.heroes).toEqual([{id: 1, name: 'Thatsmy Girl'}, {id: 2, name: 'Soccer Mom'}]);
  });
});
