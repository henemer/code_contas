window.billReceiveCreateComponent = Vue.extend({
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
            <label>Recebida</label>
            <input type="checkbox" v-model="bill.done">
            <br/><br/>
            <input type="submit" value="enviar"/>
        
        </form>
    `,
    data:function() {
        return {
            formType:'insert',
            names: [
                'Hospedagem Plano A',
                'Hospedagem Plano B',
                'Desenvolvimento',
                'Suporte'
            ],
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            }


        };
    },
    created: function() {
        if(this.$route.name == 'bill-receive.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.index);
            return;
        }
    },
    methods: {
        submit:function() {
            var self = this;
            if(this.formType=='insert') {
                BillR.save({}, this.bill).then(function(response) {
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-receive.list'});
                });
            } else {
                BillR.update({id: this.bill.id}, this.bill).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({name: 'bill-receive.list'});
                });
            }
        },
        getBill: function(id) {
            var self = this;
            BillR.get({id:id}).then(function(response) {
                self.bill = response.data;
            });
        }
    }
});