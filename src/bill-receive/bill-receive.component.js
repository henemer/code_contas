window.billReceiveComponent = Vue.extend({
    components: {
        'bill-receive-menu-component': billReceiveMenuComponent,
    },
    template:`
       <style type="text/css">
                .nenhuma-conta-a-receber {
                    color:green;
                }
                .conta-a-receber {
                    color:red;
                }
                .nenhuma-conta-cadastrada {
                    color:grey;
                }

        </style>
        <h1>{{title}}</h1>
        <h3 :class="{'conta-a-receber': status >0, 'nenhuma-conta-a-receber':status ==0, 'nenhuma-conta-cadastrada':status == -1}">
            {{status | statusLabelReceive}}
        </h3>
        <h3> {{ total | numberFormat | 'pt-BR'}}</h3>       
        
        <bill-receive-menu-component></bill-receive-menu-component>
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

