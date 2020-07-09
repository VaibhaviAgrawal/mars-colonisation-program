import sys
rows, cols=(6, 7) #this is the initial grid
arr = [[0 for i in range(cols)] for j in range(rows)]  #initializing the grid with all zeros



#defining the starting point as A
arr[3][1]="A"
#defining the starting point as B
arr[4][5]="B"
starting_index=[3,1]
ending_index=[4,5]
#obstacles
#defining the obstacles as 1
arr[4][1]=1
arr[1][3]=1
arr[2][3]=1
arr[3][3]=1
arr[4][3]=1
print("--------------final image of the grid-------------")
for i in arr:
    print(i)

print("-------now working on the process----------")
open_list=[]
close_list=[]
#defining functions for calculating scores.
def score_G(close_list):
    length=len(close_list)
    return length+1
def score_H(W_row, W_col, ending_ind):
    return(abs(ending_ind[0]-W_row)+abs(ending_ind[1]-W_col))

#W stores the index of the current block in which particle is
#T is the neighbouring blocks in which particle can be moved i.e present in openlist

W=starting_index
step=0
#checking for the elements in open list
while ((W[0]!=ending_index[0]) or (W[1]!=ending_index[1])):
    
    four_neighbours=[(W[0], W[1]-1), (W[0], W[1]+1), (W[0]-1, W[1]), (W[0]+1, W[1])]
#updating the open list with the eligible blocks
    for x in four_neighbours:
        try:
            if(arr[x[0]][x[1]]==0 or arr[x[0]][x[1]]=='B'):
                open_list.append(x)
        except IndexError:
            pass        
    #print("initial open list")
    #print(open_list)    
    min_score=sys.maxsize
#finding the minimum score amongst the candidates in open_list
    Apparent_next_W=W
    for x in open_list:
        scoreG=score_G(close_list)
        scoreH=score_H(x[0], x[1], ending_index)
        scoreF=scoreG+scoreH
        if(scoreF<min_score):
            min_score=scoreF
            Apparent_next_W=x
#updating the open_list and close_list.
    open_list.remove(Apparent_next_W)
    close_list.append(Apparent_next_W)
    W=Apparent_next_W
    arr[W[0]][W[1]]="x"
    step=step+1
    print("next step was", W)

print("yeah!! you have reached the final destination in minimum steps, and the number of steps is", step)
arr[W[0]][W[1]]="B"
for i in arr:
    print(i) 



