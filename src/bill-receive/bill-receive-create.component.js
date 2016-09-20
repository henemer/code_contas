window.billReceiveCreateComponent = Vue.extend({
    template: `
        <form name="form" @submit.prevent="submit">
            <label>Vencimento:</label>
            <input type="Text" v-model="bill.date_due | dateFormat 'pt-BR'"/>
            <br/><br/>
            <label>Nome:</label>
            <select v-model="bill.name | name ">
            <option v-for="o in names" :value="o">{{o}}</option>
            </select>
            <br/><br/>
            <label>Valor:</label>
            <input type="Text" v-model="bill.value | numberFormat 'pt-BR'"/>
            <br/><br/>
            <label>Recebida</label>
            <input type="checkbox" v-model="bill.done">
            <br/><br/>
            <input type="submit" value="enviar"/>
        
        </form>
    `,
    data() {
        return {
            formType:'insert',
            names: [
                'HOSPEDAGEM PLANO A',
                'HOSPEDAGEM PLANO B',
                'DESENVOLVIMENTO',
                'SUPORTE'
            ],
            bill:  new BillReceive()

        };
    },
    created() {
        if(this.$route.name == 'bill-receive.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.index);
            return;
        }
    },
    methods: {
        submit() {
            var data =  this.bill.toJSON();
            if(this.formType=='insert') {
                BillR.save({}, data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-receive.list'});
                });
            } else {
                BillR.update({id: this.bill.id}, data).then((response) => {
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-receive.list'});
                });
            }
        },
        getBill(id) {
            BillR.get({id:id}).then((response) =>{
                this.bill = new BillReceive(response.data);
            });
        },
    }
});
