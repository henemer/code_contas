class BillPay{
    constructor(data = {}) {
       this.date_due = '';
       this.name =  '';
       this.value = 0;
       this.done = false;
       Object.assign(this, data);

    }

    toJSON() {
        if (typeof this.date_due == "string") {
            this.date_due = new Date(this.date_due+ "T03:00:00");
        }
        return {
            date_due: this.date_due.toISOString().substring(0,10),
            name: this.name,
            value: this.value,
            done: this.done

        }
    }
}