window.billReceiveListComponent = Vue.extend({
    components: {
        modal:modalComponent
    },
    template: `
            <div class="container">
         <div class="row">
             <div class="col s12">
                 <h2>Minhas Contas a Receber</h2>
                 <table class="bordered striped responsive-table z-depth-3">
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
                        <td>{{o.date_due | dateFormat 'pt-BR'}}</td>
                        <td>{{o.name | name}}</td>
                        <td>{{o.value | numberFormat 'pt-BR'}}</td>
                        <td class="white-text" :class="{'green lighten-2': o.done, 'red lighten-2':!o.done}">
                            {{o.done | doneLabelReceive}}
                        </td>
                        <td>
                            <a v-link="{name:'bill-receive.update', params: {id:o.id}}">Editar</a> |
                            <a href="#" @click.prevent="openModalDelete(o)">Excluir</a>
                        </td>
                    </tr>
                    </tbody>
                 </table>
             </div>
         </div>

         </div>
        <modal :modal="modal">
            <div slot="content">
                <h4>Mensagem de confirmação</h4>
                <p><strong>Deseja excluir esta conta?</strong></p>
                <div class="divider"></div>
                <p>Nome:<strong>{{billToDelete.name}}</strong></p>
                <p>Valor:<strong>{{billToDelete.value | numberFormat}}</strong></p>
                <p>Data de vencimento:<strong>{{billToDelete.date_due | dateFormat}}</strong></p>
                <div class="divider"></div>
            </div>
            <div slot="footer">
                <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" 
                    @click="deleteBill()">Ok</button>
                <button class="btn btn-flat waves-effect waves-red modal-close modal-action">Cancelar</button>
            </div>
        </modal>   
       
    `,

    data() {
        return {
            bills:[],
            billToDelete: null,
            modal: {
                id:'modal-delete'
            }

        };
    },
    created(){
        BillR.query().then((response) => this.bills = response.data);
    },
    methods: {
        deleteBill() {
            BillR.delete({id: this.billToDelete.id}).then((response) => {
                this.bills.$remove(this.billToDelete);
                this.billToDelete = null;
                Materialize.toast('Conta excluída com sucesso', 4000);
                this.$dispatch('change-info');
            });
        },
        openModalDelete(bill) {
            this.billToDelete = bill;
            $('#modal-delete').openModal();

        }
    }

});

