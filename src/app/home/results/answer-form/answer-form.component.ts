import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-answer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './answer-form.component.html',
  styleUrl: './answer-form.component.scss',
})
export class AnswerFormComponent implements OnInit {
  @Input() title!: string;
  @Input() options: string[] | undefined;
  @Input() id!: string;
  shuffledOptions: string[] = [];
  answerForm = new FormGroup({
    answer: new FormControl('', Validators.required),
  });
  answerStatus = true;

  firebaseService = inject(FirebaseService);
  localStorageService = inject(LocalStorageService);

  ngOnInit(): void {
    this.shuffleOptions();
  }

  onSubmit() {
    this.answerStatus = true;
    const selectedAnswer = this.answerForm.value.answer;
    const userName = this.localStorageService.getItem('username');
    if (selectedAnswer === this.title) {
      this.firebaseService.updateDocument(
        'movie_details',
        this.id,
        'resolved',
        true
      );
      this.firebaseService.updateDocument(
        'movie_details',
        this.id,
        'resolvedUser',
        userName
      );
    } else {
      this.answerStatus = false;
    }
  }

  shuffleOptions(): void {
    if (this.options) {
      this.shuffledOptions = [...this.options, this.title];
      for (let i = this.shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.shuffledOptions[i], this.shuffledOptions[j]] = [
          this.shuffledOptions[j],
          this.shuffledOptions[i],
        ];
      }
    } else {
      console.warn('Options is not defined.');
      this.shuffledOptions = [this.title];
    }
  }
}
