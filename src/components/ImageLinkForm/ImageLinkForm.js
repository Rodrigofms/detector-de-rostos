import React from "react";
import './ImageLinkForm.css';


const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <div>
      <p className="f3 b">
        Este app irá detectar rostos em qualquer foto, vá em frente, pode testar:
      </p>
      <div className="center">
        <div className='form center pa4 br3 shadow-5' onChange={onInputChange}>
          <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange} />
          <button className="w-30 grow f4 link ph3 pv2 dib white bg-blue" onClick={onSubmit}>Localizar</button>
        </div>
      </div>
    </div>
  );
}


export default ImageLinkForm;