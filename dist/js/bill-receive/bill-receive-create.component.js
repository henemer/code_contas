'use strict';

window.billReceiveCreateComponent = Vue.extend({
    template: '\n   <div class="container">\n        <div class="row">\n            <form name="form" @submit.prevent="submit">\n                <h2>Nova Conta</h2>\n                <div class="row">\n                    <div class="input-field col s6">\n                    <label class="active" >Vencimento:</label>\n                    <input type="Text" v-model="bill.date_due | dateFormat \'pt-BR\'" placeholder="Informe a data"/>\n                    </div>\n                    <div class="input-field col s6">\n                        <label class="active">Valor:</label>\n                        <input type="Text" v-model="bill.value | numberFormat \'pt-BR\'"/>\n                    </div>\n                </div>\n                \n                <div class="row">\n                    <div class="input-field col s6">\n                        <label class="active">Nome:</label>\n                        <select v-model="bill.name | name" id="name" class="browser-default">\n                        <option value="" disabled selected>Escolha um nome</option>\n                        <option v-for="o in names" :value="o">{{o}}</option>\n                        </select>\n                    </div>\n                    <div class="input-field col s6">\n                        <input type="checkbox" v-model="bill.done" id="recebido">\n                        <label for="recebido">Recebido</label>\n                    </div>\n                </div>\n\n                <div class="row">\n                    <div class="input-field col s12">\n                        <input type="submit" value="enviar" class="btn btn-large right"/>\n                    </div>\n                </div>      \n                \n            </form>\n        </div>\n    </div>\n    ',
    data: function data() {
        return {
            formType: 'insert',
            names: ['HOSPEDAGEM PLANO A', 'HOSPEDAGEM PLANO B', 'DESENVOLVIMENTO', 'SUPORTE'],
            bill: new BillReceive()

        };
    },
    created: function created() {
        if (this.$route.name == 'bill-receive.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
            return;
        }
        $(document).ready(function () {
            $('#name').material_select();
        });
    },

    methods: {
        submit: function submit() {
            var _this = this;

            var data = this.bill.toJSON();
            if (this.formType == 'insert') {
                BillR.save({}, data).then(function (response) {
                    Materialize.toast('Conta criada com sucesso', 4000);
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-receive.list' });
                });
            } else {
                BillR.update({ id: this.bill.id }, data).then(function (response) {
                    Materialize.toast('Conta atualizada com sucesso', 4000);
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-receive.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var _this2 = this;

            BillR.get({ id: id }).then(function (response) {
                _this2.bill = new BillReceive(response.data);
            });
        }
    }
});