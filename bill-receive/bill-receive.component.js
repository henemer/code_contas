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
        <h3> {{ total | currency 'R$ '}}</h3>       
        
        <bill-receive-menu-component></bill-receive-menu-component>
        <router-view></router-view>
           
    `,
    data:function() {
        return {
            title:"Contas a receber",
            status: -1,
            total: 0
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
            this.status =  count;
        },
        updateStatus:function() {
            var self = this;
            BillR.query().then(function(response){
                self.calculateStatus(response.data);
            });
        },
        updateTotal:function() {
            var self = this;
            BillR.total().then(function (response) {
                self.total = response.data.total;
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
Vue.component('bill-receive-component', billReceiveComponent);

