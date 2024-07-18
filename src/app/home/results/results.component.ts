import { Component, inject, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { MovieDetails } from '../../models/movie-details.interface';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent implements OnInit {
  unsubscribe: any;
  movieDetails!: MovieDetails[];

  db = inject(Firestore);
  firebaseService = inject(FirebaseService);

  ngOnInit(): void {
    const q = query(collection(this.db, 'movie_details'));
    this.unsubscribe = onSnapshot(q, (querySnapshot) => {
      const movieDetails: any[] = [];
      querySnapshot.forEach(async (doc) => {
        const data = doc.data() as MovieDetails;
        const user = await this.firebaseService.getCollection(
          'users',
          data?.userId as string
        );
        data.userName = user?.['name'] as string;
        movieDetails.push(data);
      });
      console.log('Current cities in CA: ', movieDetails);
      this.movieDetails = movieDetails;
    });
  }
}
