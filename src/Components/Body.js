import React from 'react'
import { useState, useEffect } from 'react'
import './Body.css'

const Body = () => {

  const loadFromLocalStorage = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  };

  const [friends, setFriends] = useState(loadFromLocalStorage('friends', [
    {
      id: 118836,
      name: "Clark",
      image: "https://i.pravatar.cc/48?u=118836",
      balance: -7,
    },
    {
      id: 933372,
      name: "Sarah",
      image: "https://i.pravatar.cc/48?u=933372",
      balance: 20,
    },
    {
      id: 499476,
      name: "Anthony",
      image: "https://i.pravatar.cc/48?u=499476",
      balance: 0,
    },
  ]));


  



  const [name, setName] = useState('');
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  const [showForm, setShowForm] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [bill, setBill] = useState(0);
  const [payers, setPayers] = useState(0);
  const [you, setYou] = useState(0);
  const [select, setSelect] = useState(null);

  useEffect(() => {
    localStorage.setItem('friends', JSON.stringify(friends));
  }, [friends]);
  

  function addFriend() {
    setShowForm(true);

  }

  function showAddFriend(newFriend) {
    setFriends([...friends, newFriend]);
  }  

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;
    
    const id = crypto.randomUUID();

    const newFriend = {id, name, image:`${image}?u=${id}`, balance:0};
    showAddFriend(newFriend);
    setName('');
    setImage("https://i.pravatar.cc/48");
    setShowForm(false);
  }




  function onSelect(id){
    setSelectedFriend(friends.find(friend => friend.id === id));


  }

  function handleSelectChange(e){
    setSelect(e.target.value);
  }


  function handleSplitBill(e){
    e.preventDefault();
    if(!bill || !you || !payers) return;

    if(select === 'you'){
      const newBalance = selectedFriend.balance + (parseFloat(bill) - parseFloat(you));
      const updatedFriend = {...selectedFriend, balance: newBalance};
      const updatedFriends = friends.map(friend => friend.id === selectedFriend.id ? updatedFriend : friend);
      setFriends(updatedFriends);
    }  
    else{
      const newBalance = selectedFriend.balance - parseFloat(you);
      const updatedFriend = {...selectedFriend, balance: newBalance};
      const updatedFriends = friends.map(friend => friend.id === selectedFriend.id ? updatedFriend : friend);
      setFriends(updatedFriends);

    }
    setBill(0);
    setYou(0);
    setPayers(0);

    onClose();

 



  }

  useEffect(() => {
    setPayers(bill - you);
  }, [bill, you]);

  function onClose(){
    setSelectedFriend(null);

  }

  return (
    <div className='body'>
      <div className='body_left scrollable'>
        {friends.map(friend => (
            <div className='friend' key={friend.id}>
              <img src={friend.image} alt='icon' style={{width:"50px",height:"50px",borderRadius:"50px",padding:"20px"}}/>
              <div className='info'>
                <h2>{friend.name}</h2>
                {friend.balance > 0 ? <p style={{color:"green",fontWeight:"200"}}>{friend.name} owes you {friend.balance}Rs</p>:<p style={{color:"red",fontWeight:"200"}}>You owe {friend.name} {-friend.balance}Rs</p>}
              </div>
              <button className='btn' onClick={() => onSelect(friend.id)}>Select</button>

            </div>
          ))}

        {
          showForm ? (
            <form className='main' onSubmit={handleSubmit}>
              <div className='Name'>
                <label>Friend Name</label>
                <input type="text" placeholder='Name of the Friend' value={name} onChange={(e) => setName(e.target.value)}/>
              </div>  

              <div className='Img'>
                <label>Image Url</label>
                <input type="text" placeholder='Image url' value={image} onChange={(e)=> setImage(e.target.value)}/>
              </div> 
              <button className='btn'>Add</button>
            </form>  
          ):<button className='btn' onClick={addFriend}>Add friend</button>  
        }
        


      </div> 

      <div className='body_right scrollable'>
        {
          (selectedFriend!=null) ? (
            <form className='friends' onSubmit={handleSplitBill}>
              <h3>SPLIT A BILL WITH {selectedFriend.name}</h3>
              <div className='expense'>
                <label>Bill Amount</label>
                <input type="number" value={bill} onChange={(e)=>setBill(e.target.value)}/>
              </div>  
              <div className='expense'>
                <label>Your expense</label>
                <input type="number" value={you} onChange={(e)=>setYou(e.target.value)}/>
              </div> 
              <div className='expense'>
                <label>{selectedFriend.name}'s expense</label>
                <input type="number" value={payers} onChange={(e)=>setPayers(e.target.value)}/>
              </div> 
              <div className='expense'>
                <label>Who is paying the bill?</label>
                <select id='payer' name='payer' onChange={handleSelectChange}>
                  <option value={selectedFriend.id} >{selectedFriend.name}</option>
                  <option value='you'>You</option>
                </select>
              </div> 
              <div className='btns'>
                <button className='btn'>Split bill</button>
                <button className='btn' onClick={onClose}>Close</button>
               </div> 
              


            </form>  
          ):(
          <div className='no'>
            <div style={{fontSize:"20px",fontWeight:"bold"}}>No friend selected</div>
          </div>)
          
        }

      </div>  

      
    </div>
  )
}

export default Body
