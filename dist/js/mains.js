'use strict';

var router = new VueRouter();

router.map({
    '/dashboard': {
        component: dashboardComponent,
        name: 'dashboard'
    },
    '/bill-pays': {
        component: billPayComponent,
        subRoutes: {
            '/': {
                name: 'bill-pay.list',
                component: billPayListComponent
            },
            '/create': {
                name: 'bill-pay.create',
                component: billPayCreateComponent
            },
            '/:id/update': {
                name: 'bill-pay.update',
                component: billPayCreateComponent
            }
        }
    },
    '/bill-receives': {
        component: billReceiveComponent,
        subRoutes: {
            '/': {
                name: 'bill-receive.list',
                component: billReceiveListComponent
            },
            '/create': {
                name: 'bill-receive.create',
                component: billReceiveCreateComponent
            },
            '/:id/upate': {
                name: 'bill-receive.update',
                component: billReceiveCreateComponent
            }
        }
    }
});

router.start({
    components: {
        'bill-component': billComponent

    }
}, '#app');

// router.redirect({
//     '*': '/dashboardComponent'
// })