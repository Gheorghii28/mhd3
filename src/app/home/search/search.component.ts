import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Subject } from 'rxjs';
import { Poster } from '../../models/poster.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardFormComponent } from '../card-form/card-form.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CardFormComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  userId!: string | null;
  private resultSubject = new Subject<Poster[]>();
  results$ = this.resultSubject.asObservable();
  searchResults: Poster[] = [];

  searchForm = new FormGroup({
    searchTerm: new FormControl('', Validators.required),
  });

  apiService = inject(ApiService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    this.results$.subscribe((result: Poster[]) => {
      console.log(result);
      this.searchResults = result;
    });
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  async performSearch() {
    const searchTerm = this.searchForm.controls.searchTerm.value as string;
    this.searchForm.reset();
    const searchResults = await this.apiService.fetchResults(searchTerm);
    this.setResult(searchResults);
  }

  setResult(result: Poster[]) {
    this.resultSubject.next(result);
  }

  openCard(imdbID: string) {
    this.router.navigate(['/card', this.userId, imdbID]);
  }
}
