import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import Logo from './partials/Logo';
import {connect} from 'react-redux'
import { auth } from '../../my_components/Firebase/FirebaseSTUD';
import { setCurrentUser } from '../../my_components/redux/user/user-actions';
import {setID,Email} from '../../my_components/redux/userError/userError-actions'
import swal from 'sweetalert'
const propTypes = {
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool
}

const defaultProps = {
  navPosition: '',
  hideNav: false,
  hideSignin: false,
  bottomOuterDivider: false,
  bottomDivider: false
}

const Header = ({
  className,
  navPosition,
  hideNav,
  hideSignin,
  bottomOuterDivider,
  bottomDivider,
  currentUser,
  history,
  dispatch,
  ...props
}) => {

  const [isActive, setIsactive] = useState(false);

  const nav = useRef(null);
  const hamburger = useRef(null);

  useEffect(() => {
    isActive && openMenu();
    document.addEventListener('keydown', keyPress);
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('keydown', keyPress);
      document.removeEventListener('click', clickOutside);
      closeMenu();
    };
  });  

  const openMenu = () => {
    document.body.classList.add('off-nav-is-active');
    nav.current.style.maxHeight = nav.current.scrollHeight + 'px';
    setIsactive(true);
  }

  const closeMenu = () => {
    document.body.classList.remove('off-nav-is-active');
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  }

  const keyPress = (e) => {
    isActive && e.keyCode === 27 && closeMenu();
  }

  const clickOutside = (e) => {
    if (!nav.current) return
    if (!isActive || nav.current.contains(e.target) || e.target === hamburger.current) return;
    closeMenu();
  }  

  const classes = classNames(
    'site-header',
    bottomOuterDivider && 'has-bottom-divider',
    className
  );
  const handleSelect=(e)=>{
    swal({
      title: "Are you sure?",
      text: "You will be logged out! Otherwise click outside the pop-up container to stay logged in!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, I am sure!',
      cancelButtonText: "No, cancel it!"
   }).then(
        function(isConfirm){

          if (isConfirm){
            auth.signOut()
            dispatch(setID("abcd"))
            dispatch(Email("abcd"))
            swal("Log Out!", "You are successfully logged out!", "success");
      
          } else {
            swal("Cancelled", "You are still with vista", "error");
          }
        })
  }
  return (
    <header
      className={classes}
    >
      <div className="container">
        <div className={
          classNames(
            'site-header-inner',
            bottomDivider && 'has-bottom-divider'
          )}>
          <Logo />
          {!hideNav &&
            <>
              <button
                ref={hamburger}
                className="header-nav-toggle"
                onClick={isActive ? closeMenu : openMenu}
              >
                <span className="screen-reader">Menu</span>
                <span className="hamburger">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
              <nav
                ref={nav}
                className={
                  classNames(
                    'header-nav',
                    isActive && 'is-active'
                  )}>
                <div className="header-nav-inner">
                  <ul className={
                    classNames(
                      'list-reset text-xs',
                      navPosition && `header-nav-${navPosition}`
                    )}>
                    <li>
                      <Link to="/about" onClick={closeMenu}>About</Link>
                    </li>
                    {
                      !currentUser? <li>
                      <Link to="/bulletin" onClick={closeMenu}>Info Bulletin</Link>
                   </li>: null
                    } 
                    <li>
                       <Link to="/contact" onClick={closeMenu}>Contact Us</Link>
                    </li>
                    {
                      currentUser?
                      <select id="selectBox" style={{cursor:"pointer"}} onChange={(e)=>history.push(`/${e.target.value}`)} className="button button-primary button-wide-mobile button-sm">
                            <option value="">My Account</option>
                            <option value="profile">My Profile</option>
                            <option value="bulletin">Info Bulletin</option>
                          </select>:null
                    }
                  </ul>
                  {!hideSignin &&
                    <ul
                      className="list-reset header-nav-right"
                    >
                      <li>
                        {
                          currentUser ?
                          <Link to="/" className="button button-primary button-wide-mobile button-sm" onClick={handleSelect}>Sign Out</Link>
                          :<Link to="/signup" className="button button-primary button-wide-mobile button-sm" onClick={closeMenu}>Login</Link>
                        }
                      </li>
                    </ul>}
                </div>
              </nav>
            </>}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

const mapStateToProps=({user})=>({
  currentUser: user.currentUser
})

export default withRouter(connect(mapStateToProps,null)(Header))
