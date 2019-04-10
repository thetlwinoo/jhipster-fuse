import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { Router, ActivatedRouteSnapshot, NavigationEnd, NavigationError } from '@angular/router';

import { JhiLanguageHelper, AccountService } from 'app/core';

import { TranslateService } from '@ngx-translate/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { navigation } from 'app/navigation/navigation';
import { locale as navigationEnglish } from 'app/navigation/i18n/en';
import { locale as navigationTurkish } from 'app/navigation/i18n/tr';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.scss']
})
export class JhiMainComponent implements OnInit, OnDestroy {
    fuseConfig: any;
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        @Inject(DOCUMENT) private document: any,
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _translateService: TranslateService,
        private _platform: Platform,
        private jhiLanguageHelper: JhiLanguageHelper,
        private accountService: AccountService,
        private router: Router
    ) {
        this.navigation = navigation;

        // Register the navigation to the service
        this._fuseNavigationService.register('main', this.navigation);

        // Set the main navigation as our current navigation
        this._fuseNavigationService.setCurrentNavigation('main');

        // Add languages
        this._translateService.addLangs(['en', 'tr']);

        // Set the default language
        this._translateService.setDefaultLang('en');

        // Set the navigation translations
        this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

        // Use a language
        this._translateService.use('en');

        if (this._platform.ANDROID || this._platform.IOS) {
            this.document.body.classList.add('is-mobile');
        }

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'jhifuseApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
            if (event instanceof NavigationError && event.error.status === 404) {
                this.router.navigate(['/404']);
            }
        });

        this._fuseConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
            this.fuseConfig = config;
            // Boxed
            if (this.fuseConfig.layout.width === 'boxed') {
                this.document.body.classList.add('boxed');
            } else {
                this.document.body.classList.remove('boxed');
            }

            // Color theme - Use normal for loop for IE11 compatibility
            for (let i = 0; i < this.document.body.classList.length; i++) {
                const className = this.document.body.classList[i];

                if (className.startsWith('theme-')) {
                    this.document.body.classList.remove(className);
                }
            }

            this.document.body.classList.add(this.fuseConfig.colorTheme);
        });

        this.accountService.getAuthenticationState().subscribe(auth => {
            if (auth) {
                this.fuseConfig.layout.navbar.hidden = false;
            } else {
                this.fuseConfig.layout.navbar.hidden = true;
            }
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }
}
