import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

 //function: date_time
 //--developer: jaime
 //--print the real time clock on the screen 

	ngOnInit(){
		this.date_time();
	}

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