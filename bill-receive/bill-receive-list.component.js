window.billReceiveListComponent = Vue.extend({
    template: `
         <style type="text/css">
                .recebida {
                    color:green;
                }
                .nao-recebida {
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
                <th>Recebida?</th>
                <th>Ações</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(index,o) in bills">
                <td>{{index}}</td>
                <td>{{o.date_due}}</td>
                <td>{{o.name}}</td>
                <td>{{o.value | currency 'R$ ' 2 }}</td>
                <td :class="{'recebida': o.done, 'nao-recebida':!o.done}">
                    {{o.done | doneLabelReceive}}
                </td>
                <td>
                    <a v-link="{name:'bill-receive.update', params: {id:o.id}}">Editar</a> |
                    <a href="#" @click.prevent="deleteBill(o)">Excluir</a>
                </td>
            </tr>
            </tbody>
        </table>
    `,

    data: function () {
        return {
            bills:[]
        };
    },
    created: function(){
        var self = this;
        BillR.query().then(function(response){
            self.bills = response.data;
        });
    },
    methods: {
        deleteBill:function(bill) {
            if (confirm('Confirma a exclusão da conta ?')) {
                var self = this;
                BillR.delete({id: bill.id}).then(function (response) {
                    self.bills.$remove(bill);
                    self.$dispatch('change-info');
                });
            }
        }
    }

});
