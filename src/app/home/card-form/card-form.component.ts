import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MovieDetails } from '../../models/movie-details.interface';
import { CommonModule, Location } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.scss',
})
export class CardFormComponent implements OnInit {
  userId!: string | null;
  imdbID!: string | null;
  movieDetails!: MovieDetails;
  movieForm = new FormGroup({
    actors: new FormControl(false),
    awards: new FormControl(false),
    boxOffice: new FormControl(false),
    country: new FormControl(false),
    genre: new FormControl(false),
    language: new FormControl(false),
    plot: new FormControl(false),
    released: new FormControl(false),
    type: new FormControl(false),
    writer: new FormControl(false),
    year: new FormControl(false),
  });
  options: string[] = [];
  route = inject(ActivatedRoute);
  apiService = inject(ApiService);
  firebaseService = inject(FirebaseService);
  router = inject(Router);
  location = inject(Location);

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.imdbID = this.route.snapshot.paramMap.get('imdbID');
    this.fetchMovieDetails();
    const state = this.location.getState() as { options?: string[] };
    if (state.options) {
      this.options = state.options;
    } else {
      this.options = [];
    }
  }

  async onSubmit() {
    const id = this.generateRandomId();
    const formValues = this.movieForm.value;
    const movieDetails = {
      ...this.movieDetails,
      selectedDetails: formValues,
      userId: this.userId,
      movieOptions: this.options,
      id: id,
    };
    await this.firebaseService.setDocWithId('movie_details', id, movieDetails);
    this.router.navigate(['/results', this.userId]);
  }

  async fetchMovieDetails() {
    const res = await this.apiService.fetchResultDedails(this.imdbID as string);
    this.movieDetails = res;
  }

  generateRandomId(length: number = 8): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
