"use strict";

window.dashboardComponent = Vue.extend({
    template: "\n      <div class=\"section\">\n            <div class=\"container\">\n                <h4>{{title}}</h4>\n                <div class=\"row\">\n                    <div class=\"col s4\">\n                        <div class=\"card z-depth-2 green\">\n                            <div class=\"card-content white-text\">\n                                <p class=\"card-title\">\n                                    <i class=\"material-icons\">account_balance</i> Contas a Receber\n                                </p>                                        \n                                <h5>{{ totalAReceber | numberFormat 'pt-BR' }}</h5>\n                            </div> \n                        </div>\n                    </div>\n\n                    <div class=\"col s4\">\n                        <div class=\"card z-depth-2 red\">\n                            <div class=\"card-content white-text\">\n                                <p class=\"card-title\">\n                                    <i class=\"material-icons\">account_balance</i> Contas a Pagar\n                                </p>                                        \n                                <h5>{{ totalAPagar | numberFormat 'pt-BR'  } }}</h5>\n                            </div> \n                        </div>\n                    </div>\n\n\n                    <div class=\"col s4\">\n                        <div class=\"card z-depth-2 whuite\">\n                            <div class=\"card-content\">\n                                <p class=\"card-title\">\n                                    <i class=\"material-icons\">account_balance</i> Saldo\n                                </p>                                        \n                                <h5>{{  totalAReceber - totalAPagar| numberFormat 'pt-BR'  }}</h5>\n                            </div> \n                        </div>\n                    </div>\n                </div>\n            </div>\n      </div>      \n    ",
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