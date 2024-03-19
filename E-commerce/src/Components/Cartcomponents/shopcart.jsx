import React from 'react'
import "../styles/shopcart.css"

const Shopcart = ({item, handleClick}) => {
if(item){
    const { title, price, img} = item;
    const newhandleClick = () =>{
        handleClick(item);
    };
    return (
            <div className='cards'>
                <div className='image_box'>
                    <img className='imgbottle' src={img} alt=""/>
                </div>
                <div className='details'>
                    <p>{title}</p>
                    <p>Cena: {price}zł</p>
                    <button onClick={newhandleClick}>Dodaj do koszyka</button>
                </div>
            </div>
        );
    }
};
export default Shopcart;