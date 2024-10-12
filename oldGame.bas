dim v(11),h(11)
print chr$(142)
for a=1 to 11
	read v(a),h(a)
next
data 6,3,1,11,6,11,11,11
data 1,19,6,19,11,19
data 1,27,6,27,11,27,6,35

z$="sqqqqqqqqqqqqqqqqq"
poke53281,6:poke53280,15:print"e"

def fnp(x)=2^(x-1)
dim s(165),r(30,2),l(11,11),w(3),a(165,11)
print"“"

Label700:

print"the french military game"

print"  by  martin gardner"
print:print" <revised by alan gardner for the c-64>"
print" do you need instructions?";:poke198,0:wait198,1:get in$
if in$="y" or in$="n" then goto Label1275
goto Label700

Label1275:
print" loading data....please wait":poke53296,255
for l=1to 9
	l1=fnp(l)
	for m=l+1to 10
		m1=fnp(m)
		for r=m+1to 11
			s(i)=l1+m1+(fnp(r))
			i=i+1
		next r
	next m
next l:poke53296,0
print"“"
print"qqqq]]]]]]"
if left$(in$,1)<>"n" then gosub LabelInstructions
for i=1 to 30
	for j=1 to 2
		let r(i,j)=0
	next j
next i
for i=1 to 11
	for j=1 to 11
		read l(i,j)
	next j
next i

Label4000:
b=6
w(1)=1
w(2)=2
w(3)=4
i0=1
gosub CalcS3
gosub LabelDrawBoard

Label4700:
print z$;"white pieces are at ";w(1);" ";w(2);" ";w(3)"  "
print"the black piece is at ";b"  "
print"your move, from-to x,y        ";
input x,y
if x=0 and y=0 then goto LabelIWin
gosub LabelCheckMove
if l2=1 then goto Label5900 
print"foul !!!!! try again."
goto Label4700

Label5900:
print"s":p$="  q  "
gosub PositionCursorVH
print"s":p$="er  qr  ’"
dd=x:x=y:gosub PositionCursorVH:x=dd
gosub CalcS3
if i0<=19 then goto Label6600
print z$"that's 20 moves, ace, and you haven't trapped me."
goto LabelIWin

Label6600:
gosub CalculateNextMove
if m4=0then goto LabelILost
print z$;:print"qqq                          ":print z$"‘eqqqqi move to ";m4
print"s":p$="  q  "
dd=x:x=b:gosub PositionCursorVH:x=dd
print"s":p$="r  qr  ’"
dd=x:x=m4:gosub PositionCursorVH:x=dd
print z$
r(i0,1)=s3
r(i0,2)=m4
b=m4
i0=i0+1
if b<>1 then goto Label4700

LabelIWin:
print z$"i win......"
w=1
goto Label8300

LabelILost:
print z$"i lost......"
w=-1

Label8300:
gosub ResetArrays

Label8500:
print"ewant to play again";
input e$
if left$(e$,1)="y" then goto Label4000
if left$(e$,1)="n" then goto Label9000
print"please answer y or n":print:goto Label8500

Label9000:
poke198,0
print"“"
print"qqqqqqqqqq"
print"]]]]]]]]]]";
print"* * * the  end * * *"
print"sqqqqqqqqqqqqqqqqqqqqqq"
goto LabelLoadMenu

LabelCheckMove:
l2=-1
for i2=1 to 3
	j2=i2
	if w(i2)=x then goto Label10000
next i2
goto Label10900

Label10000:
if b=y then goto Label10900
for i2=1 to 3
	if w(i2)=y then goto Label10900
next i2
if l(x,y)<>2 then goto Label10900
w(j2)=y
l2=1

Label10900:
return



CalcS3:
	a3=fnp(w(1))+fnp(w(2))+fnp(w(3))
	for s3=1 to 165
		if s(s3)=a3 then goto Label11500
	next s3

Label11500:
	return

CalculateNextMove:
	m4=0
	for i4=1 to 11
		if l(b,i4)=0 then goto Label12800
		for j4=1 to 3
			if w(j4)=i4 then goto Label12800
		next j4
		if m4=0 then goto Label12700
		if a(s3,m4)>=a(s3,i4) then goto Label12800
	
Label12700:	
		m4=i4
	
Label12800:
	next i4

	return

ResetArrays:
	for i6=1 to i0-1
		s=r(i6,1)
		m=r(i6,2)
		a(s,m)=a(s,m)+w
	next i6
	return

data  0,2,2,2,0,0,0,0,0,0,0
data  1,0,2,0,2,2,0,0,0,0,0
data  1,2,0,2,0,2,0,0,0,0,0
data  1,0,2,0,0,2,2,0,0,0,0
data  0,1,0,0,0,2,0,2,0,0,0
data  0,1,1,1,2,0,2,2,2,2,0
data  0,0,0,1,0,2,0,0,0,2,0
data  0,0,0,0,1,1,0,0,2,0,2
data  0,0,0,0,0,1,0,2,0,2,2
data  0,0,0,0,0,1,1,0,2,0,2
data  0,0,0,0,0,0,0,2,2,2,0

LabelDrawBoard:
	print"“":a$="        "
	print a$"  ™2e¦¦¦    ™5e¦¦¦    ™8e¦¦¦
	print a$"  ¦  ¦____¦  ¦____¦  ¦
	print a$"  ¦  ¦    ¦  ¦    ¦  ¦
	print a$" N¦¦¦¦M   ¦¦¦¦   N¦¦¦¦M
	print a$"N  §   M   §    N  §   M
	print"  ™1e¦¦¦ N  ™3e¦¦¦  M ™6e¦¦¦ N  ™9e¦¦¦  M ™11e¦¦
	print"  ¦  ¦N___¦  ¦___M¦  ¦N___¦  ¦___M¦  ¦
	print"  ¦  ¦M   ¦  ¦   N¦  ¦M   ¦  ¦   N¦  ¦
	print"  ¦¦¦¦ M  ¦¦¦¦  N ¦¦¦¦ M  ¦¦¦¦  N ¦¦¦¦
	print a$"M  §   N   §    M  §   N
	print a$" M™4e¦¦¦N   ™7e¦¦¦   M™10e¦¦N
	print a$"  ¦  ¦____¦  ¦____¦  ¦
	print a$"  ¦  ¦    ¦  ¦    ¦  ¦
	print a$"  ¦¦¦¦    ¦¦¦¦    ¦¦¦¦
	p$="er  q  "
	print"s":x=1:gosub PositionCursorVH
	print"s":x=2:gosub PositionCursorVH
	print"s":x=4:gosub PositionCursorVH
	p$="r  q  "
	print"s":x=6:gosub PositionCursorVH
return
rem  square 1

PositionCursorVH:
	for v=1 to v(x)
		print"q";
	next:
	for h=1 to h(x)
		print"]";
	next
	print p$
	return

LabelInstructions:
	print"“":a$="        "
	print a$"     2````5````8"
	print a$"    N}M   }   N}M"
	print a$"   N } M  }  N } M"
	print a$"  N  }  M } N  }  M"
	print a$" N   }   M}N   }   M"
	print a$"1````3````6````9````11"
	print a$" M   }   N}M   }   N"
	print a$"  M  }  N } M  }  N"
	print a$"   M } N  }  M } N"
	print a$"    M}N   }   M}N"
	print a$"     4````7```10"
	print"sqqqqqqqqqqq"
	print" the playing field for the french
	print"military game is shown above. you will"
	print"play white and will start with three"
	print"men located at 1, 2, and 4. black has"
	print"only one man, which starts at 6. white"
	print"has the first move and may move any one"
	print"piece one space."
	print"   white may only move up, down, or to"
	print"the right. black may move in any direc-"
	print"tion. no piece may move to a space"
	print"occupied by another piece."
	print:print" << press the space bar to continue >>";
Label20800:
	poke198,0:wait198,1:get a$:if a$<>" " then goto Label20800
	poke198,0
	print"“"
	print"   White wins the game by pinning the"
	print"black piece so that black has no move."
	print"this usually occurs with black trapped"
	print"at 11, but if black plays poorly it may"
	print"be pinned at 5 or 7. black wins by"
	print"reaching 1 or by evading being pinned"
	print"for 20 moves."
	print"   White can always win if he plays"
	print"correctly and does not make any mis-"
	print"takes. but if you want to resign just"
	print"type 0,0"
	print"sqqqqqqqqqqqqqqqqqqqqqq"
	print"  << press the space bar to continue >>"
Label20800:
	poke198,0:wait198,1:get a$:if a$<>" " then goto Label20800
	print"“"
	print"   the game is very easy to win the"
	print"first few times it is played, but it"
	print"will learn from its mistakes and become"
	print"increasingly more difficult to beat."
	print
	print"   the program stores what it has"
	print"learned in an array.";
	print"  therefore"
	print"the game gets increasingly difficult as":print"time goes on.
	print"sqqqqqqqqqqqqqqqqqqqqqq"
	print"  << press the space bar to continue >>"
Label23750:
	poke198,0:wait198,1:get a$:if a$<>" " then goto Label23750
	poke198,0
	print"“"
	return

for co=2051 to 43838
	if peek(co)=19 then 
		if peek(co+1)=0 then print co
next

LabelLoadMenu:
print" Connecting to Menu..."
poke53281,0:poke53280,0
print"load"chr$(34)"menu"chr$(34)",8":print"run"
poke631,13:poke632,13:poke198,2
