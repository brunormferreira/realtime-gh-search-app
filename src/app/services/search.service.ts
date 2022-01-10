import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private httpClient: HttpClient) {}

  fetchRepositories(query: string): Observable<any> {
    const params = { q: query };

    return this.httpClient.get<any>(environment.apiUrl, { params }).pipe(
      map((response: any) => {
        console.log(response);
        return response.items;
      })
    );
  }
}
