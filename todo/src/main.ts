import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  // Toda vez que aplicação é iniciada o (main.ts) é chamado
  // Aplicação chama o (main.ts) o main chama o Appmodule e o Appmodule chama o AppComponent