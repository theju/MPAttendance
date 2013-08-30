      $(function() {
        $("#fifteen-one").click(function() {
            $.ajax({
                type: "POST",
                url: "processRequest.php",
                data: {'lsSessionId': 1},
                dataType: "JSON",
                success: function(data) {
                    drawVis(data, 1);
                    callSVG("15-1.csv");
                }
            });
        });

        $("#fifteen-two").click(function() {
            $.ajax({
                type: "POST",
                url: "processRequest.php",
                data: {'lsSessionId': 2},
                dataType: "JSON",
                success: function(data) {
                    drawVis(data, 2);
                    callSVG("15-2.csv");
                },
                error: function(a, b, c) {
                    alert("nope! - 2");
                }
            });
        });

        $("#fifteen-three").click(function(e) {
            $.ajax({
                type: "POST",
                url: "processRequest.php",
                data: {'lsSessionId': 3},
                dataType: "JSON",
                success: function(data) {
                    drawVis(data, 3);
                    callSVG("15-3.csv");
                },
                error: function(a, b, c) {
                    alert("nope! - 3");
                }
            });
            //$(this).closest('td').css("background-color", "black");
        });

        $("#fifteen-four").click(function() {
            $.ajax({
                type: "POST",
                url: "processRequest.php",
                data: {'lsSessionId': 4},
                dataType: "JSON",
                success: function(data) {
                    drawVis(data, 4);
                    callSVG("15-4.csv");
                }
            });
            //$(this).closest('td').css("background-color", "black");
        });

        $("#fifteen-five").click(function() {
            $.ajax({
                type: "POST",
                url: "processRequest.php",
                data: {'lsSessionId': 5},
                dataType: "JSON",
                success: function(data) {
                    drawVis(data, 5);
                    callSVG("15-5.csv");
                },
                error: function(a, b, c) {
                    alert("nope! - 5");
                }
            });
        });

        $("#fifteen-six").click(function() {
            $.ajax({
                type: "POST",
                url: "processRequest.php",
                data: {'lsSessionId': 6},
                dataType: "JSON",
                success: function(data) {
                    drawVis(data, 6);
                    callSVG("15-6.csv");
                },
                error: function(a, b, c) {
                    alert("nope! - 6");
                }
            });
        });

        $("#fifteen-seven").click(function() {
            $.ajax({
                type: "POST",
                url: "processRequest.php",
                data: {'lsSessionId': 7},
                dataType: "JSON",
                success: function(data) {
                    drawVis(data, 7);
                    callSVG("15-7.csv");
                }
            });
        });

        $("#fifteen-eight").click(function() {
            $.ajax({
                type: "POST",
                url: "processRequest.php",
                data: {'lsSessionId': 8},
                dataType: "JSON",
                success: function(data) {
                    drawVis(data, 8);
                    callSVG("15-8.csv");
                },
                error: function(a, b, c) {
                    alert("nope!");
                }
            });
        });

        $("#fifteen-nine").click(function() {
            $.ajax({
                type: "POST",
                url: "processRequest.php",
                data: {'lsSessionId': 9},
                dataType: "JSON",
                success: function(data) {
                    drawVis(data, 9);
                    callSVG("15-9.csv");
                },
                error: function(a, b, c) {
                    alert("nope!");
                }
            });
        });

        $("#fifteen-ten").click(function() {
            $.ajax({
                type: "POST",
                url: "processRequest.php",
                data: {'lsSessionId': 10},
                dataType: "JSON",
                success: function(data) {
                    drawVis(data, 10);
                    callSVG("15-10.csv");
                }
            });
        });

        $("#fifteen-eleven").click(function() {
            $.ajax({
                type: "POST",
                url: "processRequest.php",
                data: {'lsSessionId': 11},
                dataType: "JSON",
                success: function(data) {
                    drawVis(data, 11);
                    callSVG("15-11.csv");
                },
                error: function(a, b, c) {
                    alert("nope!");
                }
            });
        });

        $("#fifteen-twelve").click(function() {
            $.ajax({
                type: "POST",
                url: "processRequest.php",
                data: {'lsSessionId': 12},
                dataType: "JSON",
                success: function(data) {
                    drawVis(data, 12);
                    callSVG("15-12.csv");
                },
                error: function(a, b, c) {
                    alert("nope!");
                }
            });
        });
        
        $(".ls-session").click(function() {
            $("#party-heading").html(' ');
        });

      });
