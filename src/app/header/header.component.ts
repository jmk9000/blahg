import {
  ActivatedRoute,
  NavigationEnd,
  Router
} from '@angular/router';
import {
  Component,
  OnInit
} from '@angular/core';
import { map, Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private userSub: Subscription;
  private rSub: Subscription;
  url: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    const segments = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route.snapshot.url;
      })
    ).subscribe(segments => {
      this.url = segments.join('')
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {

  }
}
