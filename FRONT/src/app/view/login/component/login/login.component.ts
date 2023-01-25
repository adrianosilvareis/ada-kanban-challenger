import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../service/local-storage.service';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  form = this.formBuilder.group({
    login: new FormControl('', { nonNullable:true }),
    senha: new FormControl('', { nonNullable:true }),
  })

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private localStorageService: LocalStorageService,
    private router: Router) {}

  ngOnInit(): void {
    this.localStorageService.clear();
    this.resetForm();
  }

  login() {
    if (!this.isValid()) {
      return;
    }

    const body = {
      login: this.form.value.login ?? '',
      senha: this.form.value.senha ?? ''
    }
    this.loginService.makeLogin(body).subscribe({
        next: result => {
          this.localStorageService.set('TOKEN', result);
          this.router.navigate(['kanban']);
        },
        error: (error) => this.resetForm()
      })
    }

  private isValid() {
    if (this.form.value.login === undefined || this.form.value.senha === undefined) {
      return false;
    }
    return true;
  }

  private resetForm() {
    this.form.setValue({
      login: '',
      senha: '',
    })
  }
}
