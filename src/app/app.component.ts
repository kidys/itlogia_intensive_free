import {Component, HostListener} from '@angular/core';
import options from '../options';
import {FormBuilder, Validators} from "@angular/forms";
import {AppService} from "./app.service";

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

  carData: any;

  constructor(private fb: FormBuilder, private appService: AppService) {
  }

  ngOnInit() {
    this.appService.getData().subscribe(carData => this.carData = carData);
  }

  goScroll(target: HTMLElement, car?: any) {
    target.scrollIntoView(options.behavior);

    if (car) {
      this.priceForm.patchValue({car: car.name});
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
      const $modal: any = document?.querySelector('.modal-successful');
      const priceForm = this.priceForm;

      document?.querySelector('body')?.classList.add('relative');

      this.appService.sendQuery(this.priceForm.value).subscribe({
        next: function (response: any) {
          $modal.querySelector('h3').textContent = String(response.message);
          priceForm.reset();
        },
        error(response: any) {
          $modal.querySelector('h3').textContent = String(response.error.message);
        }
      });

      $modal?.classList.remove('d-none');
    }
  }

  modalClose() {
    document?.querySelector('body')?.classList.remove('relative');
    document?.querySelector('.modal-successful')?.classList.add('d-none');
  }
}
