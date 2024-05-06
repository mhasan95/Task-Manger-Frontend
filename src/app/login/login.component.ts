import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: Login;
  constructor(private http: HttpClient, private router:Router){
    this.loginObj = new Login();
  }
  onLogin() {
    debugger;
this.http.post('https://freeapi.miniprojectideas.com/api/User/Login', this.loginObj).subscribe((res:any)=>{
  if(res.result) {
        alert("Login Done");
        //this.router.navigateByUrl(./hom);
      }
      else
      {
        alert(res.message);
      }
    })
  }
}

export class Login {

  EmailId: string;
  Password: string;

  constructor() {
    this.EmailId = '';
    this.Password = '';
  }
}