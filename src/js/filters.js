Vue.filter('statusLabelPay', (count) =>  {
    if (count == -1) {
        return "Nenhuma conta cadastrada";
    }
    return !count?"Nenhuma conta a pagar":count + " contas a serem pagas";
});

Vue.filter('statusLabelReceive', (count) =>  {
    if (count == -1) {
        return "Nenhuma conta cadastrada";
    }
    return !count?"Nenhuma conta a receber":"Existem "+count + " contas a serem recebidas";
});

Vue.filter('doneLabelPay', (value) => value == 0 ? "Não Paga" : "Paga");

Vue.filter('doneLabelReceive', (value) =>  value == 0 ? "Não Recebida" : "Recebida");

Vue.filter('numberFormat', {
    read(value, format) {
        var number = 0;

        if(value  && typeof value !== undefined) {
            var numberRegex = value.toString().match(/\d+(\.{1}\d{1,2}){0,1}/g);
            number = numberRegex ? numberRegex[0] : numberRegex;
        }
        return new Intl.NumberFormat(format, {
            maximumFractionDigits:2,
            minimumFractionDigits:2,
            style: 'currency',
            currency: 'BRL'
        }).format(number);
    },
    write(value) {
        let number = 0
        if(value.length > 0) {
            number =  value.replace(/[^\d,]/g,'')
                .replace(',','.');

            number = isNaN(number) ? 0 : parseFloat(number);
        }
        return number;
    }
})

Vue.filter('dateFormat', {
    read(value, format) {
        if(value && typeof value !== undefined) {
            if(!(value instanceof Date)) {
                let dateRegex = value.match(/\d{4}\-{1}\d{2}\-\d{2}/g);
                let dateString =  dateRegex ?  dateRegex[0] : null;
                if(dateString) {
                    value = new Date(dateString+"T03:00:00");
                }else {
                    return value;
                }
            }
            return new Intl.DateTimeFormat(format).format(value).split(' ')[0];
        }
        return value;
    },
    write(value) {
        let dateRegex = value.match(/\d{2}\/{1}\d{2}\/\d{4}/g);
        if(dateRegex) {
            let dateString = dateRegex[0];
            let date = new Date(dateString.split('/').reverse().join('-') + "T03:00:00");
            if(!isNaN((date.getTime()))) {
                return date;
            }
        }
        return value;
    }

})

Vue.filter('name', {
    read(value) {
        return value.toUpperCase();
    },
    write(value) {
        return value.toLowerCase();
    }
})