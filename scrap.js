

//test this gameState. it switches turn  for the user to enter input on the computers turn


//computer can not make move but player can
board =
[
["x","x","x","x","x","x",1,0],
["x","x","x","x","x","x","x","x"],
["x","x","x","x","x","x",1,0],
["x","x","x","x","x","x","x","x"],
["x","x","x","x","x","x",1,0],
["x","x","x","x","x","x","x","x"],
["x","x","x","x","x","x","x","x"],
["x","x","x","x","x","x","x","x"]
]


//computer can make move and  player can after
[
["x","x","x","x",0,1,"x","x"],
["x","x","x","x","x","x","x","x"],
["x","x","x","x","x","x","x","x"],
["x","x","x",0,1,"x","x","x"],
["x","x","x","x","x","x","x","x"],
["x","x","x","x","x","x","x","x"],
["x","x",0,1,"x","x","x","x"],
["x","x","x","x","x","x","x","x"]
]



//computer can make move but player cannot, computer can make move after
[
[1,0,"x","x","x","x",0,1],
["x","x","x","x","x","x","x","x"],
["x","x","x",0,1,"x","x","x"],
["x","x","x","x","x","x","x","x"],
["x","x","x","x","x","x","x","x"],
["x","x","x","x","x","x","x","x"],
["x","x","x","x","x","x","x","x"],
["x","x","x","x","x","x","x","x"]
]



//computer cannot make move but player can

//fails if no switch turn after "computer cannot make move"
[
["x","x","x","x","x","x","x","x"],
["x","x","x","x","x","x","x","x"],
["x","x","x","x","x","x","x","x"],
["x","x",1,0,1,"x","x","x"],
["x","x","x","x","x","x","x","x"],
["x","x","x","x","x","x","x","x"],
["x","x",0,1,"x","x","x","x"],
["x","x","x","x","x","x","x","x"]
]
