import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManifestService {
  constructor() {}

  public updateManifest(name: string, iconNew: string, theme_color: string, background_color: string): void {
    const manifestElement = document.querySelector('link[rel="manifest"]');

    if (manifestElement) {
      fetch(manifestElement.getAttribute('href') as string)
        .then((response) => response.json())
        .then((manifest) => {
        // Modificar el contenido del manifest
        manifest.name = name;
        manifest.short_name = name;
        manifest.theme_color = theme_color;
        manifest.background_color = background_color;
         // Asegúrate de que start_url y scope sean rutas válidas
         manifest.start_url = window.location.origin + '/';
         manifest.scope = window.location.origin + '/';

         // Convertir los src de los íconos a URLs absolutas
         manifest.icons.forEach((icon: any) => {
           icon.src = iconNew;
         });

          const stringManifest = JSON.stringify(manifest);
          const blob = new Blob([stringManifest], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          manifestElement.setAttribute('href', url);
        });
    }
  }
}
