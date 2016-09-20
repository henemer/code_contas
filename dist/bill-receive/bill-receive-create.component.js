'use strict';

window.billReceiveCreateComponent = Vue.extend({
    template: '\n        <form name="form" @submit.prevent="submit">\n            <label>Vencimento:</label>\n            <input type="Text" v-model="bill.date_due | dateFormat \'pt-BR\'"/>\n            <br/><br/>\n            <label>Nome:</label>\n            <select v-model="bill.name | name ">\n            <option v-for="o in names" :value="o">{{o}}</option>\n            </select>\n            <br/><br/>\n            <label>Valor:</label>\n            <input type="Text" v-model="bill.value | numberFormat \'pt-BR\'"/>\n            <br/><br/>\n            <label>Recebida</label>\n            <input type="checkbox" v-model="bill.done">\n            <br/><br/>\n            <input type="submit" value="enviar"/>\n        \n        </form>\n    ',
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
            this.getBill(this.$route.params.index);
            return;
        }
    },

    methods: {
        submit: function submit() {
            var _this = this;

            var data = this.bill.toJSON();
            if (this.formType == 'insert') {
                BillR.save({}, data).then(function (response) {
                    _this.$dispatch('change-info');
                    _this.$router.go({ name: 'bill-receive.list' });
                });
            } else {
                BillR.update({ id: this.bill.id }, data).then(function (response) {
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