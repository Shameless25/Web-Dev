import React from 'react'
import "./Home.css";
import Cartform from './Cartform';
import Content from './Content';
import Footer from './footer';

const Home = () => {
  return (
    <div>
      <div className='home_header'>
        <div className='data'>
          <div className='header_container'>
            <h1>O nas</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias maiores eos voluptatum porro. Tenetur pariatur quo accusantium temporibus, porro ut, aspernatur, vel officia quae labore dolorem vero ipsa similique vitae?
            </p>
            <button className='Cartbtn'>Add to Cart</button>
          </div>
        </div>
      </div>
      <Cartform/>
      <Content/>
      <Footer/>
    </div>
  );
};

export default Home;