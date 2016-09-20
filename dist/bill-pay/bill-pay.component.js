'use strict';

window.billPayComponent = Vue.extend({
    components: {
        'bill-pay-menu-component': billPayMenuComponent
    },
    template: '\n       <style type="text/css">\n                .nenhuma-conta-a-pagar {\n                    color:green;\n                }\n                .conta-a-pagar {\n                    color:red;\n                }\n                .nenhuma-conta-cadastrada {\n                    color:grey;\n                }\n\n        </style>\n        <h1>{{title}}</h1>\n        <h3 :class="{\'conta-a-pagar\': status >0, \'nenhuma-conta-a-pagar\':status ==0, \'nenhuma-conta-cadastrada\':status == -1}">\n            {{status | statusLabelPay}}\n        </h3>\n        \n        <h3> {{ total | numberFormat \'pt-BR\'}}</h3>\n        <bill-pay-menu-component></bill-pay-menu-component>\n        <router-view></router-view>\n           \n    ',

    data: function data() {
        return {
            title: "Contas a pagar",
            status: -1,
            total: 0
        };
    },
    created: function created() {
        this.updateStatus();
        this.updateTotal();
    },

    methods: {
        calculateStatus: function calculateStatus(bills) {
            var count = 0;

            if (bills.length == 0) {
                this.status = -1;
                return;
            }

            for (var i in bills) {
                if (!bills[i].done) {
                    count++;
                }
            }
            this.status = count;
        },
        updateStatus: function updateStatus() {
            var _this = this;

            Bill.query().then(function (response) {
                return _this.calculateStatus(response.data);
            });
        },
        updateTotal: function updateTotal() {
            var _this2 = this;

            Bill.total().then(function (response) {
                _this2.total = response.data.total;
            });
        }
    },
    events: {
        'change-info': function changeInfo() {
            this.updateStatus();
            this.updateTotal();
        }
    }

});
Vue.component('bill-pay-component', billPayComponent);