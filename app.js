

var app = new Vue({
    el:"#app",
    data: {
        title:"Contas a pagar",
        menus: [
            {id:0, name:"Listar Contas"},
            {id:1, name:"Criar Conta"}
        ],
        activedView:1,
        formType:'insert',
        bill: {
          date_due: '',
          name:'',
          value:0,
          done:0
        },
        names: [
            'Conta de luz',
            'Conta de água',
            'Conta de telefone',
            'Supermercado',
            'Cartão de crédito',
            'Empréstimo',
            'Gasolina'
        ],
        bills: [
            {date_due: '20/08/2016', name:'Conta de luz', value:'900.99',done:0},
            {date_due: '21/08/2016', name:'Conta de água', value:'226.23',done:1},
            {date_due: '22/08/2016', name:'Conta de telefone', value:'116.00',done:0},
            {date_due: '23/08/2016', name:'Supermercado', value:'4000.0',done:1},
            {date_due: '24/08/2016', name:'Cartão de crédito', value:'160.99',done:0},
            {date_due: '25/08/2016', name:'Empréstimo', value:'25.99',done:0},
            {date_due: '19/08/2016', name:'Gasolina', value:'25.00',done:0}
        ]
    },
    computed: {
        status:function() {
            var count = 0;
            for (var i in this.bills) {
                if(!this.bills[i].done) {
                    count++;
                }
            }
            return count;
        }
    },

    methods: {
        showView: function(id) {
            this.activedView = id;
            if(id==1) {
                this.formType = 'insert';
            }

        },
        submit:function() {
            if(this.formType=='insert') {
                this.bills.push(this.bill);
            }

            this.bill =  {
                date_due: '',
                name:'',
                value:0,
                done:0
            };
            this.activedView = 0;
        },
        loadBill:function(bill) {
            this.bill = bill;
            this.activedView = 1;
            this.formType = 'update';
        },
        deleteBill:function(index) {
            if (confirm('Confirma a exclusão da conta ?')) {
                this.bills.splice(index,1);
            }
        }
    }
});


