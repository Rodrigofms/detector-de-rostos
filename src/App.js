import React, { Component } from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg'
import './App.css';


const setupClarifai = (imageUrl) => {

  const PAT = 'a403e5ad7fd5435487b7b1c44a84a406';
  const USER_ID = 'rodrigofms';
  const APP_ID = 'facecheck';
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": IMAGE_URL
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  return requestOptions
}


const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  usuario: {
    id: '',
    nome: '',
    email: '',
    entrou: ''
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = initialState;

  };

  loadUser = (data) => {
    this.setState({
      usuario: {
        id: data.id,
        nome: data.nome,
        email: data.email,
        entrou: data.entrou
      }
    })
  }

  calculateFaceLoc = (data) => {
    const faceClarifai = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.width);
    return {
      leftCol: faceClarifai.left_col * width,
      topRow: faceClarifai.top_row * height,
      rightCol: width - (faceClarifai.right_col * width),
      bottomRow: height - (faceClarifai.bottom_row * height)
    }

  };

  displayFace = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  };


  onSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    const MODEL_ID = "face-detection"
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", setupClarifai(this.state.input))
      .then(response => response.json())
      .then(response => this.displayFace(this.calculateFaceLoc(response)))
      .catch(err => console.log(err))
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App" >
        <ParticlesBg type="square" bg={true} num={15} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
          ?
          <div>
            <Logo />
            <Rank nome={this.state.usuario.nome} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
          :
          (
            route === 'signin' ?
              <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              :
              <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  };
}

export default App;

