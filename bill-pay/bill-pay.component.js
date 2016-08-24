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
        <bill-pay-menu-component></bill-pay-menu-component>
        <router-view></router-view>
           
    `,
    data:function() {
        return {
            title:"Contas a pagar"
        };
    },
    computed: {
        status:function() {
            var count = 0;
            var bills = this.$root.$children[0].billsPay;

            if(bills.length == 0) {
                return -1;
            }

            for (var i in bills) {
                if(!bills[i].done) {
                    count++;
                }
            }
            return count;
        }
    }


});
Vue.component('bill-pay-component', billPayComponent);

