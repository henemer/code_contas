window.dashboardComponent = Vue.extend({
    template:`
      <div class="section">
            <div class="container">
                <h4>{{title}}</h4>
                <div class="row">
                    <div class="col s4">
                        <div class="card z-depth-2 green">
                            <div class="card-content white-text">
                                <p class="card-title">
                                    <i class="material-icons">account_balance</i> Contas a Receber
                                </p>                                        
                                <h5>{{ totalAReceber | numberFormat 'pt-BR' }}</h5>
                            </div> 
                        </div>
                    </div>

                    <div class="col s4">
                        <div class="card z-depth-2 red">
                            <div class="card-content white-text">
                                <p class="card-title">
                                    <i class="material-icons">account_balance</i> Contas a Pagar
                                </p>                                        
                                <h5>{{ totalAPagar | numberFormat 'pt-BR'  } }}</h5>
                            </div> 
                        </div>
                    </div>


                    <div class="col s4">
                        <div class="card z-depth-2 whuite">
                            <div class="card-content">
                                <p class="card-title">
                                    <i class="material-icons">account_balance</i> Saldo
                                </p>                                        
                                <h5>{{  totalAReceber - totalAPagar| numberFormat 'pt-BR'  }}</h5>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
      </div>      
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

