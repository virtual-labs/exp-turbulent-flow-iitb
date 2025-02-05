


var seq:number;
var seq_container:Chemistry.Geometry[]=[];
var pupm_con:Chemistry.Pump_controller; 
var all_valves:Chemistry.Custome_image[]=[];
var show_table_0: boolean = false;
var t0: boolean = true;
var Ti: number;
var To: number;
var temp_diff_1: number = 0;
var temp_diff_2: number = 0;
var control_panel_text: Chemistry.Text;

var selected_temp: number = 72;

var selected_ind = 0;

var selected_data_index = 0;

var floater: Chemistry.Custome_image;
var timer: Chemistry.Custome_image;

var flow_rate_text: Chemistry.Geo_Text;
var table: Observation_Table;



var dsp_Ti: Chemistry.Geo_Text;
var dsp_To: Chemistry.Geo_Text;
var dsp_ti: Chemistry.Geo_Text;
var dsp_to: Chemistry.Geo_Text;

var btn_to_a3 = `<button id="panel1_btn" class="btn btn-primary" onclick="activity4();" style="position: absolute; bottom: 12vh; width: 85%;">Next</button>`;


function activity2(){
    if(document.getElementById("btn-to-a6")) {
        document.getElementById("btn-to-a6").remove();
    }

    pp.clearleftpannel();
    pp.clearrightpannel();
    pp.addoffcanvas(3);
    a6_add_slider();
    draw_table();

    pp.addcanvas('mycanvas');



    // panel.style.display = "flex";
    // panel.style.width = "22%";

    // document.getElementById("question-div-box").style.background = "#f4ccccff";
    
//    a6_root_style();

    canvas = pp.canvas;

    pp.showtitle('<p id="exp-title">Now simulate all the steps with experimental setup.Take readings to start the calculation of heat transfer coefficient</p>', 3);


    
    // green_circle=[];
    To=31.3;
    Ti=36.6;
    seq=0;
    seq_container=[];

    control_panel_text = new Chemistry.Text("Control Panel", new Chemistry.Point(850, 790), canvas);

    timer = new Chemistry.Custome_image(timer_img, new Chemistry.Point(1000, 250), 290, 210, canvas);
    floater = new Chemistry.Custome_image(float_img, new Chemistry.Point(230, 482), 34, 30, canvas);
    

    let v1 = new Chemistry.Custome_image(red_valve, new Chemistry.Point(740, 435), 66, 19, canvas);
    v1.stang = -90;

    flow_rate_text = new Chemistry.Geo_Text('Flow Rate = 0 (L/h)', new Chemistry.Point(265, 550), canvas);
    flow_rate_text.font = '26%';
    all_valves=[v1];

    dsp_Ti = new Chemistry.Geo_Text('Ti', new Chemistry.Point(645, 756), canvas);
    dsp_Ti.font = '24%';

    dsp_To = new Chemistry.Geo_Text('To', new Chemistry.Point(498, 396), canvas);
    dsp_To.font = '24%';

    dsp_ti = new Chemistry.Geo_Text('ti', new Chemistry.Point(663, 512), canvas);
    dsp_ti.font = '24%';

    dsp_to = new Chemistry.Geo_Text('to', new Chemistry.Point(489, 725), canvas);
    dsp_to.font = '24%';


    pupm_con=new Chemistry.Pump_controller(canvas);
    // document.getElementById("root").appendChild(canvas);
    
    canvas.style.cursor="crosshair";
    context=canvas.getContext("2d");
    rect=canvas.getBoundingClientRect();
    //table_0_draw();
    canvas.addEventListener('click',a6_mouseclick);//inlet cold fluid vlave
    scene=new Scene();
    //add_a6_panel(canvas, `${rect.x + canvas.width - 300}px`, `${rect.y}px`);
    window.onload=a6_windowresize;
    window.onresize=a6_windowresize;
    a6_windowresize();

    scene.add(floater);
       
    var first_geo=new Chemistry.Custome_image(seq1_img,new Chemistry.Point(470,440),709, 650,canvas);
    first_geo.name="first";
    seq_container.push(first_geo);



    first_geo.draw();
    
    draw_seq_all();
    draw_pump_con();
}

function draw_pump_con(){
   pupm_con.draw();
}

function a6_windowresize(){
    //canvas size
    a6_canvas_size();
    //canvas mapping
    a6_canvas_mapping();
    //draw border or rectangle
    scene.draw();

    draw_seq_all();
    draw_pump_con();
    flow_rate_text.draw();
    dsp_labels();


    if(show_table_0) {

    let table = document.getElementById('table_0');
    table.style.right = `${rect.x + 100*lscale}px`;
    table.style.top = `${rect.y+ canvas.height - 550*lscale}px`;
    table.style.height = `${canvas.height*2.8/4}px`;
    table.style.fontSize = "0.85vw";
    }
}

function dsp_labels() {
    dsp_Ti.draw();
    dsp_To.draw();
    dsp_ti.draw();
    dsp_to.draw();
}


function a6_canvas_size(){
    canvas.width=window.innerWidth*0.91;
    canvas.height=canvas.width*1080.0/1920*0.85;
    lscale=canvas.width/1920.0;
    document.getElementById('leftpannel').style.height = (canvas.height + 5) + "px";
    document.getElementById('leftpannel').style.margin = '0';
}

function a6_canvas_mapping(){
    context.translate(0,canvas.height);
    context.scale(1,-1);
}

function draw_seq_all(){


    scene.draw();

    control_panel_text.draw();
   
    draw_pump_con();

    all_valves[0].draw();
    // all_valves[1].draw();
    
    if(seq==0){
        console.log("open cold water inlet valve ");
        // add_to_content("open cold water inlet valve ");
        pp.showdescription(`<div style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: calc(1vw + 12px);">open cold water inlet valve</div>`, 3);
        show_des();
    
    }
    for(let i=0;i<seq_container.length;i++){
        seq_container[i].draw();
    }

    if(seq==1 && seq_container[1].l < seq_container[1].l_last){
        window.requestAnimationFrame(draw_seq_all);
        all_valves[0].img = blue_valve;
        all_valves[0].stang = -45;
        all_valves[0].stpt.x = 760;
        all_valves[0].stpt.y = 428;
    }
    else if(seq==1){
        if(seq_container[1].name="second"){
            seq_container.splice(1,1);
            seq_container[0].img=seq2_img;
            seq=3;
            draw_seq_all();
            seq=4;
            canvas.addEventListener("click",a6_mouseclick_seq_35); 
           

            // add_to_content("Open glass section outlet valve");
            pp.showdescription(`<div style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: calc(1vw + 12px);">Turn pump power on</div>`, 3);
            show_des();  
            
            
        }
    }

    else if(seq==4 && (seq_container[1].l<seq_container[1].l_last)){
        window.requestAnimationFrame(draw_seq_all);
        floater.draw();
    }
    else if(seq==4){
        if(seq_container[1].name="third"){
            seq_container.splice(1,1);
            seq_container[0].img=seq2_img;
            seq=5; 
            console.log("pump and test section animation completed");
            flow_rate_text.text = 'Flow Rate = 700 (L/h)';

            // let a6_text = new Chemistry.Text("pump and test section animation completed", new Chemistry.Point(1125, 600), canvas);
            // a6_text.color = "yellow";
            // a6_text.font = "24px";
            // a6_text.draw();

            //start h pipe animation
            var second_geo=new Chemistry.anim_image_x_dir(seq4_img,new Chemistry.Point(470,440),699, 650,canvas);
            seq_container.push(second_geo);
            second_geo.name="fourth";
            second_geo.l=743;  // 650
            second_geo.l_last=670;
            second_geo.width=585;
            second_geo.width_last=250;
            draw_seq_all();
            // second_geo.draw();
            floater.draw();
        }
    }
    else if(seq==5 && seq_container[1].width>seq_container[1].width_last){
        window.requestAnimationFrame(draw_seq_all);
        floater.draw();
    }
    else if(seq==5){
        if(seq_container[1].name="fourth"){
            seq_container.splice(1,1);
            seq_container[0].img=seq4_img;
            seq=6;
            console.log("H pipe animation completed");

            // let a6_text = new Chemistry.Text("H pipe animation completed", new Chemistry.Point(1125, 600), canvas);
            // a6_text.color = "yellow";
            // a6_text.font = "24px";
            // a6_text.draw();

            //start glass and v pipe animation
            var second_geo1=new Chemistry.anim_image_y_dir_down(seq5_img,new Chemistry.Point(470,440),697, 650,canvas);
            seq_container.push(second_geo1);
            second_geo1.name="fourth";
            second_geo1.startx=400; // 400
            second_geo1.l=80;
            second_geo1.l_last=500;
            second_geo1.width=0;
            draw_seq_all();
            // second_geo.draw();
        }
    }
    else if(seq==6 && seq_container[1].l<seq_container[1].l_last){
        window.requestAnimationFrame(draw_seq_all);
        floater.draw();
    }
    else if(seq==6){
        if(seq_container[1].name="fourth"){
            seq_container.splice(1,1);
            seq_container[0].img=seq5_img;
            seq=7;
            console.log("glass and v pipe animation completed");

            

            //start next animation
            canvas.addEventListener("click",a6_mouseclick_seq_7);
            var second_ge =new Chemistry.Geo_Text('72' ,new Chemistry.Point(650,323),canvas);
            second_ge.font = '24%';
            seq_container.push(second_ge);
            console.log("Turn on the heater");


            draw_seq_all();
            // let a6_text = new Chemistry.Text("Turn on the heater", new Chemistry.Point(1125, 600), canvas);
            // a6_text.color = "yellow";
            // a6_text.font = "24px";
            // a6_text.draw();
            //document.getElementById("a6-question-div-box").innerText = "Turn on the Heater";
            // add_to_content("Click on the 'h' button on control pannel to turn on the Heater");
            pp.showdescription(`<div style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: calc(1vw + 12px);">Click on 'h' button on control panel to turn on the heater</div>`, 3);
            show_des();
            // second_geo.draw();
            floater.draw();
        }
    }
    else if(seq==13 && seq_container[seq_container.length-1].l<seq_container[seq_container.length-1].l_last){
        //drawing timer text for first reading 199.60;
        seq_container[3].text=getreadingtime().toString();
        seq_container[2].draw();
        window.requestAnimationFrame(draw_seq_all);
    }
    else if(seq==13){
        seq_container[2].draw();
        console.log("glass fill animation completed");

        // let a6_text = new Chemistry.Text("Observation Table", new Chemistry.Point(1125, 600), canvas);
        // a6_text.color = "yellow";
        // a6_text.font = "24px";
        // a6_text.draw();
       // document.getElementById("a6-question-div-box").innerText = "See Table for 8 different flow rates";
    //    add_to_content("Note down all the readings, You require to fill the table in the next activity");
      


        if(!document.getElementById("table-btn")) {
            // add_button(`<button style="margin-bottom: 5%; font-size: 1.3vw;" id="table-btn" class="btn btn-primary" onclick="table_0_draw();">Next</button>`);
        }

    }

    flow_rate_text.draw();
    dsp_labels();


    //add all valve draw

    

   
}

var readingtime=0;
function getreadingtime(){
    //if 81 then 199.60 if 83 190.10
    if(get_temp_con_value() == 81) {
        readingtime+=199.60/99;//199.60 first data set timer reading 99 time the loop execute
        return(readingtime.toFixed(2));
    } else {
        readingtime+=190.10/99;//199.60 first data set timer reading 99 time the loop execute
        return(readingtime.toFixed(2));
    }
    
}

function a6_mouseclick(e:MouseEvent){
    let x=Math.round((e.clientX-rect.x)/lscale);
    let y=Math.round((canvas.height- (e.clientY-rect.y))/lscale);
    console.log(x,y);
    a6_check_isinside_cold_in(x,y);
    //all_valves[0].img="green color" change stpt angle
}

// function a6_mouseclick_seq_2(e:MouseEvent){
//     let x=Math.round((e.clientX-rect.x)/lscale);
//     let y=Math.round((canvas.height- (e.clientY-rect.y))/lscale);
//     console.log(x,y);
//     if(y>=494 && y<=545){
//         if(x>=598 && x<=681){
//             seq=3;
           
//             canvas.removeEventListener("click",a6_mouseclick_seq_2);
//             console.log("Open hot fluid pump outlet valve");
//             //document.getElementById("a6-question-div-box").innerText = "Open hot fluid pump valve";
//             // add_to_content("Click on 'p' button on control panel to turn on the pump");
            
            

//             //canvas.addEventListener("click",a6_mouseclick_seq_3);
//             //add rotation of glass section valve open green color
//             //all_valves[1].img="green color" change stpt angle
//             // all_valves[1].img = blue_valve;
//             // all_valves[1].stang = 45;
//             // all_valves[1].stpt.y = 510;


            
//             draw_seq_all();

//             // let a6_text = new Chemistry.Text("Open hot fluid pump outlet valve", new Chemistry.Point(1125, 600), canvas);
//             // a6_text.color = "yellow";
//             // a6_text.font = "24px";
//             // a6_text.draw();
//             a6_mouseclick_seq_3()
            
            
//         }
//     }
//     // a6_check_isinside_cold_in(x,y);
// }

function a6_mouseclick_seq_3(){
    
            seq=4;
            canvas.removeEventListener("click",a6_mouseclick_seq_3);
            console.log("Click pump power on");

           

            canvas.addEventListener("click",a6_mouseclick_seq_35); 
            a6_add_slider();    
                
        
}

function a6_mouseclick_seq_35(e:MouseEvent){
    // new_task_6("Please wait...");
    let x=Math.round((e.clientX-rect.x)/lscale);
    let y=Math.round((canvas.height- (e.clientY-rect.y))/lscale);
    console.log(x,y);
    if(y>=692 && y<=765){
        if(x>=871 && x<=943){
            console.log("here")
            seq=4;
            canvas.removeEventListener("click",a6_mouseclick_seq_35);
            console.log("Pump animation");
            pupm_con.color="green";
            // var second_geo=new Chemistry.anim_image(seq3_img,new Chemistry.Point(470,440),709, 650,canvas);
            var second_geo = new Chemistry.Dual_Anim(seq3_img, floater, new Chemistry.Point(470,440),709, 650, 80/lscale, 6000,canvas);
            seq_container.push(second_geo);
            second_geo.name="third";
            second_geo.l=1;
            second_geo.l_last=600;  // 600
            second_geo.width=380;  // 380
            second_geo.startx = -100;
            let slider: HTMLInputElement = <HTMLInputElement> document.getElementById("a6_slider");
            let sv = 0;

            let temp_t = setInterval(() => {
                if(sv < 5) {
                    sv++;
                    slider.value = (sv-1).toString();
                } else {
                    clearInterval(temp_t);
                }
            }, 400) ;
            
            draw_seq_all();
            
        }
    }
    // a6_check_isinside_cold_in(x,y);
}

function a6_mouseclick_seq_7(e:MouseEvent){
    let x=Math.round((e.clientX-rect.x)/lscale);
    let y=Math.round((canvas.height- (e.clientY-rect.y))/lscale);
    console.log(x,y);
    if(y>=688 && y<=769){
        if(x>=943 && x<=1020){
            seq=8;
            canvas.removeEventListener("click",a6_mouseclick_seq_7);
            // canvas.addEventListener("click",a6_mouseclick_seq_8);
            // canvas.addEventListener("click",a6_mouseclick_seq_9);
            canvas.addEventListener("click",a6_mouseclick_timer_start);
            console.log("Heater on");
            pupm_con.color1="green";
            //start timer
            
            console.log("click on up arrow to select desire temperature and click start on timer");

            

            //timer image

            var second_geo=new Chemistry.anim_image(timer_img,new Chemistry.Point(1000,325),290, 210,canvas);
            seq_container.push(second_geo);
            second_geo.name="timer";
            second_geo.l=210;
            second_geo.l_last=210;
            second_geo.width=0;
            draw_seq_all();
            index_temp_con=0;
            floater.draw();

            // let a6_text = new Chemistry.Text("click on up arrow to select desire temperature and click start on timer", new Chemistry.Point(1125, 600), canvas);
            // a6_text.color = "yellow";
            // a6_text.font = "24px";
            // a6_text.draw();
           // document.getElementById("a6-question-div-box").innerText = "Click Buttons on Temp Controller to select a Temperature";
        //    add_to_content("Click on up and down arrow on temp controller to select the temperature");

        pp.showdescription('<div style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: calc(1vw + 12px);">temp controller is set to 72 degrees, now click start button</div>', 3);
        show_des();


            
        }
    }
    // a6_check_isinside_cold_in(x,y);
}

function a6_mouseclick_seq_8(e:MouseEvent){
   
    let x=Math.round((e.clientX-rect.x)/lscale);
    let y=Math.round((canvas.height- (e.clientY-rect.y))/lscale);
    console.log(x,y);
    if(y>=408 && y<=440){
        if(x>=700 && x<=780){
            // new_task_6("");
            //get temp text
            seq=9;
            console.log("temp up controller event");

            // let a6_text = new Chemistry.Text("temp up controller event", new Chemistry.Point(1125, 600), canvas);
            // a6_text.color = "yellow";
            // a6_text.font = "24px";
            // a6_text.draw();
            // canvas.removeEventListener("click",a6_mouseclick_seq_7);
            if(seq_container.length>2){
                seq_container.splice(2,seq_container.length);
            }
            if(index_temp_con<temp_con.length-1){
                index_temp_con++;
                console.log(index_temp_con);
            }
            
            let temp_con_value=get_temp_con_value();
            var second_geo=new Chemistry.Geo_Text(temp_con_value.toString() + ' C',new Chemistry.Point(650,390),canvas);
            second_geo.font = "24%";
            //selected_temp = temp_con_value;
            // set_global_temp_ind(temp_con_value);
            console.log("the selected temp value is: " + temp_con_value);
            
            second_geo.textalingment="center";
            // seq_container.push(second_geo);
            second_geo.name="temp_con";
            
            draw_seq_all();

            floater.draw();

            // add_to_content("Click on start button to Start the timer");
            
        }
    }
    // a6_check_isinside_cold_in(x,y);
}

function a6_mouseclick_seq_9(e:MouseEvent){
   
    let x=Math.round((e.clientX-rect.x)/lscale);
    let y=Math.round((canvas.height- (e.clientY-rect.y))/lscale);
    console.log(x,y);
    if(y>=335 && y<=380){
        if(x>=700 && x<=780){
            // new_task_6("");
            //get temp text
            seq=9;
            console.log("temp down controller event");

            // let a6_text = new Chemistry.Text("temp down controller event", new Chemistry.Point(1125, 600), canvas);
            // a6_text.color = "yellow";
            // a6_text.font = "24px";
            // a6_text.draw();
            // canvas.removeEventListener("click",a6_mouseclick_seq_7);
            if(seq_container.length>2){
                seq_container.splice(2,seq_container.length);
            }
            if(index_temp_con>0){
                index_temp_con--;
            }
            
            let temp_con_value=get_temp_con_value();

            var second_geo=new Chemistry.Geo_Text(temp_con_value.toString(),new Chemistry.Point(650,323),canvas);
            second_geo.font = '24%';
            //selected_temp = temp_con_value;
            // set_global_temp_ind(temp_con_value);
            
            // for(let i = 0; i < readings.length; i++) {
            //     if(Math.round(temp_con_value) == Math.round(readings[i].temp)) {
            //         selected_data_index = i;
            //     }
            // }


            console.log("the selected temp value is: " + temp_con_value);
            second_geo.textalingment="center";
            // seq_container.push(second_geo);
            second_geo.name="temp_con";
            
            draw_seq_all();
            floater.draw();
            
        }

        // add_to_content("Click on start button to Start the timer");
    }
    // a6_check_isinside_cold_in(x,y);
}
var timer_anim=true;
function a6_mouseclick_timer_start(e:MouseEvent){
    let x=Math.round((e.clientX-rect.x)/lscale);
    let y=Math.round((canvas.height- (e.clientY-rect.y))/lscale);
    
    console.log(x,y);
    if(y>=230 && y<=300){
        if(x>=869 && x<=943){
            //get temp text
           
            if(index_temp_con>=0){
                console.log('reached on 580');
                
                seq=10;
                console.log("timer start");
                // new_task_6("Start timer");
                console.log("stop the time after steady state temp i.e. after 900 sec");

                // let a6_text = new Chemistry.Text("stop the time after steady state temp i.e. after 900 sec", new Chemistry.Point(1125, 600), canvas);
                // a6_text.color = "yellow";
                // a6_text.font = "24px";
                // a6_text.draw();

              //  document.getElementById("a6-question-div-box").innerText = "stop the time after steady state temp i.e. after 900 sec";

            //   add_to_content("stop the time after steady state temp i.e. after 900 sec");

            pp.showdescription('<div style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: calc(1vw + 12px);">stop the time after steady state temp i.e. after 900 sec</div>', 3);

                canvas.removeEventListener("click",a6_mouseclick_seq_8);
                canvas.removeEventListener("click",a6_mouseclick_seq_9);
                canvas.removeEventListener("click",a6_mouseclick_timer_start);
                seq_container[1].img=timer_img;
                let settime=0;
                //timer text
                var second_geo=new Chemistry.Geo_Text(settime.toString(),new Chemistry.Point(984,332),canvas);
                seq_container.push(second_geo);
                second_geo.font='25%';
                second_geo.textalingment="center";
                second_geo.name="timer text";
                //Ti text
                var Ti_text=get_Ti_text();
                var Ti_value=new Chemistry.Geo_Text(Ti_text.toString(),new Chemistry.Point(638,708),canvas);
                seq_container.push(Ti_value);
                Ti_value.textalingment="center"
                //To text
                var To_text=get_To_text();
                var To_value=new Chemistry.Geo_Text(To_text.toString(),new Chemistry.Point(502,335),canvas);
                seq_container.push(To_value);
                To_value.textalingment="center"
                 //ti text
                 var ti_text=get_ti_text();
                 var ti_value=new Chemistry.Geo_Text(ti_text.toString(),new Chemistry.Point(657,458),canvas);
                 seq_container.push(ti_value);
                 ti_value.textalingment="center"
                 //ti text
                 var to_text=get_to_text();
                 var to_value=new Chemistry.Geo_Text(to_text.toString(),new Chemistry.Point(486,669),canvas);
                 seq_container.push(to_value);
                 to_value.textalingment="center";
                // var ii=1;
                anim_timer();
                
                function anim_timer(){
                    second_geo.text=settime.toString();
                    Ti_value.text=get_Ti_text().toString();
                    To_value.text=get_To_text().toString();
                    draw_seq_all();
                    settime+=5;
                    // console.log(ii);
                    if(settime<=900){
                        // ii++;
                        window.requestAnimationFrame(anim_timer);
                    }
                    else{
                        console.log("click stop timer");

                        

                        timer_anim=true;
                        seq_container[1].img=timer_img;
                        // let a6_text = new Chemistry.Text("click stop timer", new Chemistry.Point(1125, 600), canvas);
                        // a6_text.color = "yellow";
                        // a6_text.font = "24px";
                        // a6_text.draw();
                      //  document.getElementById("a6-question-div-box").innerText = "stop the timer";
                    //   add_to_content("stop the timer");

                        pp.showdescription('<div style="background-color: #f4ccccff; border-radius: 10px; border: black; padding: 5%; font-weight: 500; font-size: calc(1vw + 12px);">Stop the timer and enter the vlaues</div>', 3);
                        show_des();
                        canvas.addEventListener("click",a6_mouseclick_timer_stop)
                        anim_timer_900_more();

                       
                    }
                }

                function anim_timer_900_more(){
                    second_geo.text=settime.toString();
                    settime++;
                    draw_seq_all();
                    if(timer_anim){
                        window.requestAnimationFrame(anim_timer_900_more);
                    }
                    else{
                        console.log("timer has stoped");

                        seq_container[1].img=timer_img;
                        draw_seq_all();
                        console.log("Click to reset the timer");

                        // let a6_text = new Chemistry.Text("Click to reset the timer", new Chemistry.Point(1125, 600), canvas);
                        // a6_text.color = "yellow";
                        // a6_text.font = "24px";
                        // a6_text.draw();

                     //   document.getElementById("a6-question-div-box").innerText = "Click to reset the timer";

                    //  add_to_content("Click to reset the timer")

                        canvas.addEventListener("click",a6_mouseclick_timer_reset);
                        //add event listern to reset
                        floater.draw();
                    }

                    
                }
            }
        }
    }
}

function a6_mouseclick_timer_stop(e:MouseEvent){
    let x=Math.round((e.clientX-rect.x)/lscale);
    let y=Math.round((canvas.height- (e.clientY-rect.y))/lscale);
    console.log(x,y);
    if(y>=240 && y<=290){
        if(x>=1080 && x<=1160){
            //get temp text
            seq=11;
            timer_anim=false;
            console.log("timer stopping");
            canvas.removeEventListener("click",a6_mouseclick_timer_stop);
            let tab_ele: HTMLTableElement = <HTMLTableElement> document.getElementById('obs-tab');
            tab_ele.style.display = 'block';
            
        }
    }
}

function a6_mouseclick_timer_reset(e:MouseEvent){
    let x=Math.round((e.clientX-rect.x)/lscale);
    let y=Math.round((canvas.height- (e.clientY-rect.y))/lscale);
    console.log(x,y);
    if(y>=240 && y<=290){
        if(x>=970 && x<=1015){
            let tab_ele: HTMLTableElement = <HTMLTableElement> document.getElementById('obs-tab');
            tab_ele.style.display = 'block';
            //get temp text
            seq=12;
            timer_anim=false;
            console.log("timer reset");
            seq_container[3].text="0";
            canvas.removeEventListener("click",a6_mouseclick_timer_reset);
            seq_container[1].img=timer_img;
            draw_seq_all();
            canvas.addEventListener("click",a6_mouseclick_seq_12);
            console.log("close outlet glass valve and start timer");
            // let a6_text = new Chemistry.Text("close outlet glass valve and start timer", new Chemistry.Point(1125, 600), canvas);
            // a6_text.color = "yellow";
            // a6_text.font = "24px";
            // a6_text.draw();
         //   document.getElementById("a6-question-div-box").innerText = "Close outlet gas valve and start timer";
        //  add_to_content("Close outlet glass valve and start timer");

        floater.draw();
}
    }
}

function a6_mouseclick_seq_12(e:MouseEvent){
    let x=Math.round((e.clientX-rect.x)/lscale);
    let y=Math.round((canvas.height- (e.clientY-rect.y))/lscale);
    console.log(x,y);
    if(y>=477 && y<=550){
        if(x>=593 && x<=660){
            seq=13;
            canvas.removeEventListener("click",a6_mouseclick_seq_12);
            console.log("Glass valve closed")
            //add rotation of glass section valve closed
            seq_container[0].img=seq5_img;
            let glass=new Chemistry.anim_image(seq5_img,new Chemistry.Point(470,440),709, 650,canvas);
            glass.l=475;
            glass.l_last=575;
            glass.width=200;
            glass.startx=400;
            seq_container.push(glass);
            readingtime=0;
            //glass outlet valve to red img change stpt and angle
            //all_valves[0].img="red color"
            // all_valves[1].img = red_valve;
            // all_valves[1].stang = 0;
            // all_valves[1].stpt.y = 520;
            draw_seq_all();
            //animate glass section fill
        }
    }
    
}

//console.log("the selected temp value is: " + readings[selected_ind].reading[0][1]);



function get_Ti_text(){
    
    Ti+=(35.3/181.0);//81.2-28.2=53 181 is the no of times loop execute check data set
    return(Ti.toFixed(2));
}


function get_To_text(){
    
    To+=(35.9/181.0); //71.2-28.2=43 181 is the no of times loop execute check data set
    return(To.toFixed(2));
}

function get_ti_text(){
    var ti=To=table_1[selected_ind][3];
    return(ti.toFixed(2));
}

function get_to_text(){
    //if 81 to 28.3 if 83 to 30
    var to=table_1[selected_ind][4];
    return(to.toFixed(2));
}
var index_temp_con=-1;
var temp_con=[72];//from data set
function get_temp_con_value(){
    console.log(72);
    
    let temp=72;
    
    return(temp);
}

function a6_check_isinside_cold_in(x,y){
    console.log(x, y);
    
    if(x<=760 && x>=713){
        if(y>=400 && y<=480){
            console.log("condition satisfied");
            
            //cold inlet valve click check
            var second_geo=new Chemistry.anim_image(seq2_img,new Chemistry.Point(470,440),699, 650,canvas);
            seq_container.push(second_geo);
            second_geo.name="second";
            second_geo.l=290;   // 290
            second_geo.l_last=525;   // 525
            second_geo.width=800;    // 380
            second_geo.startx = 500;
            seq=1;
            draw_seq_all();
            //add rotation of cold inlet valve open
            canvas.removeEventListener("click",a6_mouseclick);
        }
    }
}

function a6_add_slider() {
    // let slider: HTMLInputElement = <HTMLInputElement> document.createElement('input');
    // slider.type = "range";
    // slider.id = "a6_slider";
    // slider.min = "0";
    // slider.max = "4";
    // slider.step = "1";
    // slider.value = "0";
    // slider.style.width = "60px";
    // slider.style.position = "absolute";
    // slider.style.left = `${rect.x + 250*lscale}px`;
    // slider.style.top = `${rect.y + canvas.height - 120*lscale}px`;
    // document.getElementById("pannelcreate").appendChild(slider);

    pp.addtoleftpannel(`<input type='range' style='position: absolute; width: 6vw; left: 15vw; top: 34vw; z-index: 5;' id='a6_slider' min='0' max='4' step='1' value='0' />`);
}

function draw_table() {
    let heading = ['Flow Rate Q (L/h)', 'T<sub>i</subp>', 'T<sub>o</subp>', 't<sub>i</subp>', 't<sub>o</subp>', 'Check'];

    let rows = [[`<input style='width: 4vw;' id='a2-inp1' />`, `<input style='width: 4vw;' id='a2-inp2' />`, `<input style='width: 4vw;' id='a2-inp3' />`, `<input style='width: 4vw;' id='a2-inp4' />`, `<input style='width: 4vw;' id='a2-inp5' />`, `<button onclick='verify_table();' style='font-size: 1vw;' class='btn btn-info'>Verify</button>`]];

    table = new Observation_Table(heading, rows);

    pp.addtoleftpannel(table.template);

    table.draw();
}

function verify_table() {
    let res1: HTMLInputElement = <HTMLInputElement> document.getElementById('a2-inp1');
    let res2: HTMLInputElement = <HTMLInputElement> document.getElementById('a2-inp2');
    let res3: HTMLInputElement = <HTMLInputElement> document.getElementById('a2-inp3');
    let res4: HTMLInputElement = <HTMLInputElement> document.getElementById('a2-inp4');
    let res5: HTMLInputElement = <HTMLInputElement> document.getElementById('a2-inp5');

    if (!verify_values(700, parseFloat(res1.value))) {
        alert("Please enter the correct Flow Rate");
        return;
      }

    if (!verify_values(72.1, parseFloat(res2.value))) {
    alert("Please enter the correct Ti value");
    return;
    }


    if (!verify_values(67.2, parseFloat(res3.value))) {
    alert("Please enter the correct To value");
    return;
    }

    if (!verify_values(31.3, parseFloat(res4.value))) {
    alert("Please enter the correct ti value");
    return;
    }

    if (!verify_values(36.6, parseFloat(res5.value))) {
        alert("Please enter the correct to value");
        return;
    }

    alert("All Values are correct");

    timer = null;

    for(let i=0;i<seq_container.length;i++){
        seq_container[i].draw();
    }

    flow_rate_text.draw();
    floater.draw();

    let heading = ['Flow Rate Q (L/h)', 'T<sub>i</subp>', 'T<sub>o</subp>', 't<sub>i</subp>', 't<sub>o</subp>'];


    let rows: string[][] = [];

    for(let i=0; i<table_1.length; i++) {
        rows[i] = [];
        rows[i][0] = table_1[i][0].toString();
        rows[i][1] = table_1[i][1].toString();
        rows[i][2] = table_1[i][2].toString();
        rows[i][3] = table_1[i][3].toString();
        rows[i][4] = table_1[i][4].toString();
    }
    table.heading_column = heading;
    table.data = rows;
    table.draw();

    pp.addtorightpannel(btn_to_a3, 3);

}

//activity2();


