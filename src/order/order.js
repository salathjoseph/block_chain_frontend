import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Order = () => {
  const [assets, setAssets] = useState([]);
  const [newAsset, setNewAsset] = useState({
    batchNo: '',
    name: '',
    description: '',
    manufacturer: '',
    owner: '',
    status: '',
    location: { lat: '', lon: '' },
  });

  useEffect(() => {
    axios.get('http://localhost:3001/api/assets')
      .then(response => setAssets(response.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAsset({ ...newAsset, [name]: value });
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setNewAsset({ ...newAsset, location: { ...newAsset.location, [name]: value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/assets', newAsset)
      .then(response => setAssets([...assets, response.data]))
      .catch(error => console.error(error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/assets/${id}`)
      .then(() => setAssets(assets.filter(asset => asset.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div className="App">
      <h1>Parcel Tracking</h1>
      <form onSubmit={handleSubmit}>
        <input name="batchNo" placeholder="Batch No" onChange={handleChange} required />
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="description" placeholder="Description" onChange={handleChange} required />
        <input name="manufacturer" placeholder="Manufacturer" onChange={handleChange} required />
        <input name="owner" placeholder="Owner" onChange={handleChange} required />
        <input name="status" placeholder="Status" onChange={handleChange} required />
        <input name="lat" placeholder="Latitude" onChange={handleLocationChange} required />
        <input name="lon" placeholder="Longitude" onChange={handleLocationChange} required />
        <button type="submit">Create Asset</button>
      </form>
      <h2>Total {assets.length} Assets</h2>
      <ul>
        {assets.map(asset => (
          <li key={asset.id}>
            <h3>{asset.name}</h3>
            <p>{asset.description}</p>
            <p>{asset.manufacturer}</p>
            <p>{asset.owner}</p>
            <p>{asset.status}</p>
            <p>Location: {asset.location.lat}, {asset.location.lon}</p>
            <button onClick={() => handleDelete(asset.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Order;
