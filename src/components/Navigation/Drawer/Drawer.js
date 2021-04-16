import React from 'react';
import classes from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

// определяем ссылки для бокового меню
const links = [
   {to: '/', label: '', exact: false},
   {},
   {}
];

class Drawer extends React.Component {
   renderLinks() {
      return links.map((link, index) => {
         return (
            <li key={index}>
               <a>Link {link}</a>
            </li>
         );
      });
   }

   render() {
      const cls = [classes.Drawer];

      if (!this.props.isOpen) {
         cls.push(classes.close);
      }

      return (
         <React.Fragment>
            <nav className={cls.join(' ')}>
               <ul>
                  {this.renderLinks()}
               </ul>
            </nav>
            {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null} {/* вывод только при открытом меню */}
         </React.Fragment>
      );
   }
}

export default Drawer;