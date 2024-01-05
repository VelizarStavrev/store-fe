import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() valueChange = new EventEmitter<string>();
  currentValue = '';

  valueChangeSubject = new Subject<string>();
  _valueChangeSubscription?: Subscription;

  ngOnInit(): void {
    this._valueChangeSubscription = this.valueChangeSubject
      .pipe(debounceTime(500))
      .subscribe((value) => this.valueChange.emit(value));
  }

  ngOnDestroy(): void {
    this._valueChangeSubscription?.unsubscribe();
  }

  onValueChange(value: string): void {
    this.valueChangeSubject.next(value);
  }
}
