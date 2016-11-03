window.billReceiveComponent = Vue.extend({
    components: {
        'bill-receive-menu-component': billReceiveMenuComponent,
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
                            <h5>{{status | statusLabelReceive}}</h5>

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
            title:"Contas a receber",
            status: -1,
            total: 0
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

            for (var i in bills) {
                if(!bills[i].done) {
                    count++;
                }
            }
            this.status =  count;
        },
        updateStatus() {
            let self = this;
            BillR.query().then(function(response){
                self.calculateStatus(response.data);
            });
        },
        updateTotal() {
            let self = this;
            BillR.total().then(function (response) {
                self.total = response.data.total;
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
Vue.component('bill-receive-component', billReceiveComponent);

