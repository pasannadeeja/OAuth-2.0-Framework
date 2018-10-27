import { Component, OnInit } from '@angular/core';
import { DataService } from '../../app/data.service'
@Component({
  selector: 'app-posts-page',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(private _DataService: DataService) { }

  Data: any = {};
  repoData: any = [];

  ngOnInit() {

    this._DataService.generateToken(this.getCode())
      .subscribe((data) => {
        this._DataService.setToken(data);
        this._DataService.getUserInfo().subscribe((userData) => {
          console.log(userData);
          this.Data = userData;
        });
      });
  }

  getCode() {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('code');
  }

}
