import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material';

import { FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { ContentModule } from 'app/fuse-layout/components/content/content.module';
import { FooterModule } from 'app/fuse-layout/components/footer/footer.module';
import { NavbarModule } from 'app/fuse-layout/components/navbar/navbar.module';
import { QuickPanelModule } from 'app/fuse-layout/components/quick-panel/quick-panel.module';
import { ToolbarModule } from 'app/fuse-layout/components/toolbar/toolbar.module';

import { HorizontalLayout1Component } from 'app/fuse-layout/horizontal/layout-1/layout-1.component';

@NgModule({
    declarations: [HorizontalLayout1Component],
    imports: [
        MatSidenavModule,

        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        ContentModule,
        FooterModule,
        NavbarModule,
        QuickPanelModule,
        ToolbarModule
    ],
    exports: [HorizontalLayout1Component]
})
export class HorizontalLayout1Module {}
