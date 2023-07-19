import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  constructor(private http: HttpClient) {}
  private url = 'https://myfakeapi.com/api/cars/';
  private resArr: Subject<IcarArr> = new Subject<IcarArr>();

  getCars(): Observable<IcarArr> {
    if (this.resArr.observers.length === 0) {
      this.http.get<IcarArr>(this.url).subscribe(
        (data) => {
          if (data && data.cars) {
            this.resArr.next(data);
            data.cars.forEach((car) => {
              car.isEditing = false;
            });
          } else {
            console.error('Invalid data received');
          }
        },
        (error) => {
          console.error(error);
        }
      );
    }
    return this.resArr.asObservable();
  }
}
export interface IcarArr {
  cars: Icar[];
}

export interface Icar {
  availability: boolean;
  car: string;
  car_color: string;
  car_model: string;
  car_model_year: string;
  car_vin: string;
  id: string;
  price: string;
  isEditing: boolean;
}
