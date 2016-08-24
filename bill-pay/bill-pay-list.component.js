window.billPayListComponent = Vue.extend({
    template: `
         <style type="text/css">
                .paga {
                    color:green;
                }
                .nao-paga {
                    color:red;
                }
         </style>

        <table border="1" cellpadding="10">
            <thead>
            <tr>
                <th>#</th>
                <th>Vecimento</th>
                <th>Nome</th>
                <th>Valor</th>
                <th>Paga?</th>
                <th>Ações</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(index,o) in bills">
                <td>{{index}}</td>
                <td>{{o.date_due}}</td>
                <td>{{o.name}}</td>
                <td>{{o.value | currency 'R$ ' 2 }}</td>
                <td :class="{'paga': o.done, 'nao-paga':!o.done}">
                    {{o.done | doneLabelPay}}
                </td>
                <td>
                    <a v-link="{name:'bill-pay.update', params: {index:index}}">Editar</a> |
                    <a href="#" @click.prevent="deleteBill(o)">Excluir</a>
                </td>
            </tr>
            </tbody>
        </table>
    `,

    data: function () {
        return {
            bills:this.$root.$children[0].billsPay
        };
    },
    methods: {
        deleteBill:function(bill) {
            if (confirm('Confirma a exclusão da conta ?')) {
                this.$root.$children[0].billsPay.$remove(bill);
            }
        }
    }

});
