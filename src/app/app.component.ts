import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { UserService } from './Services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-store';

  constructor(private userService:UserService,private auth:AuthService,private router:Router){
    auth.user$.subscribe(user => {
      
      if(user){
        const url = localStorage.getItem("returnUrl");
        userService.save(user)

        if(url){
          
          localStorage.removeItem("returnUrl")
          router.navigateByUrl(url);
        }
          
      }
    })


  }
}
