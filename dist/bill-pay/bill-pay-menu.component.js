"use strict";

window.billPayMenuComponent = Vue.extend({
    template: "        \n        <nav>\n        <ul>\n        <li v-for=\"o in menus\">\n            <a v-link=\"{name:o.routeName}\">{{o.name}}</a></li>\n        \n        </ul>\n        </nav>\n    ",
    data: function data() {
        return {
            menus: [{ id: 0, name: "Listar Contas", routeName: 'bill-pay.list' }, { id: 1, name: "Criar Conta", routeName: 'bill-pay.create' }]
        };
    }
});