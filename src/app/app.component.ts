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
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  queries$ = new Subject<string>();
  repositories$!: Observable<any[]>;

  page: number = 1;
  paginationEl: any[] = [];

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

  searchRepos($event: any) {
    this.queries$.next($event.target.value);
  }

  setPagination(): void {
    this.repositories$.subscribe((repositories: any[]) => {
      this.paginationEl = repositories;
    });
  }
}
