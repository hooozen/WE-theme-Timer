function $(id) {
  return document.querySelector(id)
}

const defaultMottos = [
  '不积跬步无以至千里', '北海虽赊，扶摇可接', '欲穷千里目，更上一层楼!', '大鹏一日同风起，扶摇直上九万里',
  '会当凌绝顶，一览众山小', '驽马十驾，功在不舍', '读书不觉已春深，一寸光阴一寸金', '黄沙百战穿金甲，不破楼兰终不还',
  '故天将降大任于是人也，必先苦其心志，劳其筋骨，饿其体肤，空乏其身，行拂乱其所为，所以动心忍性，曾益其所不能',
  '鹏北海，凤朝阳。又携书剑路茫茫。明年此日青云去，却笑人间举子忙', '天生我材必有用，千金散尽还复来',
  '穷且益坚，不坠青云之志', '读书之道无他，求其放心而已矣', '学而时习之，不亦说乎', '温故而知新，可以为师矣',
  '士不可以不弘毅，任重而道远', '路漫漫其修远兮，吾将上下而求索', '知之为知之，不知为不知，是知也',
  '学而不思则罔，思而不学则殆', '千淘万漉虽辛苦，吹尽狂沙始到金', '不到长城非好汉，屈指行程二万', '雄关漫道真如铁, 而今迈步从头越',
  '恰同学少年，风华正茂；书生意气，挥斥方遒', '不抚壮而弃秽兮，何不改乎此度？', '天行健，君子以自强不息',
  '君不见黄河之水天上来，奔流到海不复回！', '君不见高堂明镜悲白发，朝如青丝暮成雪！', '行路难！行路难！多歧路，今安在',
  '九万里风鹏正举。风休住，蓬舟吹取三山去！', '乘风破浪会有时，直挂云帆济沧海', '愿乘长风破万里浪',
  '欲渡黄河冰塞川，将登太行雪满山', '自信人生二百年，会当水击三千里', '业精于勤荒于嬉，行成于思毁于随'
]

const defaultImages = Array.from({
  length: 33
}, (item, index) => `style/assets/images/bg-${index}.jpg`)



window.wallpaperPropertyListener = {
  userDirectoryFilesAddedOrChanged: function (propertyName, changedFiles) {
    // propertyName is the name of the property that triggered the event.
    // changedFiles contains all added (or modified) file paths
    console.log(propertyName, changedFiles)
    GOLOBAL.batchImportImages(changedFiles)
  },
  userDirectoryFilesRemoved: function (propertyName, removedFiles) {
    // propertyName is the name of the property that triggered the event.
    // removedFiles contains all removed file paths
    GOLOBAL.batchImportImages([])
  },

  applyUserProperties: function (properties) {
    if (properties.title) {
      // Do something with yourproperty
      if (properties.title.value)
        $('#targetYear').innerText = properties.title.value;
    }
    if (properties.deadline) {
      if (properties.deadline.value)
        window.GOLOBAL.deadline.date = new Date(properties.deadline.value)
      // Do something with anotherproperty
    }

    if (properties.customMottoEnable) {
      GOLOBAL.customMottoEnable = properties.customMottoEnable.value
      GOLOBAL.setCyclicMottos()
    }
    if (properties.usingDefaultMottos) {
      window.GOLOBAL.usingDefaultMottos = properties.usingDefaultMottos.value
      GOLOBAL.setCyclicMottos()
    }

    if (properties.customMotto1) {
      GOLOBAL.addCustomMotto(properties.customMotto1.value, 1)
    }
    if (properties.customMotto2) {
      GOLOBAL.addCustomMotto(properties.customMotto2.value, 2)
    }
    if (properties.customMotto3) {
      GOLOBAL.addCustomMotto(properties.customMotto3.value, 3)
    }
    if (properties.customMotto4) {
      GOLOBAL.addCustomMotto(properties.customMotto4.value, 4)
    }
    if (properties.customMotto5) {
      GOLOBAL.addCustomMotto(properties.customMotto5.value, 5)
    }

    if (properties.mottosFile) {
      var customFile = ''

      if (properties.mottosFile.value) {
        customFile = 'file:///' + properties.mottosFile.value;
      } else {
        customFile = 'script/mottos.js'
      }
      var scriptEl = document.getElementById('externalMottos');
      if (scriptEl) {
        parentEl = scriptEl.parentElement
        parentEl.removeChild(scriptEl)
      } else {
        parentEl = document.body
      }
      scriptEl = document.createElement('script')
      scriptEl.type = 'text/javascript'
      scriptEl.src = customFile;
      parentEl.appendChild(scriptEl)
    }

    // Add more properties here
    refresh()
  },

};

function main() {
  console.log('wallparpe reload')

  window.GOLOBAL = {
    motto: $('#motto'),
    bg: $('#bg'),
    deadline: getDeadline(),

    switchMottoTime: (new Date()).getMinutes(),
    switchBgTime: (new Date()).getMinutes(),

    defaultMottos,
    customMottoEnable: false,
    usingDefaultMottos: true,

    customMottos: [],
    externalMottos: [],
    cyclicMottos: [],

    defaultImages,
    externalImages: [],
    cyclicImages: [],

    refresh: refresh,

    addCustomMotto(motto, no) {
      motto = motto.trim()
      this.customMottos[no - 1] = motto
      this.setCyclicMottos()
    },

    batchImportMottos(mottos) {
      try {
        mottos = mottos.map(item => item.trim())
          .filter(item => item != '')
        this.externalMottos = mottos
      } catch {
        this.externalMottos = []
      }
      this.setCyclicMottos()
      this.refresh()
    },

    batchImportImages(paths) {
      this.externalImages = paths.map(item => `file:///${item}`)
      this.setCyclicImages()
    },

    setCyclicMottos() {
      const {
        customMottoEnable,
        usingDefaultMottos,
        defaultMottos,
        externalMottos,
        customMottos
      } = this

      let mottos = []

      if (!customMottoEnable) {
        mottos = defaultMottos
      } else if (usingDefaultMottos) {
        mottos = defaultMottos.concat(customMottos).concat(externalMottos)
      } else {
        mottos = customMottos.concat(externalMottos)
      }

      this.cyclicMottos = mottos.filter(item => item != '')
    },

    setCyclicImages() {
      if (this.externalImages.length) this.cyclicImages = this.externalImages
      else this.cyclicImages = this.defaultImages
    }
  };

  var body = $('#body');
  var bodyEnd = $('#bodyEnd');
  var days = $('#days');
  var hours = $('#hours');
  var minutes = $('#minutes');
  var seconds = $('#secnds');
  var milliseconds = $('#milliseconds');
  var targetYear = $('#targetYear');
  var targetYearEnd = $('#targetYearEnd');

  // registeServiceWorker();
  targetYear.innerText = GOLOBAL.deadline.targetYear; // 设置年份
  if (GOLOBAL.deadline.expired) {
    body.style.display = 'none';
    bodyEnd.style.display = 'block';
    GOLOBAL.bg.style.backgroundImage = 'url(./style/assets/images/bg-end.jpg)';
    targetYearEnd.innerText = GOLOBAL.deadline.targetYear
  } else {
    GOLOBAL.setCyclicMottos()
    GOLOBAL.setCyclicImages()
    refresh();
  }
}

function registeServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(reg => {
      console.info('service worker registed');
    });
  } else {
    console.warn('serviceWorker is not supported');
  }
}

function refresh() {
  window.requestAnimationFrame(freshNumbers.bind(window, undefined, true));
}

function freshNumbers(_, rightnow = false) {
  var numbers = getTimerNumbers(GOLOBAL.deadline.date);
  rendserNumber(numbers);
  switchMotto(rightnow);
  switchBg(rightnow);
  window.requestAnimationFrame(freshNumbers);
}

function rendserNumber(numbers) {
  days.innerText = numbers.days;
  hours.innerText = formatNumber(numbers.hours, 2);
  minutes.innerText = formatNumber(numbers.minutes, 2);
  seconds.innerText = formatNumber(numbers.seconds, 2);
  milliseconds.innerText = formatNumber(numbers.milliseconds, 2);
}

function formatNumber(number, length) {
  number = '' + number;
  if (number.length >= length) return number.substr(0, length);
  return '0000000000'.substr(0, length - number.length) + number;

}

function getDeadline() {
  const now = new Date();
  let deadline;

  const y = now.getFullYear();
  const m = 11;
  const roughDate = new Date(y, m, 20);
  const d = roughDate.getDay();
  deadline = d === 6 ? roughDate : new Date(y, m, 20 + 6 - d)

  return {
    expired: now > deadline,
    targetYear: y + 1,
    date: deadline,
  };
}

function getTimerNumbers(deadline) {
  var now = Date.now();
  var remainingTime = (deadline - now);
  return {
    days: Math.floor(remainingTime / (1000 * 60 * 60 * 24)),
    hours: Math.floor(remainingTime / (1000 * 60 * 60) % 24),
    minutes: Math.floor(remainingTime / (1000 * 60) % 60),
    seconds: Math.floor(remainingTime / 1000 % 60),
    milliseconds: Math.floor(remainingTime % 1000),
  }
};

function switchMotto(rightnow) {
  mottos = GOLOBAL.cyclicMottos
  if (mottos.length < 1) mottos = ['此时无声胜有声']

  var minutes = (new Date()).getMinutes();
  if (!rightnow && minutes != GOLOBAL.switchMottoTime) return;

  GOLOBAL.motto.innerText = mottos[Math.floor(mottos.length * Math.random())];
  GOLOBAL.switchMottoTime = Math.floor(Math.random() * 60);
}

function switchBg(rightnow) {
  var minutes = (new Date()).getMinutes();
  if (!rightnow && minutes != GOLOBAL.switchBgTime) return;
  images = GOLOBAL.cyclicImages
  console.log(images)
  GOLOBAL.bg.style.backgroundImage = `url(${images[Math.floor(images.length * Math.random())]})`
  GOLOBAL.switchBgTime = Math.floor(Math.random() * 60);
  console.log('switchBgTime', GOLOBAL.switchBgTime)
}


window.onload = main();