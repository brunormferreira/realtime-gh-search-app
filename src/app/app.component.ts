import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
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
import { ProgressBarService } from './services/progress.service';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title: string = 'Angular Search Engine';
  public isLoading: boolean = false;
  public redColor: string = 'red';

  public queries$ = new Subject<string>();
  public repositories$!: Observable<IRepositoryItems[]>;

  public page: number = 1;
  public paginationElements: IRepositoryItems[] = [];

  constructor(
    private searchService: SearchService,
    private router: Router,
    private progressBarService: ProgressBarService,
    private progress: NgProgress
  ) {}

  ngOnInit() {
    this.progressBarService.progressRef = this.progress.ref('progressBar');

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
    const query = $event.target.value;
    this.queries$.next(query);
    this.router.navigate([], { queryParams: { query } });
  }

  setPagination(): void {
    this.repositories$.subscribe((repositories: IRepositoryItems[]) => {
      this.paginationElements = repositories;
    });
  }
}
