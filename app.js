var app = new Vue({
    el:"#app",
    data: {
        title:"Contas a pagar",
        bills: [
            {date_due: '20/08/2016', name:'Conta de luz', value:'900.99',done:0},
            {date_due: '21/08/2016', name:'Conta de agua', value:'226.23',done:1},
            {date_due: '22/08/2016', name:'Gas', value:'116.00',done:0},
            {date_due: '23/08/2016', name:'PRestação', value:'4000.0',done:1},
            {date_due: '24/08/2016', name:'Telefone', value:'160.99',done:0},
            {date_due: '25/08/2016', name:'Internet', value:'25.99',done:0},
            {date_due: '26/08/2016', name:'Emprestimo', value:'600.00',done:0},
            {date_due: '27/08/2016', name:'Combustível', value:'200.99',done:0},
            {date_due: '28/08/2016', name:'Mercado', value:'600.00',done:0},
            {date_due: '29/08/2016', name:'Almoço', value:'17.00',done:0},
            {date_due: '19/08/2016', name:'Padaria', value:'25.00',done:0}
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
            return !count?"Nenhuma conta a pagar":"Existem "+count + "a serem pagas";
        }
    }
});