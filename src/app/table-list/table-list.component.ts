import { Component, OnInit } from '@angular/core';
import { CarsService, Icar, IcarArr } from '../cars.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
})
export class TableListComponent implements OnInit {
  request: string = '';
  editAvailability: string = '';
  editColor: string = '';
  editPrice: string = '';
  carArr: IcarArr = {
    cars: [],
  };
  p: number = 1;
  isAdding = false;
  addCarForm!: FormGroup;
  editCarForm!: FormGroup;

  constructor(
    private carService: CarsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe((cars: IcarArr) => {
      this.carArr = cars;
    });
    this.addCarForm = this.formBuilder.group({
      addCompany: ['', Validators.required],
      addModel: ['', Validators.required],
      addVIN: ['', Validators.required],
      addYear: ['', Validators.required],
      addColor: ['', Validators.required],
      addPrice: ['', Validators.required],
      addAvailability: ['', Validators.required],
    });
    this.editCarForm = this.formBuilder.group({
      editColor: ['', Validators.required],
      editPrice: ['', Validators.required],
      editAvailability: ['', Validators.required],
    });
  }

  get addFormControls() {
    return this.addCarForm.controls;
  }
  onDelete(item: Icar): void {
    let question = confirm('Are you sure you want to delete?');
    if (question) {
      const index = this.carArr.cars.indexOf(item);
      if (index !== -1) {
        this.carArr.cars.splice(index, 1);
      }
    }
    return;
  }

  onEdit(i: Icar): void {
    i.isEditing = true;
  }

  onClose(i: Icar): void {
    i.isEditing = false;
  }

  onSave(i: Icar): void {
    if (this.editCarForm.valid) {
      i.availability = Boolean(this.editCarForm.value.editAvailability);
      i.car_color = this.editCarForm.value.editColor;
      i.price = this.editCarForm.value.editPrice;
      i.isEditing = false;
      this.editCarForm.reset();
    }
  }

  onAdd(): void {
    this.isAdding = true;
  }

  onAddClose(): void {
    this.isAdding = false;
  }

  onAddSave(): void {
    if (this.addCarForm.valid) {
      const newCar: Icar = {
        car: this.addCarForm.value.addCompany,
        car_color: this.addCarForm.value.addColor,
        car_model: this.addCarForm.value.addModel,
        car_model_year: this.addCarForm.value.addYear,
        car_vin: this.addCarForm.value.addVIN,
        price: this.addCarForm.value.addPrice,
        isEditing: false,
        availability: Boolean(this.addCarForm.value.addAvailability),
        id: String(this.carArr.cars.length + 1),
      };
      this.carArr.cars.push(newCar);
      this.isAdding = false;
      this.addCarForm.reset();
    }
  }
}
