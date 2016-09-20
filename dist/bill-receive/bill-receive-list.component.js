'use strict';

window.billReceiveListComponent = Vue.extend({
    template: '\n         <style type="text/css">\n                .recebida {\n                    color:green;\n                }\n                .nao-recebida {\n                    color:red;\n                }\n         </style>\n\n        <table border="1" cellpadding="10">\n            <thead>\n            <tr>\n                <th>#</th>\n                <th>Vecimento</th>\n                <th>Nome</th>\n                <th>Valor</th>\n                <th>Recebida?</th>\n                <th>Ações</th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr v-for="(index,o) in bills">\n                <td>{{index}}</td>\n                <td>{{o.date_due | dateFormat \'pt-BR\'}}</td>\n                <td>{{o.name | name}}</td>\n                <td>{{o.value | numberFormat \'pt-BR\'}}</td>\n                <td :class="{\'recebida\': o.done, \'nao-recebida\':!o.done}">\n                    {{o.done | doneLabelReceive}}\n                </td>\n                <td>\n                    <a v-link="{name:\'bill-receive.update\', params: {id:o.id}}">Editar</a> |\n                    <a href="#" @click.prevent="deleteBill(o)">Excluir</a>\n                </td>\n            </tr>\n            </tbody>\n        </table>\n    ',

    data: function data() {
        return {
            bills: []
        };
    },
    created: function created() {
        var self = this;
        BillR.query().then(function (response) {
            self.bills = response.data;
        });
    },

    methods: {
        deleteBill: function deleteBill(bill) {
            var _this = this;

            if (confirm('Confirma a exclusão da conta ?')) {
                BillR.delete({ id: bill.id }).then(function (response) {
                    _this.bills.$remove(bill);
                    _this.$dispatch('change-info');
                });
            }
        }
    }

});