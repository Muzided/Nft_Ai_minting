import { React, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: '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'
})
const openai = new OpenAIApi(configuration);

const AiNft = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [prompt, setPrompt] = useState()
  const [number, setNumber] = useState(1);
  const [size, setSize] = useState("256x256")
  const [imageurl, setImageUrl] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log("EVEN", event)
    console.log(`Email: ${email} Password: ${password}`);
    // Send the email and password to the server for authentication




  }
  const generateImage = async () => {
    console.log("prompt", prompt)
    console.log("number", number)
    console.log("size", size)
    const imageParameters = {
      prompt: prompt,
      n: parseInt(number),
      size: size,
    }

    await openai.createImage(imageParameters).then((res) => {
      setImageUrl(res.data.data[0].url)
    }).catch((error) => {
      if (error.response) {
        console.log("Avatar error status: ", error.response.status);
        console.log("Avatar error data: ", error.response.data);
      } else {
        console.log("Avatar error message: ", error.message);
      }
    })

  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-300 to-purple-800">
      {imageurl && <img src={imageurl} className="image" alt='Ai image' />}
      <div className="max-w-md w-full bg-purple-300 p-8 shadow-md transform transition-all duration-300 hover:scale-105">
        <h2 className="text-2xl font-bold mb-4">Generate NFT</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Description</label>
            <input type="text" id="value" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-purple-200  focus:outline-none focus:shadow-outline" value={prompt} onChange={e => setPrompt(e.target.value)} />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Number</label>
            <input type="text" id="value" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-purple-200 focus:outline-none focus:shadow-outline" value={number} onChange={e => setNumber(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Size</label>
            <input type="text" id="value" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight bg-purple-200  focus:outline-none focus:shadow-outline" value={size} onChange={e => setSize(e.target.value)} />
          </div>
          <button type="submit" onClick={generateImage} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AiNft