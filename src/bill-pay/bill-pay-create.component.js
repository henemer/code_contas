window.billPayCreateComponent = Vue.extend({
    template: `
        <form name="form" @submit.prevent="submit">
            <label>Vencimento:</label>
            <input type="Text" v-model="bill.date_due | dateFormat 'pt-BR'"/>
            <br/><br/>
            <label>Nome:</label>
            <select v-model="bill.name | name">
            <option v-for="o in names" :value="o">{{o}}</option>
            </select>
            <br/><br/>
            <label>Valor:</label>
            <input type="Text" v-model="bill.value | numberFormat 'pt-BR'"/>
            <br/><br/>
            <label>Paga</label>
            <input type="checkbox" v-model="bill.done">
            <br/><br/>
            <input type="submit" value="enviar"/>
        
        </form>
    `,
      data() {
        return {
            formType:'insert',
            names: [
                'CONTA DA LUZ',
                'CONTA DE ÁGUA',
                'CONTA DE TELEFONE',
                'SUPERMERCADO',
                'CARTÃO DE CRÉDITO',
                'EMPRÉSTIMO',
                'GASOLINA'
            ],
            bill: new BillPay()
        };
    },
    created() {
        if(this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
            return;
        }
    },
    methods: {
        submit() {
            var data =  this.bill.toJSON();
            if(this.formType=='insert') {
                Bill.save({},data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-pay.list'});
                });
            } else
            {
                Bill.update({id: this.bill.id}, data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-pay.list'});
                });

            }
        },
        getBill(id) {
            Bill.get({id:id}).then((response) =>{
                this.bill = new BillPay(response.data);
            });
        },
        // getDateDue(dateDue) {
        //     let dateDueObject =  dateDue;
        //     if(!(dateDue instanceof Date)) {
        //         dataDueObject = new Date(date_due.split('/').reverse().join('-') + "T03:00:00");
        //     }
        //     return dateDueObject.toISOString().split('T')[0];
        // }
    }
});
