import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MovieDetails } from '../../models/movie-details.interface';
import { CommonModule } from '@angular/common';
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
  route = inject(ActivatedRoute);
  apiService = inject(ApiService);
  firebaseService = inject(FirebaseService);
  router = inject(Router);

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.imdbID = this.route.snapshot.paramMap.get('imdbID');
    this.fetchMovieDetails();
  }

  async onSubmit() {
    const formValues = this.movieForm.value;
    const movieDetails = {
      ...this.movieDetails,
      selectedDetails: formValues,
      userId: this.userId,
    };
    await this.firebaseService.addDocument('movie_details', movieDetails);
    this.router.navigate(['/results', this.userId]);
  }

  async fetchMovieDetails() {
    const res = await this.apiService.fetchResultDedails(this.imdbID as string);
    this.movieDetails = res;
  }
}
