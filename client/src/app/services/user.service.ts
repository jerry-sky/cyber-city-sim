import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../../model/user';
import { HourlyProduction as BuildingsValues } from '../../../../model/resource-production/hourly-production';
import { Observable } from 'rxjs';
import { SimpleIdRequest } from '../../../../model/server-requests';
import { BackendService } from '../services/backend.service';
import { map } from 'rxjs/operators';
import { CityService } from './city.service';
import { ResourceInterval } from '../../../../model/terrain-type';

/**
 * Object containing all user data used in app
 */
interface UserData extends User {
  production: {
    red: number;
    green: number;
    blue: number;
  };
  cells: number;
  buildings: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // observable used for propagating changes in user data
  userDataSignalSource = new BehaviorSubject<UserData | null>(null);
  userDataSignal = this.userDataSignalSource.asObservable();

  constructor(private backend: BackendService, private city: CityService) {
    const data = this.read();
    if (data !== null) {
      this.userDataSignalSource.next(data);
    }
    window.setInterval(
      this.incrementResources.bind(this),
      1000 * ResourceInterval
    );
  }

  /**
   * Create object storing user data using info from login
   *
   * @param user object returned when logging in
   */
  public create(user: User): void {
    const data = {
      ...user,
      production: {
        red: 0,
        green: 0,
        blue: 0,
      },
      cells: 0,
      buildings: 0,
    };
    this.city.GetMap().subscribe((res) => {
      res.cells.forEach((c) => {
        if (c.owner === user.id) {
          // count cells
          data.cells++;
          if (c.buildingType !== -1) {
            // count buildings
            data.buildings++;
            // count production
            const name = `building-${c.buildingType}-lvl-${c.buildingLvl}`;
            const values = BuildingsValues.default[name];
            data.production.red += values.red;
            data.production.green += values.green;
            data.production.blue += values.blue;
          }
        }
      });
      this.save(data);
    });
  }

  /**
   * Remove object storing user data from session memory
   */
  public remove(): void {
    this.save(null);
  }

  /**
   * Check if is authenticated (if any user data is stored)
   */
  public authenticated(): boolean {
    return this.read() !== null;
  }

  /**
   * Get user resources
   * 
   * @param userId number id of user
   */
  public GetUserResources(userId: number): Observable<User> {
    // if everything went okay, then the response contains map's data
    const payload: SimpleIdRequest = {
      userId,
    };
    return this.backend
      .getUserResources(payload)
      .pipe(map((response) => response.user || null));
  }

  /**
   * Every `ResourceInterval` seconds increment each resource
   */
  public incrementResources(): void {
    const data = this.read();
    if (data !== null) {
      data.redPCB += data.production.red;
      data.greenPCB += data.production.green;
      data.bluePCB += data.production.blue;
      this.save(data);
    }
  }

  /**
   * Increase number of buildings
   */
  public addBuilding(): void {
    const data = this.read();
    if (data !== null) {
      data.buildings++;
      this.save(data);
    }
  }

  /**
   * Increase number of cells
   */
  public addCell(): void {
    const data = this.read();
    if (data !== null) {
      data.cells++;
      this.save(data);
    }
  }

  /**
   * Edit number of specified resource
   */
  public addResource(resource: string, value: number): void {
    const data = this.read();
    if (data !== null) {
      data[resource] += value;
      if (data[resource] < 0) {
        this.reloadResources();
      } else {
        this.save(data);
      }
    }
  }

  /**
   * Get resources from server
   */
  public async reloadResources(): Promise<void> {
    const data = this.read();
    if (data !== null) {
      // get resources from server
      await this.GetUserResources(data.id).subscribe(
        (res) => {
          data.redPCB = res.redPCB;
          data.greenPCB = res.greenPCB;
          data.bluePCB = res.bluePCB;
        },
        (err) => console.log(err)
      );
      // recalculate production
      data.production.red = 0;
      data.production.green = 0;
      data.production.blue = 0;
      await this.city.GetMap().subscribe((res) => {
        res.cells.forEach((c) => {
          if (c.owner === data.id && c.buildingType !== -1) {
            const name = `building-${c.buildingType}-lvl-${c.buildingLvl}`;
            const values = BuildingsValues.default[name];
            data.production.red += values.red;
            data.production.green += values.green;
            data.production.blue += values.blue;
          }
        });
        this.save(data);
      });
    }
  }

  /**
   * Save object storing user data to session memory
   *
   * @param userData object containing all data
   */
  private save(userData: UserData): void {
    sessionStorage.setItem('user-data-2', JSON.stringify(userData));
    this.userDataSignalSource.next(userData);
  }

  /**
   * Get object storing user data from session memory
   */
  private read(): UserData {
    return JSON.parse(sessionStorage.getItem('user-data-2')) as UserData;
  }
}
