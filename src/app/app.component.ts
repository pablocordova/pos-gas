import { Component, OnInit } from '@angular/core';
import { Client } from './client';
//import { Sale } from './sale';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

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

    data: string;
    client = new Client('0','','','','');
    //sale = new Sale();
    allclients;
    lastClientSelected: HTMLElement;
    currentTime: string;
    payAmount: number;
    client_fixprice;
    sellBallons;
    receivedBallons;
    
    constructor(private http: Http) {
    }

    ngOnInit(){
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
        /*this.http.post('/api/sales', )*/
        console.log(this.sellBallons);
        console.log(this.receivedBallons);
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
                this.payAmount = this.client_fixprice;
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
        let client_api = '/api/clients/' + idClient;
        this.http.get(client_api).subscribe(res => {
            let result = res.json();
            // show button modify client
            this.modifyClients = true;
            this.client_fixprice = result.fixprice;
            console.log(result);
        });

        // Also get information about his purchases
        let sale_client_api = '/api/sales/' + idClient;
        this.http.get(sale_client_api).subscribe(res => {
            let result = res.json();
            //Case result if different of null fill the information
            if (!result) {
                console.log('there are information about sale');
            }
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
            console.log(result);
        });
    }

    /**
     *    To show secctions in accordance of main radio buttons
     *    @param {string} type - radio button type chosen
     */
    show(type) {
        switch (type) {
            case "sale":
                this.clientForm = true;
                this.ballons = true;
                this.pay = true;
                this.payButton = true;
                this.comment = true;
                this.buttonSave = true;
                // hidde blocks
                this.history = false;
                this.modifyClients = false;
                break;
            case "pay":
                this.clientForm = true;
                this.pay = true;
                this.payButton = false;
                this.comment = true;
                this.buttonSave = true;
                // rest block hidden
                this.ballons = false;
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
            console.log('result saving');
            console.log(result);
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
        var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 
        'September', 'October', 'November', 'December');

        var days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');

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

        this.currentTime = h_ch + ":" + m_ch + ":" + s_ch + " " + diem;
        
        setTimeout(() => { this.date_time(); }, 1000);

    }   



}