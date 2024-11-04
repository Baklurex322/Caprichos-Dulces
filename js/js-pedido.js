/*
  $('.tab a').on('click', function (e) {
    
    e.preventDefault();
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');
  
    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(600);
    
  });
*/


  function Paypal(){
    document.getElementById("Paypal-Btn").classList.add("active")
    document.getElementById("Transfer-Btn").classList.remove("active")
    document.getElementById("Transfer-info").classList.add("desaparecer")
    document.getElementById("Paypal-info").classList.remove("desaparecer")
  }

  function Tranfer(){
    document.getElementById("Paypal-Btn").classList.remove("active")
    document.getElementById("Transfer-Btn").classList.add("active")
    document.getElementById("Transfer-info").classList.remove("desaparecer")
    document.getElementById("Paypal-info").classList.add("desaparecer")
  }