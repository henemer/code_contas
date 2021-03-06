'use strict';

window.billReceiveComponent = Vue.extend({
    components: {
        'bill-receive-menu-component': billReceiveMenuComponent
    },
    template: '\n     <div class="section">\n        <div class="container">\n            <h4>{{title}}</h4>\n            <div class="row">\n                <div class="col s7">\n                    <div class="card z-depth-2" :class="{\'red\': status >0, \'green\':status ==0, \'grey\':status == -1}">\n                        <div class="card-content white-text">\n                            <p class="card-title">\n                                <i class="material-icons">account_balance</i>\n                            </p>                                        \n                            <h5>{{status | statusLabelReceive}}</h5>\n\n                        </div> \n                    </div>\n                </div>\n                <div class="col s5">\n                    <div class="card z-depth-2">\n                        <div class="card-content">\n                            <p class="card-title">\n                                <i class="material-icons">payment</i>\n                            </p>                                        \n                            <h5>{{total | numberFormat \'pt-BR\'}}</h5>\n\n                        </div> \n                    </div>\n                </div>\n            \n            </div>\n        </div>\n     </div>\n     <div class="divider"></div>\n     <router-view></router-view>\n           \n    ',
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