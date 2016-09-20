'use strict';

window.billPayListComponent = Vue.extend({
    template: '\n         <style type="text/css">\n                .paga {\n                    color:green;\n                }\n                .nao-paga {\n                    color:red;\n                }\n         </style>\n\n        <table border="1" cellpadding="10">\n            <thead>\n            <tr>\n                <th>#</th>\n                <th>Vecimento</th>\n                <th>Nome</th>\n                <th>Valor</th>\n                <th>Paga?</th>\n                <th>Ações</th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr v-for="(index,o) in bills">\n                <td>{{index}}</td>\n                <td>{{o.date_due | dateFormat \'pt-BR\'}}</td>\n                <td>{{o.name | name}}</td>\n                <td>{{o.value | numberFormat \'pt-BR\'}}</td>\n                <td :class="{\'paga\': o.done, \'nao-paga\':!o.done}">\n                    {{o.done | doneLabelPay}}\n                </td>\n                <td>\n                    <a v-link="{name:\'bill-pay.update\', params: {id:o.id}}">Editar</a> |\n                    <a href="#" @click.prevent="deleteBill(o)">Excluir</a>\n                </td>\n            </tr>\n            </tbody>\n        </table>\n    ',

    data: function data() {
        return {
            bills: []
        };
    },
    created: function created() {
        var _this = this;

        Bill.query().then(function (response) {
            return _this.bills = response.data;
        });
    },

    methods: {
        deleteBill: function deleteBill(bill) {
            var _this2 = this;

            if (confirm('Confirma a exclusão da conta ?')) {
                Bill.delete({ id: bill.id }).then(function (response) {
                    _this2.bills.$remove(bill);
                    _this2.$dispatch('change-info');
                });
            }
        }
    }
});