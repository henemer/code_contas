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
            title:"Dashboard",
            totalAPagar:0,
            totalAReceber:0
        };
    },
    created:function() {
        self = this;
        Bill.total().then(function (response) {
            console.log(response.data.total);
            self.totalAPagar =  parseFloat(response.data.total);
        });
        BillR.total().then(function (response) {
            self.totalAReceber =  response.data.total;
        });
    }



});
Vue.component('bill-pay-component', billPayComponent);

