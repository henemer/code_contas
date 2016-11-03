window.billReceiveCreateComponent = Vue.extend({
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
                        <input type="checkbox" v-model="bill.done" id="recebido">
                        <label for="recebido">Recebido</label>
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
                BillR.save({}, data).then((response) => {
                    Materialize.toast('Conta criada com sucesso', 4000);
                    this.$dispatch('change-info');
                    this.$router.go({name: 'bill-receive.list'});
                });
            } else {
                BillR.update({id: this.bill.id}, data).then((response) => {
                    Materialize.toast('Conta atualizada com sucesso', 4000);
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
