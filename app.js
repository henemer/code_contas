var menuComponent = Vue.extend({
    template: `        
        <nav>
        <ul>
        <li v-for="o in menus">
            <a href="#" @click.prevent="showView(o.id)">{{o.name}}</a></li>
        
        </ul>
        </nav>
    `,
    data : function () {
        return  {
            menus: [
                {id:0, name:"Listar Contas"},
                {id:1, name:"Criar Conta"}
            ]
        };
    },
    methods: {
        showView: function(id) {

            this.$dispatch('change-activedview', id);
            if(id==1) {
                this.$dispatch('change-formtype','insert');
            }

        }
    }
});

var billListComponent = Vue.extend({
    template: `
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

                .pago {
                    color:green;
                }
                .nao-pago {
                    color:red;
                }
         </style>

        <table border="1" cellpadding="10">
            <thead>
            <tr>
                <th>#</th>
                <th>Vecimento</th>
                <th>Nome</th>
                <th>Valor</th>
                <th>Paga?</th>
                <th>Ações</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(index,o) in bills">
                <td>{{index}}</td>
                <td>{{o.date_due}}</td>
                <td>{{o.name}}</td>
                <td>{{o.value | currency 'R$ ' 2 }}</td>
                <td :class="{'pago': o.done, 'nao-pago':!o.done}">
                    {{o.done | doneLabel}}
                </td>
                <td>
                    <a href="#" @click.prevent="loadBill(o)">Editar</a> |
                    <a href="#" @click.prevent="deleteBill(o)">Excluir</a>
                </td>
            </tr>
            </tbody>
        </table>
    `,

    data: function () {
        return {
            bills: [
                {date_due: '20/08/2016', name:'Conta de luz', value:'900.99',done:false},
                {date_due: '21/08/2016', name:'Conta de água', value:'226.23',done:true},
                {date_due: '22/08/2016', name:'Conta de telefone', value:'116.00',done:false},
                {date_due: '23/08/2016', name:'Supermercado', value:'4000.0',done:true},
                {date_due: '24/08/2016', name:'Cartão de crédito', value:'160.99',done:false},
                {date_due: '25/08/2016', name:'Empréstimo', value:'25.99',done:false},
                {date_due: '19/08/2016', name:'Gasolina', value:'25.00',done:false}
            ]
        };
    },
    methods: {
        loadBill:function(bill) {
            this.$dispatch('change-bill', bill);
            this.$dispatch('change-activedview', 1);
            this.$dispatch('change-formType','update');
        },
        deleteBill:function(bill) {
            if (confirm('Confirma a exclusão da conta ?')) {
                this.bills.$remove(bill);
            }
        }
    },
    events: {
        'new-bill': function(bill) {
            this.bills.push(bill);
        }

    }
});

var billCreateComponent = Vue.extend({
    template: `
        <form name="form" @submit.prevent="submit">
            <label>Vencimento:</label>
            <input type="Text" v-model="bill.date_due"/>
            <br/><br/>
            <label>Nome:</label>
            <select v-model="bill.name">
            <option v-for="o in names" :value="o">{{o}}</option>
            </select>
            <br/><br/>
            <label>Valor:</label>
            <input type="Text" v-model="bill.value"/>
            <br/><br/>
            <label>Paga</label>
            <input type="checkbox" v-model="bill.done">
            <br/><br/>
            <input type="submit" value="enviar"/>
        
        </form>
    `,
    data:function() {
        return {
            formType:'insert',
            names: [
                'Conta de luz',
                'Conta de água',
                'Conta de telefone',
                'Supermercado',
                'Cartão de crédito',
                'Empréstimo',
                'Gasolina'
            ],
            bill: {
            date_due: '',
            name: '',
            value: 0,
            done: false
            }
        };
    },
    methods: {
        submit:function() {
            if(this.formType=='insert') {
                this.$dispatch('new-bill', this.bill);
            }

            this.bill =  {
                date_due: '',
                name:'',
                value:0,
                done:false
            };

            this.$dispatch('change-activedview', 0);

        }
    },
    events: {
        'change-formtype': function(formType) {
            this.formType = formType;
        },
        'change-bill':function(bill) {
            this.bill = bill;
        }

    }

});

var appComponent = Vue.extend({
    components: {
        'menu-component': menuComponent,
        'bill-list-component': billListComponent,
        'bill-create-component':billCreateComponent
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
            {{status | statusLabel}}
        </h3>
        <menu-component></menu-component>
        <div v-show="activedView == 0">
            <bill-list-component v-ref:bill-list-component></bill-list-component>

       </div>
       <div v-show="activedView==1">
        <bill-create-component :bill.sync="bill"></bill-create-component>
       </div> 
           
    `,
    data:function() {
       return {
           title:"Contas a pagar",
               activedView:0
       };
    },
    computed: {
        status:function() {
            var count = 0;
            var billListComponent = this.$refs.billListComponent;

            if(billListComponent.bills.length == 0) {
                return -1;
            }

            for (var i in billListComponent.bills) {
                if(!billListComponent.bills[i].done) {
                    count++;
                }
            }
            return count;
        }
    },

    methods: {
    },
    events: {
        'change-activedview': function(activedView) {
            this.activedView = activedView;
        },
        'change-formtype': function(formType) {
            this.$broadcast('change-formtype', formType);
        },
        'change-bill':function(bill) {
            this.$broadcast('change-bill', bill);
        },
        'new-bill': function(bill) {
            this.$broadcast('new-bill', bill);
        }


    }

});

Vue.component('app-component', appComponent);


var app = new Vue({
    el:"#app",
});


