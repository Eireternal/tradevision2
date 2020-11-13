import { trigger, state, style, transition, animate, animateChild, query } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export const onSideNavChange = trigger('onSideNavChange', [
  state('close',
    style({
      'min-width': '40px'
    })
  ),
  state('open',
    style({
      'min-width': '150px'
    })
  ),
  transition('close => open', animate('250ms ease-in')),
  transition('open => close', animate('250ms ease-in')),
]);


export const onMainContentChanged = trigger('onMainContentChanged', [
  state('close',
    style({
      'margin-left': '62px'
    })
  ),
  state('open',
    style({
      'margin-left': '200px'
    })
  ),
  transition('close => open', animate('250ms ease-in')),
  transition('open => close', animate('250ms ease-in')),
]);


export const animateText = trigger('animateText', [
  state('hide',
    style({
      'display': 'none',
      opacity: 0,
    })
  ),
  state('show',
    style({
      'display': 'block',
      opacity: 1,
    })
  ),
  transition('close => open', animate('2000ms ease-in')),
  transition('open => close', animate('200ms ease-out')),
]);
