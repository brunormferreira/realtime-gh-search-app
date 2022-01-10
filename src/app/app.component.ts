import { Component, OnInit } from '@angular/core';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs';
import { IRepositoryItems } from './models/repositories.model';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title: string = 'Angular Search Engine';

  public queries$ = new Subject<string>();
  public repositories$!: Observable<IRepositoryItems[]>;

  public page: number = 1;
  public paginationElements: IRepositoryItems[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.repositories$ = this.queries$.pipe(
      map((query: string) => (query ? query.trim() : '')),
      filter(Boolean),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((query: string) => this.searchService.fetchRepositories(query))
    );

    this.setPagination();
  }

  onSearchRepositories($event: any): void {
    this.queries$.next($event.target.value);
  }

  setPagination(): void {
    this.repositories$.subscribe((repositories: IRepositoryItems[]) => {
      this.paginationElements = repositories;
    });
  }
}
