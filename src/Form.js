import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import './Form.css';

class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmpassword:'',
      mobileno:'',
      address:'',
      zipcode:'',
      formErrors: {email: '', password: '',confirmpassword:'',mobileno:'',address:'',zipcode:'',},
      emailValid: false,
      passwordValid: false,
      confirmpass:false,
      zipvalid:false,
      mobilevalid:false,
      formValid: false
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let confirmpass=this.state.confirmpass;
    let zipvalid=this.state.zipvalid;
    let mobilevalid=this.state.mobilevalid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        break;
      case 'confirmpassword':
        confirmpass=(this.state.password===this.state.confirmpassword);
        fieldValidationErrors.confirmpassword=confirmpass?'':' is not matchching with password';
        break;
      case 'zipcode':
        zipvalid=value.match(/(^\d{6}$)/);
        fieldValidationErrors.zipcode=zipvalid ? '':' is not valid';
        break;
      case 'mobileno':
        mobilevalid=value.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/);
        fieldValidationErrors.mobileno=mobilevalid? '':' is not valid ';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid,
                    confirmpass:confirmpass,
                    zipvalid:zipvalid,
                    mobilevalid:mobilevalid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.mobilevalid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  render () {
    return (
      <div >
      <form className="Form1">

      <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <label htmlFor="email">Email address</label>
          <input type="email" required className="form-control" name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput}  />
        </div>
        <br/>
        <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleUserInput}  />
        </div>
        <br/>

        <div className={`form-group ${this.errorClass(this.state.formErrors.confirmpassword)}`}>
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input type="password" className="form-control" name="confirmpassword"
            placeholder="Confirm Password"
            value={this.state.confirmpassword}
            onChange={this.handleUserInput}  />
        </div>
        <br/>
        <div className={`form-group ${this.errorClass(this.state.formErrors.mobileno)}`}>
          <label htmlFor="mobileno">Mobile Number</label>
          <input type="mobileno" className="form-control" name="mobileno"
            placeholder="Mobile Number"
            value={this.state.mobileno}
            onChange={this.handleUserInput}  />
        </div>
        <br/>
        <div>
          <label>Date Of Birth</label>
          <input type="date" className="form-control" name="dob"
           />
        </div>
        <br/>
        <div className={`form-group ${this.errorClass(this.state.formErrors.address)}`}>
          <label htmlFor="address">Address</label>
          <input type="text" className="form-control" name="address"
            placeholder="Address line 1"  />
            <input type="text" className="form-control" name="address"
            placeholder="Address line 2"  />
        </div>
        <br/>
        <div className={`form-group ${this.errorClass(this.state.formErrors.zipcode)}`}>
          <label htmlFor="zipcode">Zip Code</label>
          <input type="zipcode" className="form-control" name="zipcode"
            placeholder="Zip Code"
            value={this.state.zipcode}
            onChange={this.handleUserInput}  />
        </div>
        <div>
        <label>City</label><br/>
            <select >
                <option value="Bangalore">Bangalore</option>
                <option value="mangalore">Mangalore</option>
                <option value="gurugram">Gurgaon</option>
                <option value="delhi">Delhi</option>
                <option value="jaipur">Jaipur</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="pune">Pune</option>
            </select>
        </div>
        <span name="formerror">
          <FormErrors formErrors={this.state.formErrors}  />
        </span>
        <button type="submit" disabled={!this.state.formValid}>Submit Form</button>
      </form>
      </div>
    )
  }
}

export default Form;