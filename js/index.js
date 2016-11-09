$(function(){
	var audio=$("#audio").get(0);
	var $audio=$("#audio");
	var play=$(".play");
	var progress=$("#progress");
	var pI=$("#p-i");
	var r1=pI.width()/2;
	var duration=$("#duration")
	var currentTime=$("#currentTime")
		//开始 暂停
	play.on("touchend",function(){
		if(audio.paused){
			audio.play();
			play.html("&#xe60e;");
		}else{
			audio.pause();
			play.html("&#xe60c;");
		}
		
	})
	
	//处理时间
	function formate(sss){
		var ss=Math.floor(sss);
		var s=ss%60;
		s=(s<10)?"0"+s:s;
		var m=Math.floor(ss/60)
		return m+":"+s;
	}
	//进度点击
	progress.on("touchend",function(e){
		e.stopPropagation();
		e.preventDefault();
		audio.currentTime=(e.originalEvent.changedTouches[0].clientX-progress.eq(0).offset().left)/progress.width()*audio.duration;
	})
	
//进度条拖拽  
//小圆半径  
var r1=pI.width()/2;
	pI.on("touchstart",function(e){
		e.preventDefault();
		var start=r1-e.originalEvent.changedTouches[0].clientX;
		$(document).on("touchmove",function(e){
			var left=e.originalEvent.changedTouches[0].clientX-progress.offset().left+start;
			var ct=left/progress.width()*audio.duration;
			if(ct>=audio.duration||ct<0){
				return;
			}
			audio.currentTime=ct;
			pI.css("left",left);
		})
	})
	$(document).on("touchend",function(e){
		$(document).off("touchmove");
	})
	
	//列表
	//开关列表
	var sel=$(".sel");
	var guan=$(".guan")
	sel.on("touchend",function(){
		$(".liebiao").css("display","block")
	})
	guan.on("touchend",function(){
		$(".liebiao").css("display","none")
	})
	
   var currentIndex=0;
   var musics=[
    {
    	name:"醉赤壁",
        author:"林俊杰",
        src:"mp3/林俊杰 - 醉赤壁.mp3",
        lrc:"lrc/周传雄 - 记事本.krc"
    },
    {
    	name:"不要问我分手后怎么过",
        author:"周传雄 ",
        src:"mp3/周传雄 - 不要问我分手后怎么过.mp3",
        lrc:"lrc/周传雄 - 记事本.krc"
    },
    {
    	name:"记事本",
        author:"周传雄 ",
        src:"mp3/周传雄 - 记事本 - Live.mp3",
        lrc:"lrc/周传雄 - 记事本.krc"
    }
   ]
   
   function render(){
	   	$(musics).each(function(i){
	   		var c=(i==currentIndex)?"active":"";
	   		$("<li class="+c+"><span>"+musics[i].name+"</span><span>--"+musics[i].author+"</span><div id='del'>×</div></li>").appendTo(".mlist")
	   	})
   }
   //删除
   var del=$("#del");
   del.on("touchend",function(){
   	  $(this).closest("li").css("display","none")
   })	
   //歌曲切换
	   $(".mlist").on("touchend","li",function(){
	   	
	   	  $("li").removeClass("active");
	   	  $(this).addClass("active");
	   	  currentIndex=$(this).index();
	   	  audio.src=musics[currentIndex].src;
	   	  audio.play();
	   	  $(".hd-title").html(musics[currentIndex].name)
	   	  $(".author").html(musics[currentIndex].author);
	   	  $(".lrc").css("background",musics[currentIndex].lrc)
	   })
	//下一曲
	   var next=$(".next");
	   var now=currentIndex;
	   next.on("touchend",function(){
	   	   now++;
	   	   if(now>=musics.length)
	   	   {
	   	   	  now=0;
	   	   }
	   	   $("li").removeClass("active");
	   	   $("li").eq(now).addClass("active");
	   	   audio.src=musics[now].src;
	   	   audio.play();
	   	   $(".hd-title").html(musics[now].name)
	   	   $(".author").html(musics[now].author);
	   }) 
	   
	   //上一曲
	   var pre=$(".pre");
	   pre.on("touchend",function(){
	   	   now--;
	   	   if(now<0)
	   	   {
	   	   	  now=musics.length-1;
	   	   }
	   	   $("li").removeClass("active");
	   	   $("li").eq(now).addClass("active");
	   	   audio.src=musics[now].src;
	   	   audio.play();
	   	   $(".hd-title").html(musics[now].name)
	   	   $(".author").html(musics[now].author)
	   })
	   render();
	
	//事件
	$audio.on("loadstart",function(){
		
	})
	$audio.on("canplay",function(){
		
	})
	$audio.on("progress",function(){
		
	})
	$audio.on("play",function(){
		
	})
	$audio.on("pause",function(){
		
	})
	$audio.on("ended",function(){
		
	})
	$audio.on("timeupdate",function(){
		duration.html(formate(audio.duration));
		currentTime.html(formate(audio.currentTime));
		//进度条
		pI.css("left",progress.width()*audio.currentTime/audio.duration);
	})
	$audio.on("volumechange",function(){
		
	})
	
})
