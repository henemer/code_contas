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
                <td>{{o.date_due | dateFormat 'pt-BR'}}</td>
                <td>{{o.name | name}}</td>
                <td>{{o.value | numberFormat 'pt-BR'}}</td>
                <td :class="{'paga': o.done, 'nao-paga':!o.done}">
                    {{o.done | doneLabelPay}}
                </td>
                <td>
                    <a v-link="{name:'bill-pay.update', params: {id:o.id}}">Editar</a> |
                    <a href="#" @click.prevent="deleteBill(o)">Excluir</a>
                </td>
            </tr>
            </tbody>
        </table>
    `,

    data() {
        return {
            bills:[]
        };
    },
    created(){
        Bill.query().then((response) => this.bills = response.data);
    },
    methods: {
        deleteBill(bill) {
            if (confirm('Confirma a exclusão da conta ?')) {
                Bill.delete({id: bill.id}).then((response) => {
                    this.bills.$remove(bill);
                    this.$dispatch('change-info');
                });
            }
        }
    }
});
