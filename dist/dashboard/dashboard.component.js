"use strict";

window.dashboardComponent = Vue.extend({
    template: "\n        <h1>{{title}}</h1>\n        <h3 contas a receber>\n          Total de contas a receber:  {{ totalAReceber | numberFormat 'pt-BR' }}\n        </h3>\n        <h3 contas a pagar>\n           Total de contas a pagar: {{ totalAPagar | numberFormat 'pt-BR'  } }}\n        </h3>\n        <h3 saldo>\n            Saldo: {{  totalAReceber - totalAPagar| numberFormat 'pt-BR'  }}\n        </h3>\n    ",
    data: function data() {
        return {
            title: "Dashboard",
            totalAPagar: 0,
            totalAReceber: 0
        };
    },
    created: function created() {
        var _this = this;

        Bill.total().then(function (response) {
            _this.totalAPagar = parseFloat(response.data.total);
        });
        BillR.total().then(function (response) {
            _this.totalAReceber = response.data.total;
        });
    }
});
Vue.component('bill-pay-component', billPayComponent);