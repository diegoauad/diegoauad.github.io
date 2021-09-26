import { React } from 'react';

// ==== Redux - state management
import { useSelector } from 'react-redux';

import './style.css';

// ==== Redux
import {
    getPath,
    getInput,
    getBranch
} from '../../redux/terminal';

import {
    getLang,
} from '../../redux/language';

// Config
const i18n = require('../../config/i18n.json');

function TerminalLine(props) {
    const path = useSelector(getPath);
    const l = useSelector(getLang);
    const input = useSelector(getInput);
    const branch = useSelector(getBranch);

    return (
        <div className="terminal-line">
            <span className = 'terminal-crumb user'>
                <span className = "terminal-text">{`${i18n.you[l]}@${window.location.hostname}`}</span>
            </span>
            <span className = 'terminal-crumb path'>
                <span className = "terminal-text">{path + (props.path || '')}</span>
            </span>
            {branch && <span className = 'terminal-crumb master'>
                <span className = "terminal-text"><i className="fas fa-code-branch"></i>{branch}</span>
            </span>}
            <span className = 'terminal-crumb last' style = {branch ? {} : {borderLeftColor: 'rgb(52, 101, 164)'}}>
                <span style={{visibility: 'hidden'}}>.</span>
            </span>
            <span className = "terminal-text"><span dangerouslySetInnerHTML = {{__html: input + ''}}></span><span className = "cursor blink">▌</span></span>
        </div>
    );
}

export default TerminalLine;
