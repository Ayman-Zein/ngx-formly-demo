import { Injectable, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private translate: TranslateService) {
    this.init();
  }

  init() {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');

    const browserLang = this.translate.getBrowserLang() || 'en';
    this.translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');

    // Set initial dir attribute
    this.setDocumentDir(this.translate.currentLang);

    // Update dir attribute on language change
    this.translate.onLangChange.subscribe((event) => {
      this.setDocumentDir(event.lang);
    });
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  getCurrentLanguage() {
    return this.translate.currentLang;
  }

  private setDocumentDir(language: string) {
    const isRtl = language === 'ar';
    const dir = isRtl ? 'rtl' : 'ltr';

    const documentElement: HTMLElement = document.documentElement;
    documentElement.setAttribute('dir', dir);
  }
}
