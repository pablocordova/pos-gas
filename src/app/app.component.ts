import { Component, OnInit } from '@angular/core';
import { Client } from './client';
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

    data: string;
    client = new Client('0','','','','');
    
    constructor(private http: Http) {
    }

    ngOnInit(){
        this.date_time();
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
        console.log("yess");
        console.log(this.client);

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

        var result = document.getElementById('date_element');
        result.textContent =  h_ch + ":" + m_ch + ":" + s_ch + " " + diem;
        result.innerText =  h_ch + ":" + m_ch + ":" + s_ch + " " + diem;
        setTimeout(() => { this.date_time(); }, 1000);

    }   



}