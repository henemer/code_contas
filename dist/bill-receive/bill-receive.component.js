'use strict';

window.billReceiveComponent = Vue.extend({
    components: {
        'bill-receive-menu-component': billReceiveMenuComponent
    },
    template: '\n       <style type="text/css">\n                .nenhuma-conta-a-receber {\n                    color:green;\n                }\n                .conta-a-receber {\n                    color:red;\n                }\n                .nenhuma-conta-cadastrada {\n                    color:grey;\n                }\n\n        </style>\n        <h1>{{title}}</h1>\n        <h3 :class="{\'conta-a-receber\': status >0, \'nenhuma-conta-a-receber\':status ==0, \'nenhuma-conta-cadastrada\':status == -1}">\n            {{status | statusLabelReceive}}\n        </h3>\n        <h3> {{ total | numberFormat | \'pt-BR\'}}</h3>       \n        \n        <bill-receive-menu-component></bill-receive-menu-component>\n        <router-view></router-view>\n           \n    ',
    data: function data() {
        return {
            title: "Contas a receber",
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
            var self = this;
            BillR.query().then(function (response) {
                self.calculateStatus(response.data);
            });
        },
        updateTotal: function updateTotal() {
            var self = this;
            BillR.total().then(function (response) {
                self.total = response.data.total;
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
Vue.component('bill-receive-component', billReceiveComponent);