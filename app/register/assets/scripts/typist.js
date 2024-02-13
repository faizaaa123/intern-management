export const TxtType = function (el, toRotate, period, features, hbox) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = period;
  this.txt = '';
  this.features = features;
  this.hbox = hbox;
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    const condition = (i + 1) % this.features.length;
    this.isDeleting = false;
    if (this.features[condition]) {
      this.features[condition].classList.add('active');
      this.features[condition]
        .querySelector('.new-feauture-img ')
        .classList.add('active');
      this.features[condition]
        .querySelector('.new-feauture-heading ')
        .classList.add('active');

      this.features[condition]
        .querySelector('.new-feauture-para ')
        .classList.add('active');

      setTimeout(() => {
        this.features[condition]
          .querySelector('.new-feauture-img ')
          .classList.add('opacity');
      }, 50);
      this.hbox[condition].classList.add('active');
    }
    this.features[i].classList.remove('active');

    this.features[i]
      .querySelector('.new-feauture-img ')
      .classList.remove('active');
    this.features[i]
      .querySelector('.new-feauture-heading ')
      .classList.remove('active');
    this.features[i]
      .querySelector('.new-feauture-para ')
      .classList.remove('active');
    this.features[i]
      .querySelector('.new-feauture-img ')
      .classList.remove('opacity');

    this.hbox[i].classList.remove('active');

    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};
