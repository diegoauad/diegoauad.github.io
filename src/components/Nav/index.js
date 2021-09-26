import { React, useState } from 'react';
import './style.css';

import { useSelector, useDispatch } from 'react-redux';

import TerminalLine from '../TerminalLine';

import {
  getLang
} from '../../redux/language';

import {
  typeInCommand,
  setInput
} from '../../redux/terminal';

const i18n = require('../../config/i18n.json');

function Nav(props) {
  const l = useSelector(getLang);
  const dispatch = useDispatch();

  const [attemptingCd, setAttemptingCd] = useState(0);

  const attemptCd = (dir) => {
    if(attemptingCd === 0) {
      const command = 'cd ../' + dir;
      const timeout = dispatch(typeInCommand(command));

      setAttemptingCd(timeout);
      setTimeout(dispatch, timeout + 500, setInput(`${command}<br />cd: Cannot access '${command}': Permission denied`));
      setTimeout(dispatch, timeout + 2000, setInput(''));
      setTimeout(setAttemptingCd, timeout + 2000, 0);
    }
  }

  const setCd = (dir) => {
    if(attemptingCd === 0) {
      const command = 'cd ../' + dir;
      const timeout = dispatch(typeInCommand(command));

      setAttemptingCd(timeout);
      setTimeout(dispatch, timeout + 1000, setInput(''));
      setTimeout(setAttemptingCd, timeout + 1000, 0);
    }
  }

  return (
    <div className = "nav">
        <div className = "content flex-row">
            <TerminalLine />
            <div style = {{visibility: (props.showMenu ? 'visible' : 'hidden')}} className = "menu flex-row">
                <span onClick = {() => setCd(i18n.about.en)} className = "menu-choice active">{i18n.about[l]}</span>
                <span onClick = {() => attemptCd('.' + i18n.blog[l])} className = "menu-choice soon">{i18n.blog[l]}<span className = 'soon-tag wobble'>{i18n.comingSoon[l]}</span></span>
                {/* <a className = "menu-choice"  href='/contact'>{i18n.contact[l]}</a> */}
            </div>
        </div>
    </div>
  );
}

export default Nav;
