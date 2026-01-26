import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-component',
  imports: [
    CommonModule,
    AsyncPipe
  ],
  templateUrl: './loading-component.html',
  styleUrl: './loading-component.css',
})
export class LoadingComponent {
  loading$;

  constructor(private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$;
    // this.loadingService.show();
   }
}
