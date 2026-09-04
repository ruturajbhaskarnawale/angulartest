import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SecureShield Test Website - Angular (TypeScript)';
  status = 'Active';
  frameworkVersion = 'Angular 18 / 19 Standalone Architecture';
  detectorsReady = 83;
}
