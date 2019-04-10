import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'administration',
                title: 'Administration',
                type: 'collapsable',
                icon: 'dashboard',
                translate: 'global.menu.admin.main',
                children: [
                    {
                        id: 'user-management',
                        title: 'User Management',
                        type: 'item',
                        icon: 'email',
                        translate: 'global.menu.admin.userManagement',
                        url: '/admin/user-management'
                    },
                    {
                        id: 'user-tracker',
                        title: 'User Tracker',
                        type: 'item',
                        icon: 'email',
                        translate: 'global.menu.admin.tracker',
                        url: '/admin/jhi-tracker'
                    },
                    {
                        id: 'metrics',
                        title: 'Metrics',
                        type: 'item',
                        icon: 'email',
                        translate: 'global.menu.admin.metrics',
                        url: '/admin/jhi-metrics'
                    },
                    {
                        id: 'health',
                        title: 'Health',
                        type: 'item',
                        icon: 'email',
                        translate: 'global.menu.admin.health',
                        url: '/admin/jhi-health'
                    },
                    {
                        id: 'configuration',
                        title: 'Configuration',
                        type: 'item',
                        icon: 'email',
                        translate: 'global.menu.admin.configuration',
                        url: '/admin/jhi-configuration'
                    },
                    {
                        id: 'audits',
                        title: 'Audits',
                        type: 'item',
                        icon: 'email',
                        translate: 'global.menu.admin.logs',
                        url: '/admin/audits'
                    },
                    {
                        id: 'logs',
                        title: 'Logs',
                        type: 'item',
                        icon: 'email',
                        translate: 'global.menu.admin.audits',
                        url: '/admin/logs'
                    },
                    {
                        id: 'api',
                        title: 'API',
                        type: 'item',
                        icon: 'email',
                        translate: 'global.menu.admin.apidocs',
                        url: '/admin/docs'
                    },
                    {
                        id: 'database',
                        title: 'Database',
                        type: 'item',
                        icon: 'email',
                        translate: 'global.menu.admin.database',
                        url: '/h2-console'
                    }
                ]
            },
            {
                id: 'account',
                title: 'Account',
                type: 'collapsable',
                icon: 'dashboard',
                children: [
                    {
                        id: 'settings',
                        title: 'Settings',
                        type: 'item',
                        icon: 'email',
                        url: '/settings'
                    },
                    {
                        id: 'password',
                        title: 'Password',
                        type: 'item',
                        icon: 'email',
                        url: '/password'
                    },
                    {
                        id: 'register',
                        title: 'Register',
                        type: 'item',
                        icon: 'email',
                        url: '/register'
                    }
                ]
            }
        ]
    }
];
