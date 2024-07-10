// JavaScript Document

var siteurl = "https://www.upkar.in/";
var CouponUrl = "http://coupons.upkar.in/";

if (location.hostname=="localhost")
{
	var siteurl = "http://localhost/upkarwork/Upkar_Url_rewrite/";
	var CouponUrl = "http://localhost/upkarwork/Coupons/";
}

//Login
	function fn_login()
	{ 
		$("#lmsg").html("");
		$.post(siteurl+"include/login.php",
		{
		  email:$("#lemail").val(),
		  password:$("#lpassword").val(),
		  url:''
		},
		function(data,status){ 		
	
		  if (data!="")
		  	 $("#lmsg").html(data);
		  else
		  {
			 //location.href="onepage.php";
		  }
		});	
	}

	function fn_resetpwd()
	{ 
		$("#msg").html("");
		$.post(siteurl+"include/forgot-password.php",
		{
		  email:$("#email").val(),
		  password:$("#lpassword").val(),
		  url:''
		},
		function(data,status){ 
		  if (data=="Success")
		  {
		  	 $("#msg").html("We send your details at your email id. Please check your email for the details. Thank you...");
			 $("#fm-form").hide();
		  }
		  else
		  {
			 $("#msg").html(data);
		  }
		});	
	}
// Shopping Cart
	function fn_loadcart()
	{ 
		$.post(siteurl+"include/cart.php",
		{
		},
		function(data,status){ 
		  $("#cart_items").html(data);
		});	
	}
	
	function fn_getFunction(fn,inp,id)
	{ 
		alert(fn);
		alert(inp);
		alert(id);
		$.post("include/functions_result.php",
		{
			fn:fn,
			in:inp
		},
		function(data,status){ 
		  $("#"+id).html(data);
		});	
	}

	function fn_addcart(pid,qty)
	{ 
		
		$.post(siteurl+"include/cartinc.php",
		{
		  prod_id1:pid,
		  prod_qty1:qty,
		  add:"yes"
		},
		function(data,status){ 
		 if (data!="error")
		 {
			console.log(data);
			data_arr = data.split(",");
			CartItems = data_arr[0];
			CartAmount = data_arr[1];
			WishItems = data_arr[2];
			if (CartItems >0 )
				$(".cart-summ").html("<div class=fl>"+ CartItems +" Books - </div><div class='cread fr'><img src='images/r.png'> " + CartAmount +"</div>");
			if (WishItems!="")
				$(".wish-count").html("(" +WishItems+")");
		 }
		});	
				
	}
	
	function fn_orderNow(pid,qty)
	{ 
		$.post(siteurl+"include/cartinc.php",
		{
		  prod_id1:pid,
		  prod_qty1:qty,
		  add:"yes"
		},
		function(data,status){ 
		  if (data=="OutOfStock")
		  	 alert('Sorry! This book is out of stock.');
		  else if (data=="MixedStock")
		  	 alert('Books can\'t be ordered with Pre order books. \nPlease make two seprate order for each.');
		  else if (data=="MixedPre")
		  	 alert('Pre order books can\'t be ordered with other books. \nPlease make two seprate order for each.');
		  else
		  {
			  fn_loadcart();
			 location.href=siteurl+"onepage.php";
		  }
		});	
	}
	
	function fn_updatecart(pid,qty)
	{		
		$.post(siteurl+"include/cart.php",
		{
		  cart_id1:pid,
		  prod_qty1:qty,
		  Submit:" Update"
		},
		function(data,status){		
		  $("#cart_items").html(data);		
		});	
	}
	
	function fn_delcart(pid)
	{
		$.post(siteurl+"include/cart.php",
		{
		  delid:pid	 
		},
		function(data,status){
		  $("#cart_items").html(data);		
		});	
	}		
	
	function fn_delwish(pid,qty)
	{
		$.post(siteurl+"include/cartinc.php",
		{
		  delid:pid,	
		  qty:"1111"	 
		},
		function(data,status){ 
		  location.href='account.php?page=wishlist';		
		});	
	}
	
	function fn_orderitems(checkout, val)
	{
		$.post(siteurl+"include/cartinc.php",
		{
		  checkout:checkout,
		  coupon: $("#coupon").val(),
		  couponVal: val
		},
		function(data,status){
		  $("#order_items").html(data);		
		});	
	}
	
	function fn_coupon(website)
	{
		$("#coup-msg").html('');
		if ($("#coupon").val() == "")
		{
			$("#coup-msg").html('- Please enter a valid coupon code.');
		}
		else
		{
			fn_orderitems(true,0);
			$.post(siteurl+"/include/validate.php",
			{
			  coupon: $("#coupon").val(), 
			  website:website,
			  amt: $(".subtotal").text().replace("Rs.","")
			},
			function(data,status){
			  if (data.indexOf("$")!=0)
			  	$("#coup-msg").html(data);
			  else
			  	fn_orderitems(true,data.replace("$",""));
			});				
		}
	}

	function fn_coupon_old()
	{
		$("#coup-msg").html('');
		if ($("#coupon").val() == "")
		{
			$("#coup-msg").html('- Please enter a valid coupon code.');
		}
		else
		{
			$.post(siteurl+"include/validate.php",
			{
			  coupon: $("#coupon").val()
			},
			function(data,status){
			  $("#coup-msg").html(data);		
			});	
			if ($("#coup-msg").html()=="")
				fn_orderitems(true);
		}
		

	}
	
	function fn_validateOrder(totAmt)
	{
		$("#check-out").html('');
		$.post(siteurl+"include/validate.php",
		{
		  totAmt:totAmt
		},
		function(data,status){
			if (data=="AllGood")
				return true;
			else
			{
				$("#check-out").html('- Please enter a valid coupon code.');
				return false;
			}
		});	
		
	}
	
	
	function fn_CreateNewUser()
	{
		msg="";
		$("#message").html("");
		email = $("#remail").val();
		pass = $("#rpassword").val();
		pass1 = $("#rpassword1").val();
		
		
		if (pass1!="" && pass != pass1)
			msg = "Confirm Password is not same.";
		
		if (msg!="")
		{
			$("#message").html(msg);
			//alert(email)
		}
		else
		{ 
			$.post(siteurl+"include/register.php",
			{
			  email:email,	
			  password:pass 
			},
			function(data,status){ 
			  $("#message").html(data);		
			});	
		}
	
	}

	function fn_Newsletter(email)
	{
		var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		$("#nmsg").html('');
		if (email=="")
		{
			$("#nmsg").html('- Email is required');
			return;
		}
		if (email.match(pattern)==null)
		{
			$("#nmsg").html('- Invalid email');
			return;
		}
		$.post(siteurl+"include/newsletter-register.php",
		{
		  email:email,	
		  reg_type:'NL'
		},
		function(data,status){ 
		  $("#nmsg").html(data);		
		});	
	}
	function fn_LoadEmpNews(lang)
	{			
	}
	
	function fn_Event(eType, year, lang)
	{	
		$("#mainform").submit();
		location.href="events.php?eType="+eType;
	}
	
	function fn_News(year, lang)
	{		
		$("#mainform").submit();
		//location.href="news.php?Year="+ year +"&lang="+lang;
	}
	
	function fn_Exams(lang)
	{		
		$("#mainform").submit();
		//location.href="exams.php?lang="+lang;
	}
	
	function fn_CheckShipping()
	{
		
		if ($("#shipadd").is(":checked"))
		{
			fn_setAttrib(true,'#s');
			$("#shipping-address").show();
		}
		else
		{
			fn_setAttrib(false,'#s');
			$("#shipping-address").hide();
		}
		//if ($("#shipadd[checked]")
	}
	

	
	function fn_setAttrib(act,ctrl)
	{
		$(ctrl+"name").attr('required',act);
		$(ctrl+"address").attr('required',act);
		$(ctrl+"city").attr('required',act);
		$(ctrl+"state").attr('required',act);
		$(ctrl+"pin").attr('required',act);
		$(ctrl+"country").attr('required',act);
		$(ctrl+"mobile").attr('required',act);
		if (ctrl=="#")
			$(ctrl+"email").attr('required',act);
	}
	
	function fn_otherAdd()
	{
		$('#existing-add').hide(); 
		$('#add-form').show(); 
		$('#bid').val('');
		$('#sid').val('');
		$('.billing').prop('checked', false);
		$('.shipping').prop('checked', false);
		fn_setAttrib(true,'#')
		$('.billing').attr('required', false);
		$('.shipping').attr('required', false);
	}
	
	function fn_existingAdd()
	{
		$('#existing-add').show(); 
		$('#add-form').hide(); 
		$('.billing').attr('required', true);
		$('.shipping').attr('required', true);
	}
	
	
	function fn_getOrderTrail(oid)
	{
		$.post(siteurl+"upkarpd-admin-7205785/order_status.php",
		{
			oid:oid
		},
		function(data,status){ 
		  $("#orderStatus").html(data);
		});
	}
	
	