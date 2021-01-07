// ==UserScript==
// @name         东奥会计继续教育看课自动答题[长期维护]
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  长期维护，如果挂了请邮件vankurua@outlook.com
// @author       Vankurua
// @include      *://jxjycwweb.dongao.com/cwweb/videoShow/video/*
// @license      MIT
// ==/UserScript==
(function() {
    detect();
    function detect(){
        if(document.querySelector(".lister_pop_box")){
            Checkanswer();
        }
        else{
            //每5秒检查一次是否有弹窗
            setTimeout(detect,5000);
        }
    }
    //提取正确答案和判断类型
    function Checkanswer(){
        console.log("Checkansuer功能调用成功");
        var FinalCheckList; //用于多种class的多种判断
        var answer=document.querySelector(".pop-right-ans").getAttribute("value") //提取正确答案
        var answers=answer.split("") //除掉“”并转化为数组
        var CheckList1=document.querySelectorAll(".sub_radio_bg") // 选择所有class为sub_radio_b的元素
        var CheckList2=document.querySelectorAll(".sub_seclet_bg") // 选择所有class为sub_seclet_bg的元素
        //判断是那种class的CheckList
        if(CheckList1.length!=0){
            FinalCheckList=CheckList1;
            console.log("class为sub_radio_bg");
            click(FinalCheckList,answers); //调用click方法
            //答题完成后重新调用detect;
            setTimeout(detect,5000);

        }
        else if(CheckList2.length!=0) {
            FinalCheckList=CheckList2;
            console.log("class为sub_seclet_bg");
            click(FinalCheckList,answers);
            setTimeout(detect,5000);
        }
        else {
            console.log("新增了class，代码失效，停止脚本运行，请邮件联系或者自己手动增加一个判断,");
        }
    }
    function click(list,answer){
        console.log("click功能调用成功");
        for(let i=0;i<answer.length;i++){
            for(let j=0;j<list.length;j++){
                if(list[i].getAttribute("value")===answer[j]){
                    list[i].click();
                   console.log("点击"+list[i].getAttribute("value"));
                }
            }
        }
        document.querySelector(".box-sure").click();
        console.log("完成");
    }
})();
