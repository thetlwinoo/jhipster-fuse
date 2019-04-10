import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';

import { JhiLanguageService } from 'ng-jhipster';
import { SessionStorageService } from 'ngx-webstorage';
import { JhiLanguageHelper, AccountService, LoginModalService, LoginService } from 'app/core';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit, OnDestroy {
    inProduction: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;

    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    // languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];
    account: Account;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TranslateService} _translateService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _translateService: TranslateService,
        private languageHelper: JhiLanguageHelper,
        private sessionStorage: SessionStorageService,
        private languageService: JhiLanguageService,
        private profileService: ProfileService,
        private loginModalService: LoginModalService,
        private loginService: LoginService,
        private accountService: AccountService,
        private router: Router
    ) {
        // Set the defaults
        this.userStatusOptions = [
            {
                title: 'Online',
                icon: 'icon-checkbox-marked-circle',
                color: '#4CAF50'
            },
            {
                title: 'Away',
                icon: 'icon-clock',
                color: '#FFC107'
            },
            {
                title: 'Do not Disturb',
                icon: 'icon-minus-circle',
                color: '#F44336'
            },
            {
                title: 'Invisible',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#BDBDBD'
            },
            {
                title: 'Offline',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#616161'
            }
        ];

        this.languages = [
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            },
            {
                id: 'tr',
                title: 'Turkish',
                flag: 'tr'
            }
        ];

        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to the config changes
        this._fuseConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(settings => {
            this.horizontalNavbar = settings.layout.navbar.position === 'top';
            this.rightNavbar = settings.layout.navbar.position === 'right';
            this.hiddenNavbar = settings.layout.navbar.hidden === true;
        });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, { id: this._translateService.currentLang });

        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });

        this.profileService.getProfileInfo().then(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });

        this.accountService.identity().then((account: Account) => {
            this.account = account;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
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

    /**
     * Search
     *
     * @param value
     */
    search(value): void {
        // Do your search here...
        console.log(value);
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    changeLanguage(languageKey: string) {
        this.sessionStorage.store('locale', languageKey);
        this.languageService.changeLanguage(languageKey);
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['']);
    }
}
