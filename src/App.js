import { React, useEffect, useState } from 'react';

// ==== Redux - state management
import { useSelector, useDispatch } from 'react-redux';
import {
  setLang,
  getLang,
} from './redux/language';

import {
  typeInCommand,
  setInput,
  setPath,
  setBranch
} from './redux/terminal';

// ==== Components
import Nav from './components/Nav';
import Preloader from './components/Preloader';

// ==== CSS
import './index.css';

const i18n = require('./config/i18n.json');
const user = require('./config/user.json');
const terminal = require('./config/terminal.json');

function App() {
  const l = useSelector(getLang);
  const dispatch = useDispatch();

  const [contentReady, setContentReady] = useState(false);
  const [changingLanguage, setLanguageChangeMode] = useState(0);
  const [downloadingCV, setCVDownloadMode] = useState(0);
  const [menuReady, setMenuReady] = useState(false);
  const [buttonsReady, setButtonsReady] = useState(false);

  const setLanguage = (lang, enable_menu = false) => {
    window.scrollTo(0, 0);

    if(changingLanguage === 0 && downloadingCV === 0 && (buttonsReady || enable_menu)) {
  
        const timeout = dispatch(typeInCommand(`sudo update-locale LANG=${lang}.UTF-8`));
        setLanguageChangeMode(timeout + 2000)
  
        setTimeout(dispatch, timeout + 2000, setLang(lang));
        setTimeout(dispatch, timeout + 2000, setInput(''));
        setTimeout(dispatch, timeout + 2000, typeInCommand(terminal.input));
        setTimeout(setLanguageChangeMode, timeout + 2000, 0);

        if(enable_menu) {
          setTimeout(() => {
            const timeout = dispatch(typeInCommand('ls -a ..'));

            setTimeout(() => {
              dispatch(setInput(''));
              setMenuReady(true);
              setButtonsReady(true);
            }, timeout + 1000)
          }, timeout + 3000, 0);
        }
    }
  }
  
  useEffect(() => {
    var browserLang = navigator.language.split('-')[0].toLowerCase();

    if(!i18n.available_in.includes(browserLang)) {
      browserLang = i18n.default_to;
    }

    dispatch(setLang(browserLang === 'es' ? 'en' : 'es'))

    const timeout = dispatch(typeInCommand('cd ~/about && cat about.md'));

    setTimeout(() => {
        setContentReady(true);
        dispatch(setInput(''));
        dispatch(setPath('~/about'));
        dispatch(setBranch(terminal.branch));
        setTimeout(setLanguage, 1000, browserLang, true);
      },
      timeout + 1000
    );

  }, []);

  const cvDownload = () => {
    window.scrollTo(0, 0);

    if(downloadingCV === 0 && changingLanguage === 0 && contentReady && buttonsReady) {

      const timeout = dispatch(typeInCommand(`curl ${user.cvDisplay}`));
      setCVDownloadMode(timeout + 2000)

      setTimeout(dispatch, timeout + 2000, setInput(''));
      setTimeout(dispatch, timeout + 2000, typeInCommand(terminal.input));
      setTimeout(setCVDownloadMode, timeout + 2000, 0);
    }
  }

  return (
    <div className="App">
      <Nav showMenu = {menuReady} />
      { contentReady && <div className = "about content flex-row">
        <img className = 'about-img' src = 'assets/img/yo.jpg' alt = {user.name} />
        <div className = "messages">
          <h1 className = 'message'>{i18n.greeting[l]} <span className = "emphasize">{user.name}</span>!</h1>
          {i18n.messages.map((message, i) =><div key = {'message' + i} className = 'message' dangerouslySetInnerHTML = {{__html: message[l]}}></div>)}
          <div className = 'message'>
            {i18n['contact-me'][l]}<br /><br />
            <div className = "flex-row contact">
              {user.contact.map(item => <div key = {item.display}>
                <a target = "_blank" rel="noopener noreferrer" href={item.link}><i className={item.icon}></i>
                <br />
                {item.display}</a>
              </div>)}
            </div>
          </div>
        </div>
      </div> }
      <footer>
        <span>{user.fullName} ©️ {new Date().getFullYear()}</span>
        {downloadingCV > 0 ?
          <Preloader duration = {downloadingCV} /> : 
          buttonsReady && <a href={user.cv} target='__blank' className = 'button' onClick = {cvDownload} download = "Diego_Martin_CV.pdf">
            {i18n.downloadCV[l]}
            <span className = 'button-ico'>📂</span>
          </a>
        }
        {changingLanguage > 0 ? 
          <Preloader duration = {changingLanguage} /> :
          buttonsReady && <span className = 'button' onClick = {() => setLanguage(l === 'es' ? 'en' : 'es')}>
          {i18n.switchLanguage[l]}
          <span className = {'flag-gradient ' + (l === 'es' ? 'en' : 'es')}> {l === 'es' ? i18n.languageNames.en : i18n.languageNames.es }</span><span className = 'button-ico'>🌐</span>
        </span>}
      </footer>
    </div>
  );
}

export default App;
