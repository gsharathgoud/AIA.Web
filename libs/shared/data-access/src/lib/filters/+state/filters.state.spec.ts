import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { FiltersState } from './filters.state';
import { SetGlobalFilter } from './filters.actions';
import { environment } from '../../../environments/environment';

describe('Filters actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([FiltersState], {
          developmentMode: !environment.production,
        }),
      ],
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    store.dispatch(new SetGlobalFilter({ type: 'Consulting', company: 'Insight' }));
    store
      .select((state) => state.filters.globalFilters)
      .subscribe((globalFilters: string[]) => {
        expect(globalFilters).toEqual(
          jasmine.objectContaining({ type: 'Consulting', company: 'Insight' })
        );
      });
  });
});
