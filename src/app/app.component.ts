import { Component, OnInit, ViewChild } from '@angular/core';
import { NgProgressComponent } from 'ngx-progressbar';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  tap,
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
  public isLoading: boolean = false;

  public queries$ = new Subject<string>();
  public repositories$!: Observable<IRepositoryItems[]>;

  public page: number = 1;
  public paginationElements: IRepositoryItems[] = [];

  @ViewChild(NgProgressComponent) progressBar!: NgProgressComponent;
  redColor: string = 'red';

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.repositories$ = this.queries$.pipe(
      tap(() => this.progressBar.start()),
      map((query: string) => (query ? query.trim() : '')),
      filter(Boolean),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((query: string) => this.searchService.fetchRepositories(query)),
      tap(() => this.progressBar.complete())
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
