import React, {Component} from "react";
import { Routes, Route } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import {Layout} from './component/Layout';
import './component/style.css'

/*function App() {
  return (
    <div>  
          <SurveyList></SurveyList>
          <NewsFeed></NewsFeed>
    </div>
    
  );
}*/

export default class App extends Component
{
  static displayName = App.name;


  render() {
    return (
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />
          })}
        </Routes>
      </Layout>
    );
  }
}
