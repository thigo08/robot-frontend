import {Component, NgZone, ViewEncapsulation, ViewChild, OnInit, NgModule} from '@angular/core';
import {DocumentationItems} from '../../../core/shared/documentation-items/documentation-items';
import {MatSidenav, MatSidenavModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ActivatedRoute, Params, Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Observable} from 'rxjs/Observable';
import {combineLatest} from 'rxjs/observable/combineLatest';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-component-sidenav',
  templateUrl: './component-sidenav.html',
  styleUrls: ['./component-sidenav.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ComponentSidenav implements OnInit {
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  params: Observable<Params>;

  lista = [{name: 'marcos'}, {name: 'marcos'}, {name: 'marcos'}, {name: 'marcos'}, {name: 'marcos'}, {name: 'marcos'}, {name: 'marcos'}];

  constructor(public docItems: DocumentationItems,
              private _route: ActivatedRoute,
              private _router: Router,
              zone: NgZone) {
    // TODO(josephperrott): Move to CDK breakpoint management once available.
    this.mediaMatcher.addListener(mql => zone.run(() => this.mediaMatcher = mql));
  }

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  ngOnInit() {
    this._router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });

    // Combine params from all of the path into a single object.
    this.params = combineLatest(
      this._route.pathFromRoot.map(route => route.params),
      Object.assign);
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}
