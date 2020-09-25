var selectedFile;
var filename;

  // Initialize Firebase
 var firebaseConfig = {
    apiKey: "AIzaSyCMXmqJWVnOhyfn8a_vbSQz6I_pb0EvUe4",
    authDomain: "alphadook.firebaseapp.com",
    databaseURL: "https://alphadook.firebaseio.com",
    projectId: "alphadook",
    storageBucket: "alphadook.appspot.com",
    messagingSenderId: "590705026121",
    appId: "1:590705026121:web:ded7dbb523b84def668b98",
    measurementId: "G-9E8P9SZFN9"
  };

  firebase.initializeApp(firebaseConfig);

 //Upload Image Banner 
 var storage = firebase.storage();
 // Banner
 var button = document.getElementById('uploadButton')
 button.addEventListener('change', function(e){
  // get file
    var file = e.target.files[0];
    filename=file;
  })

   async function getFile(){
    return await filename;
  }

 // Banner
 var buttonlogo = document.getElementById('uploadButtonLogo')
 buttonlogo.addEventListener('change', function(e){
  // get file
    var filelogo = e.target.files[0];
    filenamelogo=filelogo;
  })

   async function getFilelogo(){
    return await filenamelogo;
  }




    var database = firebase.firestore();


// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

//Submit form

async function submitForm(e){

    //Get values of each field
    var title = getInputVal('title');
    var institution = getInputVal('institution');
    var location = getInputVal('location');
    var duration = getInputVal('duration');
    var content = getInputVal('content');
    var aofi = getInputVal('aofi');
    var sofi = getInputVal('sofi');
    var level = getInputVal('level');
    var date = getInputVal('date');
    var amount = getInputVal('amount');
    var premio = getInputVal('premio');
    var featured = Boolean(1>2);
    var url = getInputVal('url');
    var urlmooc = getInputVal('urlmooc');
    var notif = parseInt(getInputVal('notif'));
  
    duration = amount.toString()+" "+duration;


	// Submit Banner Image
  var file = await getFile();
  console.log(file.name);
  var storageRef = storage.ref('offer-banners/'+file.name);
 
  // storageRef.put(file)
  e.preventDefault();

  	// Submit Logo Image
  var filelogo = await getFilelogo();
  console.log(filelogo.name);
  var storageReflogo = storage.ref('offer-logo/'+filelogo.name);
  logoUrl = storageReflogo.put(filelogo).then(()=>{
    return storageReflogo.getDownloadURL().then(function(url) {
      return url;
      
    }).catch(function(error) {
    
    });
  });
  banerUrl = storageRef.put(file).then(()=>{
    return storageRef.getDownloadURL().then(function(url) {
      return url;
    }).catch(function(error) {
    
    });
  });

  var baner = await banerUrl;
  var logo = await logoUrl;
  
  // storageRef.put(file)
  e.preventDefault();

  uploadOffer(title, institution,location, duration, content, aofi, sofi, level, date, premio, featured, url, urlmooc, baner,logo, notif);


  //Show Alert
  document.querySelector('.alert').style.display = 'block';

  //Hide alert after 3 seconds
  setTimeout(function(){
      document.querySelector('.alert').style.display = 'none';
  },3000);
  // Clear form
  document.getElementById('contactForm').reset();

}


// Function to get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// // Function to save the message to firebase
// function saveMessage(titulo,company,email,phone,message, aofi, sofi, level, date){
//   var newMessageRef = messagesRef.push();
//   newMessageRef.set({
//     titulo: titulo,
//     company: company,
//     email: email,
//     phone: phone,
//     message: message,
//     aofi: aofi,
//     sofi: sofi,
//     level: level,
//     date: date
//   });
// }

// Firestore
function uploadOffer(title, institution,location, duration, content, aofi, sofi, level, date, premio, featured, url, urlmooc, banerUrl,logoUrl, notif){
  console.log("Uploading..")
  database.collection("offer").doc().set({
    title: title,
    institution: institution,
    location: location,
    duration: duration,
    content: content,
    aofi: aofi,
    sofi: sofi,
    level: level,
    date: date,
    premio: premio,
    featured: featured,
    url: url,
    urlmooc: urlmooc,
    img: banerUrl,
    logo: logoUrl,
    notif: notif,
  });
}


 // Image Size Validation 

 var fileInput = document.getElementById('uploadButton');
 // listening on when someone selects a file
 fileInput .onchange = function(e) {
   e.preventDefault();

   // get the file someone selected
   var file = fileInput.files && fileInput.files[0];

   // create an image element with that selected file
   var img = new Image();
   img.src = window.URL.createObjectURL(file);

   // as soon as the image has been loaded
   img.onload = function() {
     var width = img.naturalWidth,
       height = img.naturalHeight;

     // unload it
     window.URL.revokeObjectURL(img.src);

     // check its minimum (first) and maximum (Second) dimensions
     if (width > 400 && height > 400 && width < 2001 && height < 2001) {
       // it fits 
     } else {
       // it doesn't fit, unset the value 
       // post an error
       fileInput.value = ""
       alert("Check Image Size, Must be larger than 400px in width and height and smaller than 2001 px in width and height")
     }
   };

 };


// Logo  Size Validation 

var fileInputlogo = document.getElementById('uploadButtonLogo');
// listening on when someone selects a file
fileInputlogo .onchange = function(e) {
  e.preventDefault();

  // get the file someone selected
  var filelogo = fileInputlogo.files && fileInputlogo.files[0];

  // create an image element with that selected file
  var imglogo = new Image();
  imglogo.src = window.URL.createObjectURL(filelogo);

  // as soon as the image has been loaded
  imglogo.onload = function() {
    var widthlogo = imglogo.naturalWidth,
      heightlogo = imglogo.naturalHeight;

    // unload it
    window.URL.revokeObjectURL(imglogo.src);

    // check its minimum (first) and maximum (Second) dimensions
    if (widthlogo > 100 && heightlogo > 100 && widthlogo < 2001 && heightlogo < 2001) {
      // it fits 
    } else {
      // it doesn't fit, unset the value 
      // post an error
      fileInputlogo.value = ""
      alert("Check Image Size, Must be larger than 100px in width and height and smaller than 2000 px in width and height")
    }
  };

};






/**
* Template Name: Appland - v2.2.0
* Template URL: https://bootstrapmade.com/free-bootstrap-app-landing-page-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 1;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();
        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');
    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });
    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });
    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, .mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Gallery carousel (uses the Owl Carousel library)
  $(".gallery-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    center: true,
    margin: 25,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 3
      },
      992: {
        items: 4
      },
      1200: {
        items: 5
      }
    }
  });

  // Initiate venobox lightbox
  $(document).ready(function() {
    $('.venobox').venobox();
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 1
      },
      900: {
        items: 2
      }
    }
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true
    });
  }
  $(window).on('load', function() {
    aos_init();
  });

})(jQuery);



