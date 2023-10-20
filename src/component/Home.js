import { Component } from "react";
import './style.css'



export class Home extends Component {
    static displayName = Home.name

    render() {
        return (
            
            
    <section className='section'>
            <div className='intro'>
      <div className='container'>
            <div className='container_image'>
    <div className='container_image_left'>
        <img src='../img/banner-left.png' />
        <div className='text_banner'>GetGether - <br /> сайт для поиска компаний в вашем городе.</div>
    </div>
    <div className='container_image_right'>              
        <img src='../img/index_walk.png' />
    </div>
</div>
</div>
</div>
</section>


        );
    }
}