import enGB from './snippet/en-GB.json';
import './page';

Shopware.Module.register('admin-plugin', {
    type: 'plugin',
    name: 'Newest stuff',
    title: 'admin-module.general.mainMenuItemGeneral',
    description: 'admin-module.general.descriptionTextModule',
    color: '#ff3d58',
    icon: 'default-object-lab-flask',
//    template: template,

    snippets: {
        'en-GB': enGB
    },

    routes: {
        index: {
            component: 'admin-plugin-page',
            path: 'index',
        }
    },

    navigation: [{
        label: 'admin-module.general.mainMenuItemGeneral',
        color: '#ff3d58',
        path: 'admin.plugin.index',
        icon: 'default-object-lab-flask',
        parent: 'sw-catalogue',
        position: 100
    }]
});