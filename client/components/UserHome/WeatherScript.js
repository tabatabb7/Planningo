import { useEffect } from 'react';

const weatherScript = url => {
  useEffect(() => {
    const script = document.createElement('script');
    

    script.src = './index.html';
    script.setAttribute('data-timestamp', +new Date());
    script.async = true;

    document.body.appendChild(script);

    return () => {
      
      document.body.removeChild(script);
    }
  }, [url]);
};

export default weatherScript;


