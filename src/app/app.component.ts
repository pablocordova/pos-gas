import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { Sale } from './sale';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { mongoose } from 'mongoose';

@Component({
     selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements OnInit {

    public clientForm = false;
    public ballons = false;
    public pay = false;
    public payButton = false;
    public comment = false;
    public buttonSave = false;
    public history = false;
    public modifyClients = false;
    public ballonsSells = false;

    client = new Client('0', '', '', '', '35');
    data: string;
    sale = new Sale('', '', 0, 0, 0, 0, '');
    sale_data: string;
    histories;
    allclients;
    lastClientSelected: HTMLElement;
    currentTime: string;
    currentDate: string; //added by jaime
    currentTimeandDate: string;
    payAmount: number;
    commenText: string;
    client_fixprice;
    sellBallons;
    receivedBallons;
    currentIdClient: mongoose.Types.ObjectId;
    //option to differentiate if is only sale or pay
    optionSale;
    //
    ballonsDoubt;
    moneyDoubt;
    lastDateSell;
    //
    updateClient;
    
    constructor(private http: Http) {
    }

    ngOnInit(){
        this.histories = [];
        this.ballonsDoubt = 0;
        this.moneyDoubt = 0;
        this.lastDateSell = '';
        this.currentIdClient = '0';
        // Init initial sale amount
        this.payAmount = 0;
        this.sellBallons = '1';
        this.receivedBallons = '1';
        // Here obtains all clients and fill in the combobox
        this.getClients();
        
        // Calculate real time clock
        this.date_time();
    }

    /**
     *    To save sale
     */

    saveSale() {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let requestOptions = new RequestOptions({ headers: headers });

        let sellBallons = this.sellBallons;
        let receivedBallons = this.receivedBallons;
        // I going to make the difference if is to sell gas or only pay
        // When sellBallons is 0 meaning that this data is only a pay
        if(!this.optionSale) {
            sellBallons = 0;
        }

        // Fill all data
        this.sale.date = this.currentTimeandDate;
        this.sale.clientid = this.currentIdClient;
        this.sale.gassell = sellBallons;
        this.sale.gasreceived = receivedBallons;
        this.sale.totalpaid = this.payAmount;
        this.sale.totalreal = sellBallons*this.client_fixprice;
        this.sale.remark = this.commenText;

        this.sale_data = JSON.stringify(this.sale);
        this.http.post('/api/sales', this.sale_data, requestOptions).subscribe(res => {
            let result = res.json();
        });

    }

    /**
     *    Case when buttons "No pago nada"  and "Pago completo" are pressed
     *    @param {integer} option: option when case 0: "No pago nada" button were pressed, and case 1 the other case
     */
    salePay(option) {
        switch (option) {
            case 0:
                this.payAmount = 0;
                break;
            case 1:
                this.payAmount = this.sellBallons*this.client_fixprice;
                break;
        }
    }

    /**
     *    When the client is selected, get all data about his
     */
    selectedClient(event) {
        // Extract the current client pointer
        let currentClient = event.srcElement;
        // To paint the row
        if(this.lastClientSelected) {
            this.lastClientSelected.style.background = '#FFFFFF';
        }
        currentClient.style.background = '#5882FA';

        this.lastClientSelected = currentClient;
        // Get all information about specific client
        let idClient = event.path[1].firstElementChild.innerText;
        // Save the current id as global
        this.currentIdClient = idClient;
        //And current client save id
        //this.client.idclient = idClient;

        let client_api = '/api/clients/' + idClient;
        this.http.get(client_api).subscribe(res => {
            let result = res.json();
            // show button modify client
            this.modifyClients = true;
            this.client_fixprice = result.fixprice;
            //update data
            this.client.idclient = result._id;
            this.client.address = result.address;
            this.client.completename = result.completename;
            this.client.fixprice = result.fixprice;
            this.client.tel = result.tel;
        });

        // Also get information about his purchases
        let sale_client_api = '/api/sales/' + idClient;
        this.http.get(sale_client_api).subscribe(res => {
            let result = res.json();
            //Case result if different of null fill the information
            this.histories = [];
            //variable to calculate ballonSells
            let ballonSells_amount = 0;
            let ballonReceived_amount = 0;
            let money_pay = 0;
            let money_total_real = 0;
            let last_day_buy = '';
            if (result.length > 0) {
                //Ok fill the table with information
                for(let i = 0; i < result.length; i++) {
                    money_pay += result[i].totalpaid;
                    money_total_real += result[i].totalreal;
                    ballonSells_amount += result[i].gassell;
                    ballonReceived_amount += result[i].gasreceived;
                    //this.hdd.push(this.historyData);
                    last_day_buy = result[i].date;
                    result[i].doubt = result[i].totalreal - result[i].totalpaid;
                    this.histories.push(result[i]);
                }
            }
            this.lastDateSell = last_day_buy;
            this.ballonsDoubt = ballonSells_amount - ballonReceived_amount;
            this.moneyDoubt = money_total_real - money_pay;


            //console.log(result);
        });

         
     }

    /**
     *    When tha page is loaded, get all clients
     */

    getClients() {
        this.http.get('/api/clients').subscribe(res => {
            let result = res.json();
            // Now fill the combobox or table I am thinking what I'll use
            this.allclients = result;
        });
    }

    /**
     *    To show secctions in accordance of main radio buttons
     *    @param {string} type - radio button type chosen
     */
    show(type) {
        switch (type) {
            case "sale":
                this.optionSale = true;
                this.clientForm = true;
                this.ballons = true;
                this.pay = true;
                this.payButton = true;
                this.comment = true;
                this.buttonSave = true;
                this.ballonsSells = true;
                // hidde blocks
                this.history = false;
                this.modifyClients = false;
                break;
            case "pay":
                this.optionSale = false;
                this.clientForm = true;
                this.pay = true;
                this.payButton = false;
                this.comment = true;
                this.buttonSave = true;
                this.ballons = true;
                this.ballonsSells = false;
                // rest block hidden
                this.history = false;
                this.payButton = false;

                break;
            case "query":
                this.clientForm = true;
                this.history = true;
                //rest blocks hidden
                this.ballons = false;
                this.pay = false;
                this.comment = false;
                this.buttonSave = false;
                break;
        }
    }

    statusButton(type) {
        //case save reset values
        if(type == 0) {
            this.modifyClients = false;
            this.updateClient = false;
            this.client.idclient = '0';
            this.client.completename = '';
            this.client.address = '';
            this.client.tel = '';
            this.client.fixprice = '35';
        }
    }

    /**
     *    To call an api to create or update data client
     */
    saveClient() {
               
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let requestOptions = new RequestOptions({ headers: headers });

        this.data = JSON.stringify(this.client);

        this.http.post('/api/clients', this.data, requestOptions).subscribe(res => {
            let result = res.json();
            this.getClients();
            // Here I need to update the table where the clients are showed
        });
    }

    //function: date_time
    //--developer: jaime
    //--print the real time clock on the screen 

    date_time(){

        var date = new Date;
        var diem = "AM";
        var h = date.getHours();    
        var m = date.getMinutes();
        var s = date.getSeconds();
        var year = date.getFullYear();
        var month = date.getMonth();
        var d = date.getDate();
        var day = date.getDay();
        var h_ch, m_ch, s_ch;
        var months = new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre');

        var days = new Array('Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado');

        if (h == 0){
            h = 12;
        }
        else if (h>12){
            h = h-12;
            diem = "PM";
        }

        if (h<10){
            h_ch = "0" +h;
        }else{
            h_ch = h;
        }
        if (m<10){
            m_ch = "0"+m;
        }else{
            m_ch = m;
        }

        if (s<10){
            s_ch = "0"+s;
        }else{
            s_ch = s;
        } 

        this.currentDate = days[day] + " " + d + " de " + months[month] + ", " + year + " ";
        this.currentTime = " " + h_ch + ":" + m_ch + ":" + s_ch + " " + diem;
        this.currentTimeandDate = this.currentDate + " " + " " + " " + this.currentTime;
        setTimeout(() => { this.date_time(); }, 1000);

    }   



}