$(function() {
    var winW=$(window).width(); 
    if(winW >= 1600) { 
        //fullpage 
        $('#fullpage').fullpage({
            menu: '#menu',
            anchors:['INTRO','PROFILE','WEB','GRAPHIC','MOVIES'],
            navigation: true,
            navigationPosition: 'left',
            navigationTooltips:['INTRO','PROFILE','WEB','GRAPHIC','MOVIES'],
            showActiveTooltip:true,

        afterLoad:function(anchorLink, index, direction){

            //n번째 section (그리고 || n) 메뉴는 색깔이 바뀌어야 함. 
            if(index==1) { 
                //메뉴에 active 설정 
                $('#fp-nav ul li .fp-tooltip').addClass('active');
                $('#fp-nav ul li a span').addClass('active');
            }else{
                $('#fp-nav ul li .fp-tooltip').removeClass('active'); 
                $('#fp-nav ul li a span').removeClass('active');
            }

            if(index==1){
                $('.s2 .box > div > div').removeClass('active');
                setTimeout(barStop, 100); 
                $('.s3 .box .swiper').removeClass('active'); 
                $('.s4 .box .edit ul li').removeClass('active'); 
                $('.s5 .box-in').removeClass('active'); 
            }

            //2번째 section에서 자식 콘텐츠에 active 설정 
            if(index==2){
                $('.s2 .box > div > div').addClass('active');
                //1초 기다렸다가 barAnimation함수 호출(1번 실행)
                setTimeout(barAnimation, 1000); 
                $('.s3 .box .swiper').removeClass('active'); 
                $('.s4 .box .edit ul li').removeClass('active'); 
                $('.s5 .box-in').removeClass('active'); 
            }

            if(index==3){
                $('.s2 .box > div > div').removeClass('active');
                setTimeout(barStop, 100); 
                $('.s3 .box .swiper').addClass('active');
                $('.s4 .box .edit ul li').removeClass('active'); 
                $('.s5 .box-in').removeClass('active'); 
            }

            if(index==4){
                $('.s2 .box > div > div').removeClass('active');
                setTimeout(barStop, 100); 
                $('.s3 .box .swiper').removeClass('active'); 
                $('.s4 .box .edit ul li').addClass('active');
                $('.s4 .box .edit ul li').each(function(){
                    // var second-Math.random()*2 0~2 사이의 실수 랜덤 
                    var second=$(this).index()*0.1; // 순서대로 
                }); 
                $('.s5 .box-in').removeClass('active'); 
            }

            if(index==5){
                $('.s2 .box > div > div').removeClass('active');
                setTimeout(barStop, 100);
                $('.s3 .box .swiper').removeClass('active'); 
                $('.s4 .box .edit ul li').removeClass('active'); 
                $('.s5 .box-in').addClass('active'); 
            }
        },

        onLeave: function(index, nextIndex, direction) { 
            if(index==5 && nextIndex==6) { 
                $('header .menu').fadeOut(); 
            }else{
                $('header .menu').fadeIn();
            }
        }
        
        });
    }

    //skill bar 
    function barAnimation(){
        $('.bar').each(function(){
            $(this).find(".bar-inner").animate({
                width: $(this).attr("data-width")
            },2000)
        }); 
    }

    function barStop(){
        $(".bar").each(function(){
            $(this).find(".bar-inner").animate({
                width: 0
            }, 2000)
        })
    }

    //swiper 
    var swiper = new Swiper(".mySwiper",{
        loop: true,
        navigation: { 
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    //popup gallery 
    var imgBtn=$('.s4 .box .edit ul li .edit-des a');
    var gallTotal=$('.s4 .box .edit ul li').length; 
    var popup=$('.popup'); 
    var container=$('.popup .container'); 
    var gallNum=0; 

    imgBtn.click(function(e){
        e.preventDefault(); 
        //마우스로 클릭한 a태그의 href속성 값을 가져와서 attr 변수에 저장 
        var attr=$(this).attr('href');
        console.log(attr);
        // <img src="img/gall1_full.png"> 문장을 완성해서 container 영역에 자식객체로 추가시킴
        container.append('<img src="'+attr+'">'); 
        popup.css('display','block'); 
        //클릭한 a태그의 조상객체 중 li의 인덱스 번호를 가져와서 변수에 저장 
        gallNum=$(this).parents('li').index()+1; 
        console.log(gallNum); 
    });

    //popup gallery close btn 
    $('.close').click(function(){
        popup.css('display', 'none'); 
        //container 안의 내용 비움 
        container.empty(); 
    }); 

    //popup gallery next btn 

    $('.popup .next').click(function(){
        gallNum++; 
        if(gallNum>=gallTotal) { gallNum=0; }
        container.empty(); 
        container.append('<img src="img/fullgall'+gallNum+'.png">'); 
    }); 

    //popup gallery prev btn 

    $('.popup .prev').click(function(){
        gallNum--; 
        if(gallNum < 1 ) { gallNum=gallTotal;}
        container.empty();
        container.append('<img src="img/fullgall'+gallNum+'.png">')
    }); 



}); 