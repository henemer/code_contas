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
        
        <h3> {{ total | numberFormat 'pt-BR'}}</h3>
        <bill-pay-menu-component></bill-pay-menu-component>
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

