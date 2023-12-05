// src/app/parts/f-a-q-section.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FAQ } from '../../models/models';
import { SupportService } from '../../services';
import { Observable } from 'rxjs';
import { AppCommonModule } from 'src/app/app-common.module';

@Component({
  selector: 'app-faq-section',
  templateUrl: './faq-section.component.html',
  styleUrls: ['./faq-section.component.scss'],
  standalone: true,
  imports: [AppCommonModule],
})
export class FAQSectionComponent implements OnInit {
  // Input property to receive the list of FAQs
  @Input() faqs: FAQ[] = [];

  // Observable to hold the FAQs while they are being loaded
  faqs$?: Observable<FAQ[]>;

  constructor(private supportService: SupportService) { }

  ngOnInit(): void {
    // Load the FAQs when the component initializes
    this.loadFAQs();
  }

  // Function to load FAQs using the SupportService
  loadFAQs(): void {
    this.faqs$ = this.supportService.getFAQs();
    this.faqs$.subscribe(
      (data: FAQ[]) => {
        this.faqs = data;
      },
      (error) => {
        // Handle error scenario, possibly by showing an error message to the user
        console.error('Unable to load FAQs. Please try again later.', error);
      }
    );
  }
}
// 
// Please note that the above TypeScript code assumes that the `SupportService` is correctly implemented and that the `getFAQs` method returns an `Observable<FAQ[]>`. The `@Input` decorator is used to bind the `faqs` property to the parent component, which allows the parent component to pass the list of FAQs to the `FAQSectionComponent`. The `ngOnInit` lifecycle hook is used to load the FAQs when the component initializes. The `loadFAQs` method subscribes to the observable returned by the `getFAQs` method and updates the component's `faqs` property with the data received. In case of an error, it logs the error to the console. The actual error handling and user notification logic would depend on the specific requirements of the application.