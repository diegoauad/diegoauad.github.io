import { React, useState } from 'react';

import { useInterval } from '../../utils';

function Preloader(props) {
  const arrow = props.arrow || '>';
  const bar = props.bar || '=';
  const [string, setString] = useState('');

  useInterval(() => {
    setString(string + bar);
  }, props.duration / 10);

  return (
    <span>
      [{(string + arrow).padEnd(10, '-')}]
    </span>
  );
}

export default Preloader;
