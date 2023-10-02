const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      sidebarOpen = document.querySelector(".sidebarOpen"),
      siderbarClose = document.querySelector(".siderbarClose");

 
      
//   js code to toggle sidebar
sidebarOpen.addEventListener("click" , () =>{
    nav.classList.add("active");
});
body.addEventListener("click" , e =>{
    let clickedElm = e.target;
    if(!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")){
        nav.classList.remove("active");
    }
});


// Creating SVG Effect
// soccer 1

TweenMax.set("#soccer1", { opacity: 1 });

TweenMax.set(["#soccer2", "#basket"], { autoAlpha: 0, display: "none" });
const backLines = anime({
  targets: ".soccer1_extra-line > *",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 500,
  delay: function(el, i) {
    return 1000 + i * 50;
  },
  autoplay: false
});

const bodyLines = anime({
  targets: ".soccer1_line > *",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 500,
  delay: function(el, i) {
    return 1000 + i * 20;
  },
  autoplay: false
});

const ballLines = anime({
  targets: ".soccer1ball > .soccer1ball-line > *",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 500,
  delay: function(el, i) {
    return 1000 + i * 140;
  },
  autoplay: false
});

function step1_ballTL() {
  const ball = new TimelineMax({
    onStart: function() {
      ballLines.play();
    }
  });
  ball
    .staggerFromTo(
      ".soccer1ball > g:nth-child(1) > *",
      0.5,
      { scale: 0 },
      { scale: 1 },
      0.2
    )
    .to(
      ".soccer1ball",
      3,
      {
        rotation: 760,
        x: 2000,
        transformOrigin: "50% 50%",
        ease: Expo.easeOut,
        delay: 1
      }
      
    ).to(".soccer1ball", 1, {autoAlpha: 0}, '-=1');
  return ball;
}

function step1_backTL() {
  const back = new TimelineMax({
    onStart: function() {
      backLines.play();
    },
    onComplete: function() {
      console.log("completed");
      backLines.play();
      backLines.reverse();
      TweenMax.staggerTo(
        ".soccer1_extra-line > g",
        1,
        { scale: 0, transformOrigin: "50% 50%", ease: Bounce.easeOut },
        0.2
      );
    }
  });

  back.staggerFromTo(
    ".soccer1_extra-line > g",
    1,
    { x: -3500, rotation: -1000, transformOrigin: "50% 50%" },
    { x: 0, rotation: 0, ease: Power4.easeOut },
    0.5
  );
  return back;
}

function step1_bodyTL() {
  const timeline = new TimelineMax({
    ease: Expo.easeOut,
    onStart: bodyLines.play(),
    onComplete: function() {
      bodyLines.reverse();

      setTimeout(() => {
        TweenMax.staggerTo(
          ".soccer1_fill > *",
          0.2,
          { scale: 0, transformOrigin: "50% 50%" },
          0.01
        );
      }, 2000);
    }
  });

  var duration = 0.3;
  var stagger = 0.03;

  timeline.staggerFromTo(
    ".soccer1_fill > *",
    duration,
    { x: -4500 },
    { x: 0 },
    stagger
  );

  return timeline;
}
// soccer 1

// soccer 2
const step2_bodyLines = anime({
  targets: ".soccer2_line path",
  strokeDashoffset: [anime.setDashoffset, 99200],
  easing: "easeInOutSine",
  duration: 2500,
  delay: function(el, i) {
    return 1000 + i * 20;
  },
  autoplay: false
});

const step2_bodyExtra = anime({
  targets: ".soccer2_extra-line > *",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 1500,
  delay: function(el, i) {
    return 1000 + i * 20;
  },
  autoplay: false
});
function step2_bodyTL(){

  const timeline = new TimelineMax({onStart: function(){
    step2_bodyExtra.play();
    step2_bodyLines.play();
  }, onComplete:function(){

  }});

  timeline.staggerFromTo(".soccer2_fill > *", 0.2, {scale: 0, transformOrigin: "100% 100%"}, {scale: 1}, 0.03)
  .to(".soccer2_fill", 1, {onStart: function(){
    step2_bodyExtra.reverse();
    step2_bodyLines.reverse();
    step2_bodyExtra.play();
    step2_bodyLines.play();
  }})
  .staggerTo(".soccer2_fill > *", 0.2, {scale: 0, delay: 2}, 0.01)

  return timeline;

}


// basket

const step3_bodyLines = anime({
  targets: ".basket_extra-line > *",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 1500,
  delay: function(el, i) {
    return i * 20;
  },
  autoplay: false
});
const step3_extraLines = anime({
  targets: ".basket_line > *",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "easeInOutSine",
  duration: 3500,
  delay: function(el, i) {
    return i * 20;
  },
  autoplay: false
});


function step3_bodyTL(){
  const timeline = new TimelineMax({onStart: function(){
    step3_bodyLines.play()
    step3_extraLines.play()
  }});
  timeline.staggerFromTo(".basket_fill > *", 0.3, {scale: 0, y: 300, transformOrigin: "0% 0%"}, {scale: 1, y: 0}, -0.008)

  return timeline;

}



// utilities
function hide(elem){
  const tl = new TimelineMax();
  tl.to(elem, 0.1, {autoAlpha: 0})
  .to(elem, 0.1, {display: "none"})
  return tl;
}
function show(elem){
  const tl = new TimelineMax();
  tl.to(elem, 0.1, {autoAlpha: 1})
  .to(elem, 0.1, {display: "block"})
  return tl;
}
const mainTL = new TimelineMax({});

function init() {
  mainTL
    .add(step1_bodyTL(), "step1")
    .add(step1_backTL(), "step1")
    .add(step1_ballTL(), "step1")
    .add(hide("#soccer1"), 'step2')
    .add(show("#soccer2"), 'step3')
    .add(step2_bodyTL(), 'step4')
    //.add(step2_backTL(), 'step4.1')
    .add(hide("#soccer2"), 'step5')
    .add(show("#basket"), 'step6')
    .add(step3_bodyTL(), 'step7')


}

init();


// Creating popup for contact us form.
// Get references to the button and popup
const registerBtn = document.getElementById("contactUs");
        const popup = document.getElementById("popup");
        const closePopup = document.getElementById("closePopup");

        // Function to open the popup
        function openPopup() {
            popup.style.display = "block";
        }

        // Function to close the popup
        function closePopupFn() {
            popup.style.display = "none";
        }

        // Event listener for the Register button click
        registerBtn.addEventListener("click", openPopup);

        // Event listener for the close button click
        closePopup.addEventListener("click", closePopupFn);

        // Close the popup if the user clicks outside of it
        window.addEventListener("click", function(event) {
            if (event.target === popup) {
                closePopupFn();
            }
        });






// Add click event listener to all nav link.
// About
document.querySelector('a[href="#about"]').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default behavior of the link
    const targetSection = document.getElementById('about'); // Get the target section by its ID
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' }); // Scroll to the target section smoothly
    }
});

// Home
document.querySelector('a[href="#home"]').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default behavior of the link
    const targetSection = document.getElementById('home'); // Get the target section by its ID
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' }); // Scroll to the target section smoothly
    }
});

// Events
document.querySelector('a[href="#events"]').addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default behavior of the link
    const targetSection = document.getElementById('events'); // Get the target section by its ID
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' }); // Scroll to the target section smoothly
    }
});



// The typewriter effect 
var typeWriterElement = document.getElementById('typewriter');

// The TextArray: 
var textArray = ["I am TARANG2.0","Government Engineering College Vaishali",];

// You can also do this by transfering it through a data-attribute
// var textArray = typeWriterElement.getAttribute('data-array');


// function to generate the backspace effect 
function delWriter(text, i, cb) {
	if (i >= 0 ) {
		typeWriterElement.innerHTML = text.substring(0, i--);
		// generate a random Number to emulate backspace hitting.
 		var rndBack = 10 + Math.random() * 100;
		setTimeout(function() {
			delWriter(text, i, cb);
		},rndBack); 
	} else if (typeof cb == 'function') {
		setTimeout(cb,2000);
	}
};

// function to generate the keyhitting effect
function typeWriter(text, i, cb) {
	if ( i < text.length+1 ) {
		typeWriterElement.innerHTML = text.substring(0, i++);
		// generate a random Number to emulate Typing on the Keyboard.
		var rndTyping = 250 - Math.random() * 100;
		setTimeout( function () { 
			typeWriter(text, i++, cb)
		},rndTyping);
	} else if (i === text.length+1) {
		setTimeout( function () {
			delWriter(text, i, cb)
		},2000);
	}
};

// the main writer function
function StartWriter(i) {
	if (typeof textArray[i] == "undefined") {
		setTimeout( function () {
			StartWriter(0)
		},2000);
	} else if(i < textArray[i].length+1) {
		typeWriter(textArray[i], 0, function () {
			StartWriter(i+1);
		});
	}  
};
// wait one second then start the typewriter
setTimeout( function () {
	StartWriter(0);
},1000);




// Set the target date for the countdown (10 days from now)
    const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 10);

    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const closedMessageElement = document.getElementById('closed-message');

        function updateTimer() {
            const currentDate = new Date();
            const timeRemaining = targetDate - currentDate;

            if (timeRemaining > 0) {
                const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

                daysElement.textContent = `${days}d`;
                hoursElement.textContent = `${hours}h`;
                minutesElement.textContent = `${minutes}m`;
                secondsElement.textContent = `${seconds}s`;

                closedMessageElement.textContent = ''; // Clear the "Registration Closed" message
            } else {
                // Countdown is over, display the "Registration Closed" message
                daysElement.textContent = '';
                hoursElement.textContent = '';
                minutesElement.textContent = '';
                secondsElement.textContent = '';
                closedMessageElement.textContent = 'Registration Closed';
            }
        }

        // Update the timer every second
        setInterval(updateTimer, 1000);

        // Initial update
        updateTimer();





// Popup window for Welcome info.
const popup2 = document.getElementById('wel-popup-container');
const closeButton2 = document.getElementById('wel-close-popup');

// Function to show the popup
function welShowPopup() {
    popup2.style.display = 'block';
}

// Function to hide the popup
function welHideidePopup() {
    popup2.style.display = 'none';
}

// Show the popup when the page loads
window.addEventListener('load', welShowPopup);

// Close the popup when the close button is clicked
closeButton2.addEventListener('click', welHideidePopup);


 /* All code written and design by Abhishek Kumar from Government Engineering College Vaishali 23 batch */ 
