import axios from 'axios';
import React, {useState} from 'react';
import bear from './bear-panda.gif'


function Boxes() {
  const [inputText, setInputText] = useState('');
  const [imageUrl, setImageUrl] = useState(bear);
  const [serverCall, setServerCall] = useState(false)
  const serverUrl = "http://10.8.18.122:80"

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleReset = () =>{
    setImageUrl(bear);
  }

  const handleSubmit = async () => {
    setServerCall(true)
    const response_generate = await axios.post(`${serverUrl}/generate`,{
      prompt: inputText
    })

    // console.log("Data:", response_generate.data.image_path)
    const response = await axios.get(`${serverUrl}/get_image`,{
      params:{
        image_path:response_generate.data.image_path
      },
      responseType:'blob'
    })

    const blob = new Blob([response.data], { type: 'image/png' });
    const url = URL.createObjectURL(blob);
    setImageUrl(url);
    setServerCall(false)
    
  };
  return (
    <div className='container-fluid'>
      <div className='row justify-content-center align-items-center' style={{ height: '100vh' }}>
        <div className='col-md-6'>
          <div className='row align-items-center'>
            <div className='col'>
              <input className='form-control mb-3' placeholder='Enter image description' value={inputText} onChange={handleInputChange} style={{ width: '300px', height: '100px' }}></input>
              <div className='text-center'>
                <div style={{ marginBottom: '10px' }}>
                    <button className="btn btn-primary" onClick={handleSubmit} disabled={serverCall}>{serverCall ? 'Generating Image...' : 'Generate Image'}</button>
                </div>
                <div>
                    <button className="btn btn-primary" onClick={handleReset} disabled={serverCall}>Reset</button>
                </div>
              </div>
            </div>
            <div className='col' style={{ width: '400px', height: '400px', border: '1px solid black' }}>
              {imageUrl && <img src={imageUrl} style={{
                width: '100%', 
                height: '100%',
                padding: '5px'
            }}  alt="Image" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Boxes;
