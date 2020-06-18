import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  userForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      password2: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
    });
  }

  onSubmit() {

    const email = this.userForm.get('email').value;
    const password = this.userForm.get('password').value;
    const password2 = this.userForm.get('password2').value;

    if (password === password2) {

      const user = new User(email, password);

      this.authService.editUser(user).then(
        () => {
          this.router.navigate(['/admin']);
        },
        (error) => {
          console.log("error edit user ", error)
          this.errorMessage = error;
        }
      );
    } else {
      this.errorMessage = "Les deux mots de passe ne sont pas identiques";
    }
  }

}
