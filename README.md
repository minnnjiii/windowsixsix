<!doctype html>
<html>


<title> 윈도우6의 웹페이지 </title>
    <style>
        button {
            width:100%; 
            min-width : 50px;
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
