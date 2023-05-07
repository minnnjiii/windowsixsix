<!doctype html> 

<html>
    <head>
        <title> 윈도우6의 웹페이지 </title>
        <meta charset="utf-8>">

        <style>
            button {
                width:100%; 
                min-width : 500px;
                border:1px solid #444444;
                height:150px;
                font-size: 50px;
            }

            button.dotted {border-style: dotted;} <!--점선-->
            button.dashed {border-style: dashed;} <!--대쉬선-->
            button.solid {border-style: solid;} <!--진한선-->
            button.double {border-style: double;} <!--선이 두 줄-->
            button.inset {border-style: inset;} <!--들어가 있는 선-->
            button.outset {border-style: outset;} <!--튀어 나와 있는 선-->
            
            div {
                overflow-x : auto;
                
            }


            a{
                background-color : skyblue;
                font-size: 50;
            }

            
               
        </style>
    </head>
    
    <body>

        <form>
            <div width = "300px">
                아이디와 비밀번호를 입력해주세요 <br>
                id : <input name = "id" type="text" ><br>
                pw: <input name="pw" type = "password"> 
                <br>
                <br>
                <div>
                    <input 로그인 type = "submit" >
                    <a href = "http://www.handong.edu">로그인</a><br><br>

                </div>
                
                <br>
                <br>
            </div>
        
        </form>
        <div>
            <button class = "outset" type = "button" onclick = "alert(' A+')" > 클릭해주세용 </button>
            <br>

        </div>
        
        <div>
            <br>

            <button type = "button" onclick = "alert('창문이 열렸습니다!')" > 창문 열기 </button>
            <br>
                <br>
        </div>
        <div>
            <button type = "button" onclick = "alert('창문이 닫혔습니다!')" > 창문 닫기 </button>
    
        </div>
        <br>
                <br>
        <div>
            <button type = "button" onclick = "alert('통계입니다. ')" > 통계 </button>
    
        </div>
        </body>
</html>
