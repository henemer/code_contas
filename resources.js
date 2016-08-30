Vue.http.options.root ='http://192.168.10.10:8000/api';

window.Bill = Vue.resource('bills{/id}',{},{
    total: {method: 'GET', url: 'bills/total'}
});

window.BillR = Vue.resource('billsr{/id}',{},{
    total: {method: 'GET', url: 'billsr/total'}
});