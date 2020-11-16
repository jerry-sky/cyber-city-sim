import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-city-view',
  templateUrl: './city-view.component.html',
  styleUrls: ['./city-view.component.scss']
})
export class CityViewComponent implements OnInit {
  username: string;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getUsername();
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
    });
  }

  getUsername(): void {
    const username = this.route.snapshot.paramMap.get('username');
    // primitive mock
    
    this.username = username
    /* in the future:
    this.someService.getUser(username)
      .subscribe(username => this.username = username);
    */
  }

}
