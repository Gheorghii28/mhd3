import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_KEY = '9065af0c';

  async fetchResults(searchTerm: string) {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${this.API_KEY}&s=${encodeURIComponent(
        searchTerm
      )}`
    );
    const data = await response.json();
    console.log(`API Antwort:`, data);
    if (data.Response === 'True' && data.Search && data.Search.length > 0) {
      return data.Search;
    }
    return [];
  }

  async fetchResultDedails(imdbID: string) {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${this.API_KEY}&i=${encodeURIComponent(
        imdbID
      )}`
    );
    const data = await response.json();
    console.log(`API Antwort Details:`, data);
    if (data.Response === 'True') {
      return data;
    }
    return [];
  }
}
