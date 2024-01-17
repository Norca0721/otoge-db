// theme switcher
const root = document.documentElement;
const siteMenuWrap = $("#site-menu-wrap");
const siteMenuBtn = $("#site-menu-btn");
let isMenuOpen = false;
let scrollPos;
// const themeSettingRadio = document.getElementByName('themeSettingRadio');

// if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//     themeSettingRadio.checked = false;
//     root.setAttribute('data-theme', 'dark');
// }

// if (window.matchMedia('(prefers-color-scheme: light)').matches) {
//     themeSettingRadio.checked = true;
//     root.setAttribute('data-theme', 'light');
// }

document.addEventListener('DOMContentLoaded', function () {
  const colorSchemeInput = document.querySelectorAll('input[name="colorScheme"]');

  function applyColorScheme() {
    const selectedScheme = document.querySelector('input[name="colorScheme"]:checked').value;

    // Save the selected color scheme in localStorage
    localStorage.setItem('userColorScheme', selectedScheme);

    // Apply the selected color scheme with a transition effect
    // root.style.transition = 'background-color 0.5s';
    root.setAttribute('data-theme', selectedScheme);

    // Remove transition after it's applied to prevent it from affecting subsequent changes
    // setTimeout(() => {
    //   root.style.transition = '';
    // }, 500);
  }

  colorSchemeInput.forEach(input => {
    input.addEventListener('change', applyColorScheme);
  });

  // Check if the userColorScheme value is nonexistent, create one with the default value 'auto'
  const userColorScheme = localStorage.getItem('userColorScheme');
  if (!userColorScheme) {
    localStorage.setItem('userColorScheme', 'auto');
  }

  // Check the initial color scheme preference
  const initialColorScheme = userColorScheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.querySelector(`input[value="${initialColorScheme}"]`).checked = true;
  applyColorScheme(); // Apply initial color scheme
});



// Determine appropriate transitionEvent for current browser
const getTransitionEvent = () => {
  const el = document.createElement("fakeelement");

  const transitions = {
    "transition"      : "transitionend",
    "OTransition"     : "oTransitionEnd",
    "MozTransition"   : "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  };

  for (const property in transitions){
    if (el.style[property] !== undefined){
      return transitions[property];
    }
  }
};

const transitionEvent = getTransitionEvent();


// function switchTheme(e) {
//     root.classList.toggle('transitioning');

//     if (e.target.checked) {
//         root.setAttribute('data-theme', 'light');
//     }
//     else {
//         root.setAttribute('data-theme', 'dark');
//     }

//     root.addEventListener(transitionEvent, transitionEndCallback);
// }

// themeSettingRadio.addEventListener('change', switchTheme, false);

transitionEndCallback = (e) => {
  root.removeEventListener(transitionEvent, transitionEndCallback);
  root.classList.remove('transitioning');
}

function updateQueryStringParameter(param, val) {
  var searchParams = new URLSearchParams(window.location.search);

  if ('URLSearchParams' in window) {
    if (val === "") {
        searchParams.delete(param);
    } else {
        searchParams.set(param, val);
    }
    var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    history.pushState(null, '', newRelativePathQuery);
  }
}

function clearQueryStringParameter() {
  var searchParams = new URLSearchParams(window.location.search);

  if ('URLSearchParams' in window) {
    var newRelativePathQuery = window.location.pathname;
    history.pushState(null, '', newRelativePathQuery);
  }
}

function appendSelectboxStateClass(select, val) {
  if (val !== "") {
    select.addClass('changed');
  } else {
    select.removeClass('changed');
  }
}

function replaceUnitText(text) {
  var item_unit = flat_view ? '譜面' : '曲';
  return text.replace("unit", item_unit);
}

// $("#hide-notice-btn").on("click", function(){    
//     $('.notice-wrap').removeClass('visible');
//     localStorage.setItem("noticeNewAddress", $('.notice-wrap').is(':visible'));
// });

// $(".dropdown-btn").on("click", function(){
//     $(this).parent(".dropdown-wrapper").toggleClass('open');
// });


$(document).ready(function() {
  if ('URLSearchParams' in window) {
    updateChartLevelSelectboxValue(searchParams);
  }
  $('html').removeClass('page-loading');

  // fetch('https://api.github.com/repos/zvuc/ongeki-db/commits?per_page=1')
  //     .then(res => res.json())
  //     .then(res => {
  //         let commitDateTime = new Date(res[0].commit.committer.date);
  //         let commitMsg = res[0].commit.message;
  //         // if multi-line commit message
  //         if(commitMsg.split('\n')[1] !== undefined) {
  //             document.getElementById('latest-commit-content').innerHTML = commitMsg.split('\n').slice(2).join('<br>');
  //         } else {
  //             document.getElementById('latest-commit-content').innerHTML = commitMsg;
  //         }
  //         document.getElementById('latest-commit').setAttribute('href', res[0].html_url);
  //         document.getElementById('latest-commit-date').innerHTML = commitDateTime.toISOString().split('T')[0]
  // })

  // localStorage.noticeNewAddress == "false" ? '' : $('.notice-wrap').addClass('visible');

  // google analytics
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-141271073-1');
  gtag('config', 'G-YZ8GJR7QFL');


  // Site Menu
  siteMenuBtn.on("click", function () {
    event.preventDefault();
    if (!isMenuOpen) {
      siteMenuBtn.addClass('active');
      openMenu();
    } else {
      closeMenu();
    }
  });

  $(document).on("keydown", function (e) {
    if (e.key === "Escape" && isMenuOpen) {
      closeMenu();
    }
  });

  $("#site-menu-backdrop").on("click", function () {
    if (isMenuOpen) {
      closeMenu();
    }
  });
  $("#site-menu-close-btn").on("click", function () {
    if (isMenuOpen) {
      closeMenu();
    }
  });

  function openMenu() {
    scrollPos = $(window).scrollTop();
    $("#app-wrapper").css('top', (scrollPos * -1)).addClass("menu-open");
    $(window).scrollTop(0);


    siteMenuWrap
      .addClass('open')
      .addClass('anim-enter')
      .one('animationend webkitAnimationEnd oAnimationEnd', function () {

      siteMenuWrap.removeClass('anim-enter');
      isMenuOpen = true;
    });

  }

  function closeMenu() {
    siteMenuWrap
      .addClass('anim-leave')
      .one('animationend webkitAnimationEnd oAnimationEnd', function () {

      siteMenuWrap.removeClass('open').removeClass('anim-leave');
    });

    $("#app-wrapper").removeClass("menu-open").css('top', '');
    $(window).scrollTop(scrollPos);

    isMenuOpen = false;
    siteMenuBtn.removeClass('active');
  }

  // $(document).click(function(event) {
  //   console.log('clicked')
  //   var $target = $(event.target);
  //   if (!$target.closest('#site-menu-btn').length &&
  //     !$target.closest('#site-menu-wrap').length &&
  //     isMenuOpen) {

  //     closeMenu();
  //   }
  // });

});
