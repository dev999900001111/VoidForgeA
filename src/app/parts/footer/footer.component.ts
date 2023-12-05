// src/app/parts/footer.component.ts
import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [MatToolbarModule],
})
export class FooterComponent implements OnInit {
  // An array of objects representing the footer links, where each object contains a label for the display text and a path for the routing URL.
  footerLinks: { label: string, path: string }[] = [
    { label: 'ヘルプ / サポート', path: '/help-support' },
    { label: '利用規約', path: '/terms-of-service' },
    { label: 'プライバシーポリシー', path: '/privacy-policy' },
    { label: 'お問い合わせ', path: '/contact' }
  ];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
// // 
// // <!-- src/app/parts/footer.component.html -->
// <mat-toolbar class="footer-toolbar" >
//   <div class="footer-links" >
//     <a * ngFor="let link of footerLinks"(click) = "navigateTo(link.path)" > {{ link.label }}</a>
//       < /div>
//       < /mat-toolbar>
//         // 
//         // /* src/app/parts/footer.component.scss */
//         .footer - toolbar {
//   position: fixed;
//   bottom: 0;
//   width: 100 %;
//   background - color: #333;
//   color: #fff;
//   justify - content: center;
// }

// .footer - links a {
//   margin: 0 15px;
//   color: #fff;
//   text - decoration: none;
//   cursor: pointer;
// }

// .footer - links a:hover {
//   text - decoration: underline;
// }
// // 
// // In the TypeScript class, I've added the `footerLinks` array with the labels and paths for the footer links. I've also added a `navigateTo` method that uses Angular's `Router` service to navigate to the specified path when a link is clicked.
// // 
// // The HTML template uses Angular's `*ngFor` directive to iterate over the `footerLinks` array and create an anchor tag for each link. The `(click)` event binding calls the `navigateTo` method with the path of the clicked link.
// // 
// // The SCSS file contains styles for the footer toolbar, ensuring it is fixed to the bottom of the viewport, spans the full width, and has a background color that matches the application's theme. The links are styled to be white and non-underlined by default, changing to underlined on hover for better user interaction feedback.
