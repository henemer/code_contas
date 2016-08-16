Vue.filter('statusLabel', function(count) {
    if ((this.bills.length) == 0 ) {
        return "Nenhuma conta cadastrada";
    }
    return !count?"Nenhuma conta a pagar":"Existem "+count + " contas a serem pagas";
});

Vue.filter('doneLabel', function(value) {
    if(value == 0) {
        return "Não Paga"
    }
    else{
        return "Paga"
    }
});
