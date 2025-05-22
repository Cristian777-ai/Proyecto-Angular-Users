
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';


getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);


declare const require: any;


if (typeof require.context === 'function') {
  
  const context = require.context('./', true, /\.spec\.ts$/);
  context.keys().forEach(context);
}


