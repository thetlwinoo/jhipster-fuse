import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatRippleModule } from '@angular/material';

// import { TranslateModule } from '@ngx-translate/core';

import { FuseNavigationComponent } from './navigation.component';
import { FuseNavVerticalItemComponent } from './vertical/item/item.component';
import { FuseNavVerticalCollapsableComponent } from './vertical/collapsable/collapsable.component';
import { FuseNavVerticalGroupComponent } from './vertical/group/group.component';
import { FuseNavHorizontalItemComponent } from './horizontal/item/item.component';
import { FuseNavHorizontalCollapsableComponent } from './horizontal/collapsable/collapsable.component';

import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';
import { JhifuseSharedModule } from 'app/shared';

@NgModule({
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatRippleModule,
        JhifuseSharedModule
        // TranslateModule.forChild()
    ],
    exports: [FuseNavigationComponent],
    declarations: [
        FuseNavigationComponent,
        FuseNavVerticalGroupComponent,
        FuseNavVerticalItemComponent,
        FuseNavVerticalCollapsableComponent,
        FuseNavHorizontalItemComponent,
        FuseNavHorizontalCollapsableComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FuseNavigationModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                console.log('Lang', languageKey);
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
