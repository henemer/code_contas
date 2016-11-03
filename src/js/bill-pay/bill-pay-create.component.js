window.billPayCreateComponent = Vue.extend({
    template: `
        <div class="container">
            <div class="row">
                <form name="form" @submit.prevent="submit">
                    <h2>Nova Conta</h2>
                    <div class="row">
                        <div class="input-field col s6">
                        <label class="active" >Vencimento:</label>
                        <input type="Text" v-model="bill.date_due | dateFormat 'pt-BR'" placeholder="Informe a data"/>
                        </div>
                        <div class="input-field col s6">
                            <label class="active">Valor:</label>
                            <input type="Text" v-model="bill.value | numberFormat 'pt-BR'"/>
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field col s6">
                            <label class="active">Nome:</label>
                            <select v-model="bill.name | name" id="name" class="browser-default">
                            <option value="" disabled selected>Escolha um nome</option>
                            <option v-for="o in names" :value="o">{{o}}</option>
                            </select>
                        </div>
                        <div class="input-field col s6">
                            <input type="checkbox" v-model="bill.done" id="pago">
                            <label for="pago">Paga</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field col s12">
                            <input type="submit" value="enviar" class="btn btn-large right"/>
                        </div>
                    </div>      
                    
                </form>
            </div>
        </div>
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
        $(document).ready(function() {
            $('#name').material_select();
        })

    },
    methods: {
        submit() {
            var data =  this.bill.toJSON();
            if(this.formType=='insert') {
                Bill.save({},data).then((response) => {
                    Materialize.toast('Conta criada com sucesso', 4000);
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-pay.list'});

                });
            } else
            {
                Bill.update({id: this.bill.id}, data).then((response) => {
                    Materialize.toast('Conta alterada com sucesso', 4000);
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
