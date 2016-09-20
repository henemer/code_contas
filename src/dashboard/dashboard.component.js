window.dashboardComponent = Vue.extend({
    template:`
        <h1>{{title}}</h1>
        <h3 contas a receber>
          Total de contas a receber:  {{ totalAReceber | numberFormat 'pt-BR' }}
        </h3>
        <h3 contas a pagar>
           Total de contas a pagar: {{ totalAPagar | numberFormat 'pt-BR'  } }}
        </h3>
        <h3 saldo>
            Saldo: {{  totalAReceber - totalAPagar| numberFormat 'pt-BR'  }}
        </h3>
    `,
    data:function() {
        return {
            title:"Dashboard",
            totalAPagar:0,
            totalAReceber:0
        };
    },
    created() {
        Bill.total().then((response) => {
            this.totalAPagar =  parseFloat(response.data.total);
        });
        BillR.total().then((response) => {
            this.totalAReceber =  response.data.total;
        });
    }

});
Vue.component('bill-pay-component', billPayComponent);

