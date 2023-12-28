import { Component, Renderer2 } from '@angular/core';
import { TranslationService } from './translation.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'formaly-app';
  dir: string;

  constructor(
    private translationService: TranslationService,
    private translate: TranslateService
  ) {
    // Initialize dir attribute
    this.dir = this.getDirAttribute(this.translate.currentLang);
  }

  switchLanguage() {
    const currentLanguage = this.translationService.getCurrentLanguage();
    const newLanguage = currentLanguage === 'en' ? 'ar' : 'en';

    this.translationService.useLanguage(newLanguage);
    this.dir = this.getDirAttribute(newLanguage);
  }

  private getDirAttribute(language: string): string {
    return language === 'ar' ? 'rtl' : 'ltr';
  }
}
