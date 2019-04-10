import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';

import { FuseSearchBarModule, FuseShortcutsModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { JhifuseSharedModule } from 'app/shared';
import { ToolbarComponent } from 'app/fuse-layout/components/toolbar/toolbar.component';
import { ActiveLanguageDirective } from './active-language.directive';

@NgModule({
    declarations: [ToolbarComponent, ActiveLanguageDirective],
    imports: [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        JhifuseSharedModule,
        FuseSharedModule,
        FuseSearchBarModule,
        FuseShortcutsModule
    ],
    exports: [ToolbarComponent]
})
export class ToolbarModule {}
