import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  @Input() size: 'medium' | 'big' = 'medium';
  @Input() color: 'primary' | 'white' = 'primary';
}
