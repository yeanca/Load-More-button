import { HttpClient } from '@angular/common/http';
import { HttpBackend } from '@angular/common/http';
import { Component, VERSION } from '@angular/core';
import { Album } from '../../album';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  Album: Album[] = [];
  AlbumArr: Album[] = [];
  isArrEmpty: boolean = false;
  number: number;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  loadList() {
    let url = 'https://jsonplaceholder.typicode.com/albums?_limit=5'; //fetches 5 items
    this.http.get<Album[]>(url).subscribe((response) => {
      this.Album = response;
    });
    let urlArr =
      'https://jsonplaceholder.typicode.com/albums?_limit=' + this.number; //fetches specified items
    this.http.get<Album[]>(urlArr).subscribe((response) => {
      this.AlbumArr = response;
    });
  }

  loadMore() {
    if (this.Album.length - 1) {
      let big = this.AlbumArr.splice(5, 5);
      //to disable the loadMore button
      //the remainder of the array will be the elements 0 to 4 in the AlbumArr
      if (this.AlbumArr.length <= 5) {
        this.isArrEmpty = true;
      } else this.isArrEmpty = false;
      if (big.length > 0) {
        let Arr = this.Album.concat(big);
        this.Album = Arr;
      }
    }
  }

  reset() {
    window.location.reload();
  }
}
