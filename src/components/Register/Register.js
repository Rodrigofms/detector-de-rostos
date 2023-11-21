import React from "react";


class Register extends React.Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      senha: '',
      nome: ''
    }
  }

  onNameChange = (event) => {
    this.setState({ nome: event.target.value });
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ senha: event.target.value });
  }

  onSubmitRegister = () => {
    fetch('https://server-api-ph7c.onrender.com/registrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        senha: this.state.senha,
        nome: this.state.nome
      })
    }).then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user)
          this.props.onRouteChange('home');
        }
      })
  }

  render() {


    return (
      <article className="br3 ba d b--black-10 mv4 w-100 w50-m w-25-1 mw6 shadow-5 center" >
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className=" f1 fw6 ph0 mh0">Registre-se</legend>
              <div className="mt3">
                <label className="b db fw6 lh-copy f6" htmlFor="name">Nome</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" onChange={this.onNameChange} />
                <label className="b db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" onChange={this.onEmailChange} />
              </div>
              <div className="mv3">
                <label className="b db fw6 lh-copy f6" htmlFor="password">Senha</label>
                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" onChange={this.onPasswordChange} />
              </div>
            </fieldset>
            <div className="">
              <input onClick={this.onSubmitRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Cadastrar" />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;