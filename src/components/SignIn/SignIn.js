import React from "react";


class SignIn extends React.Component {
  constructor(props) {
    super();
    this.state = {
      SignInEmail: '',
      SignInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({ SignInEmail: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ SignInPassword: event.target.value });
  }

  onSubmitSignIn = () => {
    fetch('https://server-api-ph7c.onrender.com/entrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.SignInEmail,
        senha: this.state.SignInPassword
      })
    }).then(response => response.json())
      .then(data => {
        if (data.id) {
          this.props.loadUser(data)
          this.props.onRouteChange('home');
        }
      })
  }

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba d b--black-10 mv4 w-100 w50-m w-25-1 mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Bem-vindo</legend>
              <div className="mt3">
                <label className="b db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" onChange={this.onEmailChange} />
              </div>
              <div className="mv3">
                <label className="b db fw6 lh-copy f6" htmlFor="password">Senha</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" onChange={this.onPasswordChange} />
              </div>
            </fieldset>
            <div className="">
              <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Entrar" />
            </div>
            <div className="lh-copy mt3 pointer">
              <p onClick={() => onRouteChange('registrar')} href="#0" className="underline f6 link dim black db">Registre-se</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;