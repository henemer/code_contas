window.billPayComponent = Vue.extend({
    components: {
        'bill-pay-menu-component': billPayMenuComponent,
    },
    template:`
        <div class="section">
            <div class="container">
                <h4>{{title}}</h4>
                <div class="row">
                    <div class="col s7">
                        <div class="card z-depth-2" :class="{'red': status >0, 'green':status ==0, 'grey':status == -1}">
                            <div class="card-content white-text">
                                <p class="card-title">
                                    <i class="material-icons">account_balance</i>
                                </p>                                        
                                <h5>{{status | statusLabelPay}}</h5>

                            </div> 
                        </div>
                    </div>
                    <div class="col s5">
                        <div class="card z-depth-2">
                            <div class="card-content">
                                <p class="card-title">
                                    <i class="material-icons">payment</i>
                                </p>                                        
                                <h5>{{total | numberFormat 'pt-BR'}}</h5>

                            </div> 
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
        <div class="divider"></div>
        <router-view></router-view>
           
    `,

    data() {
        return {
            title:"Contas a pagar",
            status: -1,
            total:0
        };
    },
    created() {
        this.updateStatus();
        this.updateTotal();
    },
    methods: {
        calculateStatus(bills) {
            let count = 0;

            if(bills.length == 0) {
                this.status = -1;
                return;
            }

            for (let i in bills) {
                if(!bills[i].done) {
                    count++;
                }
            }
            this.status = count;

        },
        updateStatus() {
            Bill.query().then((response) => this.calculateStatus(response.data));
        },
        updateTotal() {
            Bill.total().then((response)=>{
                this.total  = response.data.total;
            });

        }
    },
    events: {
        'change-info'(){
            this.updateStatus();
            this.updateTotal();
        }
    }


});
Vue.component('bill-pay-component', billPayComponent);

