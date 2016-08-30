window.billPayComponent = Vue.extend({
    components: {
        'bill-pay-menu-component': billPayMenuComponent,
    },
    template:`
       <style type="text/css">
                .nenhuma-conta-a-pagar {
                    color:green;
                }
                .conta-a-pagar {
                    color:red;
                }
                .nenhuma-conta-cadastrada {
                    color:grey;
                }

        </style>
        <h1>{{title}}</h1>
        <h3 :class="{'conta-a-pagar': status >0, 'nenhuma-conta-a-pagar':status ==0, 'nenhuma-conta-cadastrada':status == -1}">
            {{status | statusLabelPay}}
        </h3>
        
        <h3> {{ total | currency 'R$ '}}</h3>
        <bill-pay-menu-component></bill-pay-menu-component>
        <router-view></router-view>
           
    `,

    data:function() {
        return {
            title:"Contas a pagar",
            status: -1,
            total:0
        };
    },
    created:function() {
        this.updateStatus();
        this.updateTotal();
    },
    methods: {
        calculateStatus:function(bills) {
            var count = 0;

            if(bills.length == 0) {
                this.status = -1;
                return;
            }

            for (var i in bills) {
                if(!bills[i].done) {
                    count++;
                }
            }
            this.status = count;

        },
        updateStatus:function() {
            var self = this;
            Bill.query().then(function(response){
                self.calculateStatus(response.data);
            });
        },
        updateTotal:function() {
            var self = this;
            Bill.total().then(function(response){
                self.total  = response.data.total;
            });

        }
    },
    events: {
        'change-info': function(){
            this.updateStatus();
            this.updateTotal();
        }
    }


});
Vue.component('bill-pay-component', billPayComponent);

