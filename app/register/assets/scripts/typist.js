import { useEffect, useState } from 'react';

const Typist = ({ strings, delay }) => {
  const [currentText, setCurrentText] = useState('');
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(0);
  var features = document.querySelectorAll('.new-feature-container');
  var hbox = document.querySelectorAll('.hbox');

  useEffect(() => {
    function type() {
      setTimeout(function () {
        var i = loopNum % strings.length;
        var fullTxt = strings[i];

        if (isDeleting) {
          setDelta(40);
          setCurrentText(fullTxt.substring(0, currentText.length - 1));
        } else {
          setDelta(200 - Math.random() * 100);
          setCurrentText(fullTxt.substring(0, currentText.length + 1));
        }

        if (!isDeleting && currentText === fullTxt) {
          setDelta(delay);
          setIsDeleting(true);
        } else if (isDeleting && currentText === '') {
          const condition = (i + 1) % features.length;
          if (features[condition]) {
            features[condition].classList.add('active');
            features[condition]
              .querySelector('.new-feauture-img ')
              .classList.add('active');
            features[condition]
              .querySelector('.new-feauture-heading ')
              .classList.add('active');

            features[condition]
              .querySelector('.new-feauture-para ')
              .classList.add('active');

            setTimeout(() => {
              features[condition]
                .querySelector('.new-feauture-img ')
                .classList.add('opacity');
            }, 50);
            hbox[condition].classList.add('active');
          }
          features[i].classList.remove('active');

          features[i]
            .querySelector('.new-feauture-img ')
            .classList.remove('active');
          features[i]
            .querySelector('.new-feauture-heading ')
            .classList.remove('active');
          features[i]
            .querySelector('.new-feauture-para ')
            .classList.remove('active');
          features[i]
            .querySelector('.new-feauture-img ')
            .classList.remove('opacity');

          hbox[i].classList.remove('active');
          setIsDeleting(false);
          setLoopNum((loopNum) => loopNum + 1);
          setDelta(500);
        }
      }, delta);
    }
    type();
  }, [currentText, isDeleting]);

  return <span>{currentText}</span>;
};

export default Typist;
