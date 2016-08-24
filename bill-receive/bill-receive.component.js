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
        <bill-receive-menu-component></bill-receive-menu-component>
        <router-view></router-view>
           
    `,
    data:function() {
        return {
            title:"Contas a receber"
        };
    },
    computed: {
        status:function() {
            var count = 0;
            var bills = this.$root.$children[0].billsReceive;

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
Vue.component('bill-receive-component', billReceiveComponent);

