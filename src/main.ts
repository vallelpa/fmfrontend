import {bootstrapApplication} from '@angular/platform-browser';
import {App} from './app/app';
import {appConfig} from './app/app.config';

import {LOCALE_ID} from '@angular/core';

import {registerLocaleData} from '@angular/common';
import localeIt from '@angular/common/locales/it';

registerLocaleData(localeIt);

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    { provide: LOCALE_ID, useValue: 'it' }
  ]
}).catch((err) => console.error(err));
