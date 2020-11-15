import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-city-view',
  templateUrl: './city-view.component.html',
  styleUrls: ['./city-view.component.scss']
})
export class CityViewComponent implements OnInit {
  user_id: string;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getUsername();
  }

  getUsername(): void {
    const user_id = this.route.snapshot.paramMap.get('user_id');
    // primitive mock
    this.user_id = user_id
    /* in the future:
    this.someService.getUser(username)
      .subscribe(username => this.username = username);
    */
  }

}
