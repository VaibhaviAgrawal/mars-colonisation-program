var rn, cn;
var r_start, c_start;
var r_end, c_end;
var barrier_row=[], barrier_col=[];
var tbl = document.getElementById("myTable");
        if (tbl != null) {
            for (var i = 0; i < tbl.rows.length; i++) {
                for (var j = 0; j < tbl.rows[i].cells.length; j++)
                    tbl.rows[i].cells[j].onclick = function () { getval(this); };
            }
        }function getval(cel) {
            alert(cel.innerHTML);
        }

///////////////////////////////////////////////
function createTable()
{

rn = window.prompt("Input number of rows", 1);
cn = window.prompt("Input number of columns",1);
  
 for(var r=0;r<parseInt(rn,10);r++)
  {
   var x=document.getElementById('myTable').insertRow(r);
   x.className=""
   x.style.backgroundColor = "yellow";
   for(var c=0;c<parseInt(cn,10);c++)  
    {
     var y=  x.insertCell(c);
     y.innerHTML="0"; 
    }
    document.getElementById("myTable").style.height = "200px";
    document.getElementById("myTable").style.width = "200px";
   }
}
//////////////////////////////////////////////////
function getstart(cel) {
   //  cel.style.backgroundColor="Red";
     var r=cel.parentNode.rowIndex;
     var c=cel.cellIndex;
     //return [r, c];
     c_start=c;
r_start=r;
document.getElementById('myTable').rows[r_start].cells[c_start].innerHTML="A";
document.getElementById('myTable').rows[r_start].cells[c_start].style.backgroundColor="Red";
 }
function mark_starting_point(){
   //var x;
   var tbl = document.getElementById("myTable");
        if (tbl != null) {
            for (var i = 0; i < tbl.rows.length; i++) {
                for (var j = 0; j < tbl.rows[i].cells.length; j++)
                    tbl.rows[i].cells[j].onclick = function () { getstart(this); };
            }
        }
//var s;
//s=window.prompt("Enter the cell which is starting point smaller than or equal to "+(rn-1)+(cn-1), 1);
//var y=parseInt(s, 10);

}
/////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
function getend(cel) {
   //  cel.style.backgroundColor="Red";
     var r=cel.parentNode.rowIndex;
     var c=cel.cellIndex;
     //return [r, c];
     c_end=c;
r_end=r;
document.getElementById('myTable').rows[r_end].cells[c_end].innerHTML="B";
document.getElementById('myTable').rows[r_end].cells[c_end].style.backgroundColor="Green"
 }
function mark_ending_point(){
   var tbl = document.getElementById("myTable");
   if (tbl != null) {
       for (var i = 0; i < tbl.rows.length; i++) {
           for (var j = 0; j < tbl.rows[i].cells.length; j++)
               tbl.rows[i].cells[j].onclick = function () { getend(this); };
       }
   }
}
/////////////////////////////////////////////////////////////////////////
function getbarrier(cel) {
   //  cel.style.backgroundColor="Red";
     var r=cel.parentNode.rowIndex;
     var c=cel.cellIndex;
     //return [r, c];
     var i=barrier_col.length;
if(i==0){barrier_col.push(c);
      barrier_row.push(r);
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
function mark_the_barrier_points(){
   var tbl = document.getElementById("myTable");
   if (tbl != null) {
       for (var i = 0; i < tbl.rows.length; i++) {
           for (var j = 0; j < tbl.rows[i].cells.length; j++)
               tbl.rows[i].cells[j].onclick = function () { getbarrier(this); };
       }
   }


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
   document.getElementById("demo").innerHTML ="The total grids covered is "+ step;
   document.getElementById("path").innerHTML="The path is "+"<br>"+closed_list.join("<br>")+"<br>";
   return;
}
///////////////////////////////////////////////////////////////////////////////////////////
function dijkstra_finder(){
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
         scoreF=scoreG;
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
   document.getElementById("demo").innerHTML = "The total grids covered is "+step;
   document.getElementById("path").innerHTML="The path is"+"<br>"+closed_list.join("<br>")+"<br>";
   return;
}
//////////////////////////////////////////////////////////////////////////////////////////
var visited;
var dist=new Array(rn);
var pred=new Array(rn);
function Breadth_first_search(){
   //create adj_list for the connected graph
   //function Adj_list()
   //startNode, endNode, rn, cn, all 
   //walkables are marked 0 or "A" or "B".
   //initializing a visited 2d array for whole matrix and marking all as not visited;
   visited= new Array (rn);
   for(var e=0; e<rn; ++e){
      visited[e]=new Array (cn);
      dist[e]=new Array(cn)
      pred[e]=new Array(cn);
      for (var f=0; f<cn; ++f){
         visited[e][f]=false;
         dist[e][f]=Number.MIN_SAFE_INTEGER;
         pred[e][f]=[-1,-1];
      }
   }
   //console.log(visited);
   //console.log(dist);
   //console.log(pred);
   // visited is 2d array
   //initializing a dist 2d array, for taking account
   // of the distance of current node from startnode via the followed path
   //pred is an 2d array to keep track of the pred node.
   //var queue=[];
   visited[r_start][c_start]=true;
   dist[r_start][c_start]=0;
   //console.log(visited);
   //console.log(dist);
   var r=parseInt(r_start);
   var c=parseInt(c_start);
   //console.log(r, c);
   var que=[];
   //console.log(que);
   que.unshift([r,c]);
   //console.log(que);
  // console.log(que[0]);
   //console.log(queue.length);
   //queue[index]=[row,column]
// creating a adj list for current node;
   var current_node=[r_start, c_start];
   // current_node[0], current_node[1]
   function adj_list_for(current_node){
      var neighbours=[];
      if(current_node[0]+1<rn){
         neighbours.push([current_node[0]+1, current_node[1]]);
         if(current_node[1]+1<cn){
            neighbours.push([current_node[0]+1, current_node[1]+1]);
         }
         if(current_node[1]-1>=0){
            neighbours.push([current_node[0]+1, current_node[1]-1]);
         }

      }
      if(current_node[0]-1>=0){
         neighbours.push([current_node[0]-1, current_node[1]]);
         if(current_node[1]+1<cn){
            neighbours.push([current_node[0]-1, current_node[1]+1]);
         }
         if(current_node[1]-1>=0){
            neighbours.push([current_node[0]-1, current_node[1]-1]);
         }
      }
      if(current_node[1]+1<cn){
         neighbours.push([current_node[0], current_node[1]+1]);
      }
      if(current_node[1]-1>=0){
         neighbours.push([current_node[0], current_node[1]-1]);
      }
      for(var e=0; e<neighbours.length; ++e){
         var x= document.getElementById('myTable').rows[neighbours[e][0]].cells[neighbours[e][1]].innerHTML;
         //console.log(x);
         //console.log(e);
         //console.log(neighbours[e]);
           if((x=="1")||(x=="A")){
             // console.log(neighbours[e]);
               neighbours.splice(e, 1);
               e=e-1;

            }//if
            else{}
      }

     // var neighbours=[
       //               [current_node[0], current_node[1]+1] ,
         //             [current_node[0], current_node[1]-1],
                      //[current_node[0]+1, current_node[1]],
                     // [current_node[0]-1, current_node[1]],
                     // [current_node[0]-1, current_node[1]-1],
                      //[current_node[0]-1, current_node[1]+1],
                      //[current_node[0]+1, current_node[1]-1],
                     // [current_node[0]+1, current_node[1]+1]
           //          ];
      //for(var e=0; e<neighbours.length; ++e){
        // if(neighbours[e][0]<0 || neighbours[e][0]>=rn){
          //     neighbours.splice(e,1);
      //   }//if
     //    else if(neighbours[e][1]<0 || neighbours[e][1]>=cn){
      //      neighbours.splice(e,1);
      //   }// else if
      //   else{
        //    var x= document.getElementById('myTable').rows[neighbours[e][0]].cells[neighbours[e][1]].innerHTML;
         //   if(x=="1"){
           //    neighbours.splice(e, 1);
           // }//if
            //else {}//else
         //}//else
         
   // } //for
      //console.log(neighbours);
      return neighbours;
   
   }//function
   // now neighbours is the list of all the walkable neighbours around current_node.
   // neighbours[number]=[row, column]
//console.log(queue);
   while(!(que.length==0)){
      current_node=que[0];
      //console.log(current_node);
      que.splice(0,1);
      //console.log(queue);
      var adj=adj_list_for(current_node);
     // console.log(adj);
      //for(var e=0; e<que.length; ++e){
      //   console.log(que[e]);
    //  }

      for (var e=0; e<adj.length; ++e){
         if(visited[adj[e][0]][adj[e][1]]==false){
            visited[adj[e][0]][adj[e][1]]=true;
            dist[adj[e][0]][adj[e][1]]=dist[current_node[0]][current_node[1]]+1;
            pred[adj[e][0]][adj[e][1]]=current_node;
            que.push([adj[e][0],adj[e][1]]);
            //console.log(que);
            var x= document.getElementById('myTable').rows[adj[e][0]].cells[adj[e][1]].innerHTML;
           // console.log(x)
            if(x=="B"){
               return true;
            }
         }//if
      }
      //console.log(visited);
      //console.log(dist);
      //console.log(pred);

   }//while

return false;
}

function click_bfs(){
   if(Breadth_first_search()==false){
      document.getElementById("demo").innerHTML = "Cannot find";
      return;
   }
   else{
      var path=[];
      var crawl=[r_end, c_end];
      console.log(crawl[0]);
      var r=r_end;
      var c=c_end;
      while(pred[r][c][0]!= -1){
         path.unshift(pred[crawl[0]][crawl[1]]);
         crawl=pred[r][c];
         r=crawl[0];
         c=crawl[1];
         document.getElementById('myTable').rows[r].cells[c].innerHTML="x";
         document.getElementById('myTable').rows[r].cells[c].style.backgroundColor="Pink";
         
      }//while
      document.getElementById('myTable').rows[r_start].cells[c_start].innerHTML="A";
         document.getElementById('myTable').rows[r_start].cells[c_start].style.backgroundColor="Red";
         
      document.getElementById("demo").innerHTML = "Totall grids covered is: "+dist[r_end][c_end] ;

      document.getElementById("path").innerHTML="The path is"+"<br>"+path.join("<br>")+"<br>";
   }
}