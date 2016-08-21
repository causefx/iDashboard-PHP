<?php
error_reporting (E_ALL ^ E_NOTICE);
try {
    $config = parse_ini_file('settings.ini.php', true);
} catch(Exception $e) {
    die('<b>Unable to read config.ini.php. Did you rename it from config.ini.php-example?</b><br><br>Error message: ' .$e->getMessage());
}
$i = 0;
$ii = 0;
foreach ($config as $keyname => $section) {
        
        if(($keyname !== "general" && $section["enabled"]=="true")){ 
            $i++;
            if(!empty($section["default"]) && $section["default"]=="true"){
                $defaulttabuser = "tab$i";
            }
            
        }
        
        if(!empty($section["useicons"]) && ($section["useicons"]=="true")){ 
            
            $icons = "active";
            
            $guesticons = "<span><i class=\"fa fa-toggle-on\"></i></span>";
            $adminicons = "<span><i class=\"fa fa-toggle-on\"></i></span>";
            $refreshicons = "<span><i class=\"fa fa-refresh\"></i></span>";
        }
    
        if(!empty($section["usemargins"]) && ($section["usemargins"]=="true")){ 
            
            $margins = "active";

        }
    
        if($icons == "active"){
                
            $px = "62px";//80
            $pxmobile = "-30px";
                
        }else{
                
            $px = "34px";//50
            $pxmobile = "0px";
                
        }
    
        if($margins == "active"){
                
            $marginpx = "10px";
            $marginborderpx = "0px";
                
        }else{
                
            $marginpx = "0px";
            $marginborderpx = "0px";
                
        }
    
        //Guest
        if($_COOKIE["logged"] !== $cookiepass && !empty($section["enabled"]) && ($section["enabled"]=="true") && !empty($section["guest"]) && ($section["guest"]=="true") ) {
            if($icons == "active"){ $listicons = "<span><i class=\"fa ". $section["icon"] ."\"></i></span>"; }
            $loadedlist .= "<li id=\"". $section["url"] ."x\"><a>" . $keyname . " " . $listicons ."</a></li>\n";
            $loadedurls .= "<div class=\"z-nopadding\" data-content-url=\"". $section["url"] ."\" data-content-type=\"iframe\"></div>\n";
            if(($keyname !== "general" && !empty($section["enabled"]) && $section["enabled"]=="true" && !empty($section["guest"]) && $section["guest"]=="true")){  
            $ii++;
            if(!empty($section["default"]) && $section["default"]=="true"){
                $defaulttabguest = "tab$ii";
            }
               
        }       
                            
        }
        //Full Access
        if($_COOKIE["logged"] == $cookiepass && !empty($section["enabled"]) && ($section["enabled"]=="true")) {
            if($icons == "active"){ $listicons = "<span><i class=\"fa ". $section["icon"] ."\"></i></span>"; }
            $loadedlist .= "<li id=\"". $section["url"] ."x\"><a>" . $keyname . " " . $listicons ."</a></li>\n";
            $loadedurls .= "<div class=\"z-nopadding\" data-content-url=\"". $section["url"] ."\" data-content-type=\"iframe\"></div>\n";
            
        }
        //General
        if (empty($title)) $title = 'Manage My HTPC';
        if(($keyname == "general")) { $title = $section["title"]; $tabcoloractive = $section["tabcoloractive"]; $fontcoloractive = $section["fontcoloractive"]; $tabcolor = $section["tabcolor"]; $fontcolor = $section["fontcolor"]; $tabshadowactive = $section["tabshadowactive"]; $tabshadow = $section["tabshadow"]; $cookiepass = $section["password"]; $bg = $section["bg"]; $tabborder  = $section["tabborder"]; $tabhighlight  = $section["tabhighlight"];}

}
    if($_COOKIE["logged"] !== $cookiepass){
        $lasttablist .= "<li><a>Login" . $guesticons . "</a></li>\n";
        $lasttaburl .= "<div class=\"z-nopadding\" data-content-url=\"setup.php\" data-content-type=\"iframe\"></div>\n";
        $defaulttab = $defaulttabguest;
    }

    if($_COOKIE["logged"] == $cookiepass){
        $lasttablist .= "<li><a>Settings" . $adminicons . "</a></li>\n";
        $lasttaburl .= "<div class=\"z-nopadding\" data-content-url=\"setup.php\" data-content-type=\"iframe\"></div>\n";
        $defaulttab = $defaulttabuser;
    }

    if(!file_exists('settings.ini.php')){
        $lasttablist = "<li><a>Setup<span><i class=\"fa fa-spinner\"></i></span></a></li>\n";
        $lasttaburl = "<div class=\"z-nopadding\" data-content-url=\"setup.php\" data-content-type=\"iframe\"></div>\n";
    }

    if(empty($defaulttab)){ $defaulttab = "tab1";}

?>
<!doctype html>
<html class="z-white z-width1200">

    <head>

        <title><?=$title;?></title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="shortcut icon" href="favicon.ico" type="image/ico"/>
        <link href="css/min.css" rel="stylesheet" />
        <link href="css/tabs.min.css" rel="stylesheet" />
        <script src="js/jquery.min.js"></script>
        <script src="js/tabs.min.js"></script>
        <link rel='stylesheet prefetch' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'>
        <style>
            .z-tabs.white.z-bordered > ul > li.z-active > a {color: <?=$fontcoloractive;?>; background-color: <?=$tabcoloractive;?>; text-shadow: 0 1px <?=$tabshadowactive;?>;}
        </style>
        <style>
            .z-tabs.horizontal.responsive > ul > li > a, .z-tabs.horizontal.top-compact > ul > li > a, .z-tabs.horizontal.bottom-compact > ul > li > a, .z-tabs.horizontal.top-center > ul > li > a, .z-tabs.horizontal.bottom-center > ul > li > a {
    color: <?=$fontcolor;?>; background-color: <?=$tabcolor;?>; text-shadow: 0 1px <?=$tabshadow;?>;
}
        </style>
        <style>.z-tabs.mobile {position: absolute;top: 0;bottom: 0;left: 0;right: 0;overflow: overlay;}</style>
        <style>.z-tabs.white > ul, .z-tabs.white > ul > li > a, .z-tabs.white > .z-container {border-color: <?=$tabborder;?>;}</style>
        <style>.z-tabs.horizontal.top.white.z-bordered > ul > li.z-active > a { border-top: 2px solid <?=$tabhighlight;?>; }</style>
        <script>

            $(document).ready(function(){
                $("li").dblclick(function(){
                    var frame = this.id.slice(0, -1);
                    var f = document.getElementById(frame);
                    f.src = f.src;
                });
            });

        </script>
    
    </head>

    <body style="position: fixed; top: 0; right: 0; bottom: 0; left: 0; background-color: <?=$bg;?>; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
    overflow: hidden;">

        <!--<span>&nbsp;</span>-->

        <div id="page" style="margin: <?=$marginpx;?>; position: absolute; overflow: hidden;">

            <!--Tabs Start-->
            <div id="tabbed-nav">

                <ul>

                    <?=$loadedlist;?>
                    <?=$lasttablist;?>

                </ul>

                <!-- Content container -->
                <style> .z-container { position: absolute; top: 50px; right: 0px; bottom: 0px; left: 0px; margin: <?=$marginpx;?>; } </style>
                <style> .z-tabs .z-container{ margin: <?=$marginpx;?>; border-width: <?=$marginborderpx;?>; } </style>
                <style> .z-tabs.mobile.top > .z-container {margin-top: <?=$pxmobile;?>;} </style>
                <style> .z-video{position: absolute; height: 100%; width: 100%;-webkit-overflow-scrolling: touch; overflow: auto;}</style>
                <style> .z-content-inner{overflow: hidden;}</style>
                <style> .z-nopadding.z-content{overflow: hidden}</style>
                <div style="top: <?=$px;?>; overflow: hidden;">              

                    <?=$loadedurls;?>
                    <?=$lasttaburl;?>

                </div>

            </div>
            <!--Tabs End-->

        </div>

        <script>
            jQuery(document).ready(function ($) {
                /* jQuery activation and setting options for the tabs*/
                $("#tabbed-nav").zozoTabs({
                    defaultTab: "<?=$defaulttab;?>",
                    multiline: true,
                    theme: "white",
                    position: "top-compact",
                    size: "mini",
                    animation: {
                        easing: "easeInOutExpo",
                        duration: 450,
                        effects: "fade"
                    }
                });
            });
        </script>

    </body>
    
</html>
