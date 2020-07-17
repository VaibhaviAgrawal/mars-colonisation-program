var rn, cn;
var r_start, c_start;
var r_end, c_end;
var barrier_row=[], barrier_col=[];
///////////////////////////////////////////////
function createTable()
{

rn = window.prompt("Input number of rows", 1);
cn = window.prompt("Input number of columns",1);
  
 for(var r=0;r<parseInt(rn,10);r++)
  {
   var x=document.getElementById('myTable').insertRow(r);
   x.style.backgroundColor = "yellow";
   for(var c=0;c<parseInt(cn,10);c++)  
    {
     var y=  x.insertCell(c);
     y.innerHTML="0"; 
    }
   }
}
//////////////////////////////////////////////////

function mark_starting_point(){
var s;
s=window.prompt("Enter the cell which is starting point smaller than or equal to "+(rn-1)+(cn-1), 1);
var y=parseInt(s, 10);
c_start=y%10;
r_start=parseInt(y/10);
document.getElementById('myTable').rows[r_start].cells[c_start].innerHTML="A";
document.getElementById('myTable').rows[r_start].cells[c_start].style.backgroundColor="Red";
}
/////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
function mark_ending_point(){
var s;
s=window.prompt("Enter the cell which is ending point smaller than or equal to "+(rn-1)+(cn-1), 1);

var y=parseInt(s, 10);
c_end=y%10;

r_end=parseInt(y/10);
document.getElementById('myTable').rows[r_end].cells[c_end].innerHTML="B";
document.getElementById('myTable').rows[r_end].cells[c_end].style.backgroundColor="Green"
}
/////////////////////////////////////////////////////////////////////////
function mark_the_barrier_points(){
var s;
s=window.prompt("Enter the cell which you want to convert to barrier, smaller than or equal to "+(rn-1)+(cn-1), 1);

var y=parseInt(s, 10);
var c=y%10;
var r=parseInt(y/10);
var i=barrier_col.length;
if(i==0){barrier_col.push(y%10);
      barrier_row.push(parseInt(y/10));
      document.getElementById('myTable').rows[r].cells[c].style.backgroundColor="Grey";
}
else{
var find=false;
for(var j=0; j<i; ++j){
	if((barrier_col[j]==c && barrier_row[j]==r)){
		find=true;
}//if
	else {}//else

} //for
if(!find){barrier_col.push(c);
      barrier_row.push(r);
      document.getElementById('myTable').rows[r].cells[c].style.backgroundColor="Grey";
}//if


}//else

document.getElementById('myTable').rows[r].cells[c].innerHTML="1";
}
/////////////////////////////////////////////////////////////////////////////////////////////////
function start_Astar_finder(){
   var open_list=[], closed_list=[];
   function score_G(closed_list){
      var length=closed_list.length;
      return length+1;
   }
   function score_H(W_row, W_col, r_end, c_end){
      return (Math.abs(W_col-c_end)+Math.abs(W_row-r_end));
   }
   var W_row=r_start;
   var W_col=c_start;
   var step=0;
   var four_neighbours;
   while((W_row!=r_end)||(W_col!=c_end))
   {
      four_neighbours=[[W_row, W_col-1], [W_row, W_col+1], [W_row-1, W_col], [W_row+1, W_col]];

      for (var e=0; e<four_neighbours.length; ++e){
         try{
            if(document.getElementById('myTable').rows[four_neighbours[e][0]].cells[four_neighbours[e][1]].innerHTML=="0" || document.getElementById('myTable').rows[four_neighbours[e][0]].cells[four_neighbours[e][1]].innerHTML=="B"){
               open_list.push(four_neighbours[e]);
            }
         }
         catch(err){}
      }
      var min_score=Number.MAX_SAFE_INTEGER;
      var apprent_next=[W_row, W_col];
      var scoreF, scoreG, scoreH;
      for (e=0; e<open_list.length; ++e){
         scoreG=score_G(closed_list);
         scoreH=score_H(open_list[e][0], open_list[e][1], r_end, c_end);
         scoreF=scoreG+scoreH;
         if(min_score>scoreF){
            min_score=scoreF;
            apprent_next=open_list[e];
         }

      }
      for(e=0; e<open_list.length; ++e){
         if(open_list[e]===apprent_next){
             open_list.splice(e, 1);
         }
     }
     closed_list.push(apprent_next);
     if(apprent_next[0]==r_end && apprent_next[1]==c_end){}
     else{
     document.getElementById('myTable').rows[apprent_next[0]].cells[apprent_next[1]].innerHTML="x";
     document.getElementById('myTable').rows[apprent_next[0]].cells[apprent_next[1]].style.backgroundColor="Pink";}
     W_row=apprent_next[0];
     W_col=apprent_next[1];
     step=step+1;
   }

   console.log(step);
   console.log(closed_list);
   document.getElementById("demo").innerHTML = step;
   document.getElementById("path").innerHTML=closed_list.join("<br>")+"<br>";
}
