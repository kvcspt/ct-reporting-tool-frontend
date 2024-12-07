import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private title = 'CT Reporting Tool';

  public constructor(private titleService: Title) {}

  public ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }
}
