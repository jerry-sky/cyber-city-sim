import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Cell } from '../../../../model/map';
import { MatDialog } from '@angular/material/dialog';
import {
  DialogData,
  ProfilePopupComponent,
} from '../profile-popup/profile-popup.component';
import {
  InfoData,
  InfoPopupComponent,
} from '../info-popup/info-popup.component';
import { AuthService } from '../services/auth.service';
import { CityService } from '../services/city.service';
import { HourlyProduction as BuildingsValues } from '../../../../model/resource-production/hourly-production';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  terrain: Cell[];
  currUserId = -1;
  currUsername = '';
  currUserHasLand = false;
  test = true;
  scale = 1;
  // object with data for Profile Popup, used when player clicks cell to see another player stats
  chosenUserData: DialogData = {
    username: '',
    slots: 0,
    buildings: 0,
    production: {
      red: 0,
      green: 0,
      blue: 0,
    },
    resources: {
      red: 0,
      green: 0,
      blue: 0,
    },
  };

  constructor(
    public auth: AuthService,
    private city: CityService,
    private usr: UserService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // get current user data
    this.usr.userDataSignal.subscribe((data) => {
      if (data != null) {
        this.currUserId = data.id;
        this.currUsername = data.username;
        this.currUserHasLand = data.cells !== 0;
      } else {
        this.currUserHasLand = true;
      }
    });
    // get terrain and position
    this.getTerrain();
    const grid = document.getElementsByClassName('allgrid')[0] as HTMLElement;
    grid.style.top = `-${Math.floor(window.innerHeight * 0.25)}px`;
    grid.style.left = `-${Math.floor(window.innerHeight * 0.1)}px`;
    this.checkIfHasLand();
  }

  getTerrain(): void {
    this.city.GetMap().subscribe(
      (res) => (this.terrain = res.cells),
      (err) => console.error('Error retriving map from server')
    );
  }

  checkIfHasLand(): void {
    if (!this.currUserHasLand) {
      this.dialog.open(InfoPopupComponent, {
        width: '600px',
        data: {
          message:
            'You dont have a City yet. Claim a cell of your choice and start the adventure!',
          btn: 'Lets start',
        } as InfoData,
      });
    }
  }

  onScroll(event): void {
    const grid = document.getElementsByClassName('allgrid')[0] as HTMLElement;
    const step = 15;
    // resize
    const mapSizes = grid.getBoundingClientRect();
    const s = mapSizes.width;
    const newSize = event.wheelDelta < 0 ? `${s - step}px` : `${s + step}px`;
    grid.style.width = newSize;
    grid.style.height = newSize;
    // transform
    const deltaX = Math.floor(((event.clientX - mapSizes.x) / s) * step);
    const deltaY = Math.floor(((event.clientY - mapSizes.y) / s) * step);
    const prevX = parseInt(grid.style.left.replace('px', ''), 10);
    const prevY = parseInt(grid.style.top.replace('px', ''), 10);
    grid.style.left =
      event.wheelDelta < 0 ? `${prevX + deltaX}px` : `${prevX - deltaX}px`;
    grid.style.top =
      event.wheelDelta < 0 ? `${prevY + deltaY}px` : `${prevY - deltaY}px`;
    // stop unnecessary next actions
    event.stopPropagation();
    event.preventDefault();
  }

  //method executed when clicking the city on the map
  chosenCity(event): void {
    const id: number = parseInt(event.target.id.replace('user-', ''), 10);
    // clicked cell owned by somebody
    if (id !== -1 && id !== 0) {
      this.chosenUserData = {
        username: 'username',
        slots: 0,
        buildings: 0,
        production: {
          red: 0,
          green: 0,
          blue: 0,
        },
        resources: {
          red: 0,
          green: 0,
          blue: 0,
        },
      };
      this.getUserProduction(id, this.terrain);
      this.getUserResources(id);
      // its user's cell
      if (id === this.currUserId) {
        this.router.navigate([`/city/${this.currUsername}`]);
        // its someone's else cell
      } else {
        this.dialog.open(ProfilePopupComponent, {
          width: '800px',
          data: this.chosenUserData,
        });
      }
      // clicked on empty cell
    } else {
      if (!this.currUserHasLand) {
        // index of choosen cell
        const cellId =
          Array.prototype.indexOf.call(
            event.target.parentNode.childNodes,
            event.target
          ) + 1;
        // ask user if is sure to claim cell
        const dialogRef = this.dialog.open(InfoPopupComponent, {
          width: '600px',
          data: {
            message: `Are you sure you want to claim cell nr. ${cellId}?`,
            btn: 'Claim',
          } as InfoData,
        });
        // claim
        dialogRef.afterClosed().subscribe((res) => {
          if (res) {
            this.city.BuyCell(cellId).subscribe(
              (res2) => {
                this.terrain[cellId - 1].owner = this.currUserId;
                this.currUserHasLand = true;
                this.dialog.open(InfoPopupComponent, {
                  width: '600px',
                  data: {
                    message: `Bravo! You are now a proud owner of your own city. Lets start by buying some buildings!`,
                    btn: 'Start the game',
                  } as InfoData,
                });
                this.usr.addCell();
                this.usr.reloadResources();
              },
              (err) => alert(err.error.errorCode)
            );
          }
        });
      }
    }
  }

  getUserProduction(uid: number, terrain: Cell[]) {
    terrain.forEach((c) => {
      if (c.owner === uid) {
        // count cells
        this.chosenUserData.slots++;
        if (c.buildingType !== -1) {
          // count buildings
          this.chosenUserData.buildings++;
          // count production
          const name = `building-${c.buildingType}-lvl-${c.buildingLvl}`;
          const values = BuildingsValues.default[name];
          this.chosenUserData.production.red += values.red;
          this.chosenUserData.production.green += values.green;
          this.chosenUserData.production.blue += values.blue;
        }
      }
    });
  }

  getUserResources(uid: number) {
    this.usr.GetUserResources(uid).subscribe(
      (res) => {
        this.chosenUserData.username = res.username;
        this.chosenUserData.resources.red = res.redPCB;
        this.chosenUserData.resources.green = res.greenPCB;
        this.chosenUserData.resources.blue = res.bluePCB;
      },
      (err) => console.log(err)
    );
  }
}
