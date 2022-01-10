import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { IRepositories, IRepositoryItems } from '../models/repositories.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private httpClient: HttpClient) {}

  fetchRepositories(query: string): Observable<IRepositoryItems[]> {
    const params = { q: query };

    return this.httpClient
      .get<IRepositories>(environment.apiUrl, { params })
      .pipe(
        map(({ items }: IRepositories) => {
          return items;
        })
      );
  }
}
