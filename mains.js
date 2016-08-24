var mainComponent = Vue.extend({
    components: {
        'bill-component': billComponent
    },
    template: '<bill-component></bill-component>',
    data: function () {
        return {
            billsPay: [
                {date_due: '20/08/2016', name:'Conta de luz', value:900.99,done:false},
                {date_due: '21/08/2016', name:'Conta de água', value:226.23,done:true},
                {date_due: '22/08/2016', name:'Conta de telefone', value:116.00,done:false},
                {date_due: '23/08/2016', name:'Supermercado', value:4000.0,done:true},
                {date_due: '24/08/2016', name:'Cartão de crédito', value:160.99,done:false},
                {date_due: '25/08/2016', name:'Empréstimo', value:25.99,done:false},
                {date_due: '19/08/2016', name:'Gasolina', value:25.00,done:false}
            ],
            billsReceive: [
                {date_due: '20/08/2016', name:'Hospedagem Plano A', value:900.99,done:false},
                {date_due: '21/08/2016', name:'Hospedagem Plano B', value:226.23,done:true},
                {date_due: '22/08/2016', name:'Hospedagem Plano B', value:116.00,done:false},
                {date_due: '23/08/2016', name:'Suporte', value:4000.0,done:true},
                {date_due: '24/08/2016', name:'Desenvolvimento', value:60.99,done:false}
            ]
        };
    }
});

var router  = new VueRouter();

router.map({
    '/': {
        component:dashboardComponent,
        name: 'dashboard'
    },
    '/bill-pays': {
        component:billPayComponent,
        subRoutes: {
            '/': {
                name: 'bill-pay.list',
                component: billPayListComponent
            },
            '/create': {
                name: 'bill-pay.create',
                component: billPayCreateComponent
            },
            '/:index/upate': {
                name: 'bill-pay.update',
                component: billPayCreateComponent
            },
        }
    },
    '/bill-receives': {
        component:billReceiveComponent,
        subRoutes: {
            '/': {
                name: 'bill-receive.list',
                component: billReceiveListComponent
            },
            '/create': {
                name: 'bill-receive.create',
                component: billReceiveCreateComponent
            },
            '/:index/upate': {
                name: 'bill-receive.update',
                component: billReceiveCreateComponent
            },
        }
    },
    '*': { // Rota padrão
        component: dashboardComponent
    }



});

router.start({
    components: {
        'main-component': mainComponent

    }
}, '#app');

router.redirect({
    '*': '/bills-pays'
})





