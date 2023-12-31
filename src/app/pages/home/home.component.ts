import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) + 1500;
    const max =
      document.documentElement.scrollHeight || document.body.scrollHeight;

    if (pos > max) {
      if (this.peliculasService.cargando) {
        return;
      }
      this.peliculasService.getCartelera().subscribe((resp) => {
        this.movies.push(...resp);
      });
    }
  }

  public movies: Movie[] = [];
  public moviesSlideshow: Movie[] = [];

  constructor(private peliculasService: PeliculasService) {}

  ngOnInit(): void {
    this.peliculasService.getCartelera().subscribe((movies) => {
      this.movies = movies;
      this.moviesSlideshow = movies;
    });
  }

  ngOnDestroy(): void {
    this.peliculasService.resetCarteleraPage();
  }
}
