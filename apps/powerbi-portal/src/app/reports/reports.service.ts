import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigResponse } from './reports.component';

@Injectable({
  providedIn: 'root',
})

/**
 * Service to make Powerbi HTTP calls
 */
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  /**
   * @returns powerbi embed configuration
   */
  getEmbedConfig(endpoint: string): Observable<ConfigResponse> {
    return this.httpClient.get<ConfigResponse>(endpoint);
  }
}
