import {Component, HostListener} from '@angular/core';
import options from '../options';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  priceForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    car: ['', Validators.required],
  })

  carData = [
    {
      image: '1.png',
      title: 'Lamborghini Huracan Spyder',
      gear: 'полный',
      engine: 5.2,
      places: 2
    },
    {
      image: '2.png',
      title: 'Chevrolet Corvette',
      gear: 'полный',
      engine: 6.2,
      places: 2
    },
    {
      image: '3.png',
      title: 'Ferrari California',
      gear: 'полный',
      engine: 3.9,
      places: 4
    },
    {
      image: '4.png',
      title: 'Lamborghini Urus',
      gear: 'полный',
      engine: 4.0,
      places: 5
    },
    {
      image: '5.png',
      title: 'Audi R8',
      gear: 'полный',
      engine: 5.2,
      places: 2
    },
    {
      image: '6.png',
      title: 'Chevrolet Camaro',
      gear: 'полный',
      engine: 2.0,
      places: 4
    }
  ]

  constructor(private fb: FormBuilder) {
  }

  goScroll(target: HTMLElement, car?: any) {
    target.scrollIntoView(options.behavior);

    if (car) {
      this.priceForm.patchValue({ car: car.title });
    }
  }

  trans: any;
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.trans = {transform: 'translate3d(' + ((e.clientX * 0.2) / 12) + 'px,' + ((e.clientY * 0.3) / 8) + 'px,0px)'};
  }

  bgPos: any;
  @HostListener('document:scroll', ['$event'])
  onScroll() {
    this.bgPos = {backgroundPositionX: '0' + (0.2 * window.scrollY) + 'px'};
  }

  sendRequestCar() {
    if (this.priceForm.valid) {
      document?.querySelector('body')?.classList.add('relative');
      document?.querySelector('.modal-successful')?.classList.remove('d-none');
      this.priceForm.reset();
    }
  }

  modalClose() {
    document?.querySelector('body')?.classList.remove('relative');
    document?.querySelector('.modal-successful')?.classList.add('d-none');
  }
}
