Vue.filter('statusLabelPay', function(count) {
    if (count == -1) {
        return "Nenhuma conta cadastrada";
    }
    return !count?"Nenhuma conta a pagar":"Existem "+count + " contas a serem pagas";
});

Vue.filter('statusLabelReceive', function(count) {
    if (count == -1) {
        return "Nenhuma conta cadastrada";
    }
    return !count?"Nenhuma conta a receber":"Existem "+count + " contas a serem recebidas";
});

Vue.filter('doneLabelPay', function(value) {
    if(value == 0) {
        return "Não Paga"
    }
    else{
        return "Paga"
    }
});

Vue.filter('doneLabelReceive', function(value) {
    if(value == 0) {
        return "Não Recebida"
    }
    else{
        return "Recebida"
    }
});
