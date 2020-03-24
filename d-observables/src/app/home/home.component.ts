import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstSubscription: Subscription;

  constructor() {}

  ngOnInit(): void {
    // this.firstSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        /** Emitting data */
        observer.next(count);

        if (count === 2) {
          /** Here observer is done no more emitting */
          observer.complete();
        }

        if (count > 3) {
          /** Throw error */
          observer.error(new Error('Some dummy error!'));
        }

        count++;
      }, 1000);
    });

    const handleData = data => {
      console.log(data);
    };

    const handleError = error => {
      console.log(error);
    };

    const handleComplete = () => {
      /** It is not executed if we get error */
      console.log('I am complete! Do clean up');
    };

    this.firstSubscription = customIntervalObservable
      .pipe(
        filter(data => data > 0),
        map((data: number) => {
          console.log(data);
          return `Round: ${data + 1}`;
        })
      )
      .subscribe(handleData, handleError, handleComplete);
  }

  ngOnDestroy(): void {
    this.firstSubscription.unsubscribe();
  }
}
