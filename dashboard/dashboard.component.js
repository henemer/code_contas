window.dashboardComponent = Vue.extend({
    template:`
        <h1>{{title}}</h1>
        <h3 contas a receber>
          Total de contas a receber:  {{ totalAReceber | currency 'R$ ' 2 }}
        </h3>
        <h3 contas a pagar>
           Total de contas a pagar: {{ totalAPagar | currency 'R$ ' 2 } }}
        </h3>
        <h3 saldo>
            Saldo: {{  totalAReceber - totalAPagar| currency 'R$ ' 2 }}
        </h3>
    `,
    data:function() {
        return {
            title:"Dashboard"
        };
    },
    computed: {
        totalAPagar:function() {
            var bills = this.$root.$children[0].billsPay;
            var total  = 0;

            for (var i in bills) {
                if(!bills[i].done) {
                    total += bills[i].value

                }
            }
            return total;
        },
        totalAReceber:function() {
            var bills = this.$root.$children[0].billsReceive;
            var total  = 0;

            for (var i in bills) {
                if(!bills[i].done) {
                    total += bills[i].value

                }
            }
            return total;
        }

    }


});
Vue.component('bill-pay-component', billPayComponent);

