$(function() {
    $("div#tt-one").next().append( $('div#tt-two') );
    
    // on selecting a session
    $("#change-session").on("change", function(e) {
        var v = $("#change-session").val();
        if(v>0) {
            $(".gender-count, #tt-one").empty();
            $("svg").remove();
            $("#reset-graph, .change-gender, .class-info, .attendance-header").show(); //  .alert-info,
            // sets gender to 'Select Gender' when new session is loaded
            $(".change-gender").val('10');
            // fetch data from database
            v = 15;
            $.ajax({
                type: "POST",
                url: "parse-inputs.php",
                data: {'session_selected': v},
                dataType: "JSON",
                success: function(data, status) {
                    console.log(data.length);
                    //loadSVG(data);
                }
            });
            loadSVG($("#change-session").val());
        } else {
            alert("Improper selection");
        }
    });
    $(".alert-info").on("click", function(e) {
        $(this).remove();
    });
    $(".about-modal").on("click", function() {
        $("#aboutModal").modal('show');
    });
    $(".parties-modal").on("click", function() {
        $("#partiesFull").modal('show');
    });
});

function loadSVG(session) {

    var totalDays = 0;
    var perc = 0;
    var counter = 0;
    var margin = {top: 20, bottom: 100, left: 35, right: 200},
    width = 520,
    height = 520;
    
    var startDate = ['June 01, 2009', 'July 02, 2009', 'November 19, 2009', 'February 22, 2010', 'July 26, 2010', 'November 09, 2010', 'February 21, 2011', 'August 01, 2011', 'November 22, 2011', 'March 12, 2012', 'August 08, 2012', 'November 22, 2012'];
    var endDate = ['June 09, 2009', 'August 07, 2009', 'December 21, 2009', 'March 16, 2010', 'August 31, 2010', 'December 13, 2010', 'March 25, 2011', 'September 08, 2011', 'December 29, 2011', 'May 22, 2012', 'September 07, 2012', 'December 20, 2012'];

    // adds session duration information
    $(".session-info").html("<strong>"+ startDate[$("#change-session").val()] + "</strong> to <strong>" + endDate[$("#change-session").val()]+"</strong>" );
    
    var mx, my; // for mouse position
	$(document).mousemove(function(e) {
		mx = e.pageX;
		my = e.pageY;
	});

    var x = d3.scale.linear()
               .range([0, width]);

    var y = d3.scale.linear()
               .range([height, 0]);

    var color = d3.scale.category10();

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var svg = d3.select(".main-svg")
    .append("svg")
    .attr("width", width + margin.left + margin.right + 100)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var div = d3.select("body")
    .append("div")
    .attr("id", "tt-one")
    .attr("class", "tooltip")
    .style("opacity", 0);

    var partyTip = d3.select("body")
    .append("div")
    //.attr("id", "tt-two")
    .attr("class", "tooltip")
    .style("opacity", 0.5);

      var arr = new Array;
    d3.csv("data/session-"+session+".csv", function(error, data) {  
        data.forEach(function(d) {
            //if(d.Party) {
            counter = counter + 1;
            totalDays = parseInt(d.DaysSigned, 10) + parseInt(d.DaysMissed, 10);
            perc = parseFloat(d.DaysSigned/totalDays)*100;
            d.perc = perc;
            d.signed = parseInt(d.DaysSigned, 10);
            d.missed = parseInt(d.DaysMissed, 10);
            d.counter = counter;
            d.mpname = d.Name;
            d.party = d.Party;
            d.gender = d.Gender;
            d.state = d.State;
			
			var obj = {
			            key: counter,
			            party: d.party,
			            perc: d.perc,
			            a: d.perc >= 75 ? 1 : 0,
			            b: d.perc >=65 && d.perc < 75? 1 : 0,
			            c: d.perc < 65 ? 1 : 0
        			};
        	arr.push(obj);
        	//}
        });

        var l = {};
        var totala=0,
            totalb=0,
            totalc = 0;
        for (var i = 0; i < arr.length; i++) {
            if( !l[arr[i].party] ) {
                l[arr[i].party] = {
                    key: i,
                    party: arr[i].party,
                    perca: arr[i].a,
                    percb: arr[i].b,
                    percc: arr[i].c,
                    counts: 1,
                    counta: arr[i].a,
                    countb: arr[i].b,
                    countc: arr[i].c
                }
            } else {
                l[arr[i].party].counts++;
                if( arr[i].perc >= 75 ) {
                    l[arr[i].party].counta++;
                    totala++;
                }
                if( arr[i].perc >= 65 && arr[i].perc < 75 ) {
                    l[arr[i].party].countb++;
                    totalb++;
                }
                if( arr[i].perc < 65 ) {
                    l[arr[i].party].countc++;
                    totalc++;
                }
                l[arr[i].party].perca = (l[arr[i].party].counta / l[arr[i].party].counts) * 100;
                l[arr[i].party].percb = (l[arr[i].party].countb / l[arr[i].party].counts) * 100;
                l[arr[i].party].percc = (l[arr[i].party].countc / l[arr[i].party].counts) * 100;
            }
        }
        var totalss = totala + totalb + totalc;
        $(".total-mp-counts").html( "<li>" + ((totala/totalss)*100).toFixed(2) + " % (" + totala + " of " + totalss + " MPs) have >75% attendance</li><li>" + ((totalb/totalss)*100).toFixed(2) + " % (" + totalb + " of " + totalss + " MPs) have 65-75% attendance</li><li>" + ((totala/totalss)*100).toFixed(2) + " % (" + totala + " of " + totalss + " MPs) have <65% attendance</li>" );
        
        var partyData = new google.visualization.DataTable();
        partyData.addColumn('string', 'Party');
        partyData.addColumn('string', 'Number of MPs in 1st,2nd,3rd classes');
        partyData.addColumn('number', '1st class %');
        partyData.addColumn('number', '2nd class %');
        partyData.addColumn('number', '3rd class %');
        //partyData.addColumn('number', 'Total');

        for(key in l) {
            partyData.addRow([ l[key].party, parseInt(l[key].counta, 10) + ", " + parseInt(l[key].countb, 10) + ", " + parseInt(l[key].countc, 10), parseInt(l[key].perca, 10), parseInt(l[key].percb, 10), parseInt(l[key].percc, 10) ]); //, parseInt(l[key].counts, 10) ]);
        }
        var tab = new google.visualization.Table( document.getElementById('party-perc-one') );
        tab.draw(partyData, 
                        {
                            sortColumn: 2,
                            sortAscending: false,
                            showRowNumber: true,
                            width: '100%'
                        });

        x.domain(d3.extent(data, function(d) { return d.perc; } )).nice();
        y.domain(d3.extent(data, function(d) { return d.counter; } )).nice();

       svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
        .append("text")
          .attr("class", "label")
          .attr("x", width)
          .attr("y", -6)
          .style("text-anchor", "end")
          .text("Attendance %");

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Number of MPs");

      svg.selectAll(".dot")
          .data(data)
        .enter().append("circle")
          .attr("class", "dot")
          .attr("r", 4)
          .attr("cx", function(d) { return x(d.perc); })
          .attr("cy", function(d) { return y(d.counter); })
          .on("mouseover", function(d) {
            d3.select(this).attr("r", 6);
            $("#tt-one").html("<div>" + d.mpname + ' (' + d.party + ') </div> <div> Days signed (missed): ' + d.signed + ' (' + d.missed + ') <br> State: ' + d.state );
			$("#tt-one").css({'top': my, 'left': mx}).show();
          })
          .on("mouseout", function(d) {
            d3.select(this).attr("r", 4);
            $("#tt-one").hide();
          }) 
          .style("fill", function(d) { return color(d.party); });

      // Legend data
      var legend = svg.selectAll(".legend")
          .data(color.domain())
        .enter().append("g")
          .attr("class", "legend")
          .on("mouseover", toggleParties)
          .on("mouseout", retainData)
          .attr("transform", function(d, i) { return "translate(0," + i * 12 + ")"; })
          //.attr("transform", function(d, i) { return "translate(" + -i*20 + ", 0)"; })
          .style("font-size", "10px");
          
      // on legend mouse out
      function retainData(options) {
        var circles = d3.selectAll("svg circle");
        circles.filter(function(d) {
            return d.party == options;
        })
        .style("opacity", "1")
        .attr("r", "4");
      }

      // on legend mouse hover
      var first_class_content = '',
            second_class_content = '',
            third_class_content = '';
      function toggleParties(options) {
        $(".table-one, .table-two, .table-three, .gender-count").empty();
        $(".change-gender").val('10');
        first_class_content = '';
        second_class_content = '';
        third_class_content = '';
        var circles = d3.selectAll("svg circle");
        var count = 0;
        var dist = 0,
            distSecond = 0,
            distThird = 0;
        circles.filter(function(d) {
            // to display MP names in mp-info div
            if(d.party == options) {
                count = count + 1;
                if(d.perc >= 75) {
                    dist = dist + 1;
                    d.mpname.indexOf("Shri") != -1 ? addContent(d, "Shri", 1) : d.mpname.indexOf("Smt.") != -1 ? addContent(d, "Smt.", 1) : addContent(d, "", 1);
                }
                if(d.perc >= 65 && d.perc < 75) {
                    distSecond = distSecond + 1;
                    d.mpname.indexOf("Shri") != -1 ? addContent(d, "Shri", 2) : d.mpname.indexOf("Smt.") != -1 ? addContent(d, "Smt.", 2) : addContent(d, "", 2);
                }
                if(d.perc < 65) {
                    distThird = distThird + 1;
                    d.mpname.indexOf("Shri") != -1 ? addContent(d, "Shri", 3) : d.mpname.indexOf("Smt.") != -1 ? addContent(d, "Smt.", 3) : addContent(d, "", 3);
                }
                //partyTip
                $(".party-selected").html("Party selected: "+ d.party);
            }
            return d.party != options;
        })
        .style("opacity", "0.1")
        .attr("r", "4");

        // adds content in the end
        $(".table-one").append("<tr> <th> First class (" + dist + "/" + count + ")</th> </tr>");
        $(".table-two").append("<tr> <th> Second class (" + distSecond + "/" + count + ")</th> </tr>");
        $(".table-three").append("<tr> <th> Third class (" + distThird + "/" + count + ")</th> </tr>");
        $(".table-one").append(first_class_content);
        $(".table-two").append(second_class_content);
        $(".table-three").append(third_class_content);
        $(".party-selected").append(", Total MPs: " + count);
      }

      // adds MP names to first, second, third classes
      function addContent(d, to_be_replaced, grade) {
        if(grade === 1) {
            first_class_content += '<tr><td>' + d.mpname.replace(to_be_replaced, "") + '</td></tr>';
        } else if (grade === 2) {
            second_class_content += '<tr><td>' + d.mpname.replace(to_be_replaced, "") + '</td></tr>';
        } else if (grade === 3) {
            third_class_content += '<tr><td>' + d.mpname.replace(to_be_replaced, "") + '</td></tr>';
        }
      }

      // Legend shape
      legend.append("rect")
          .attr("x", width + 32)
          .attr("width", 8)
          .attr("height", 8)
          .style("fill", color);

      // Legend text
      legend.append("text")
          .attr("x", width + 54)
          .attr("y", 5)
          .attr("transform", "translate(55, 00)" )
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d; });
    
    // changes properties of nodes based on Gender
    $(".change-gender").on("change", function(e) {
        var gender = $(".change-gender").val();
        var g = gender == 0 ? "Female" : gender == 1 ? "Male" : false;
        var counter = svg.selectAll(".dot")
            .filter(function(d) {
                return d.gender == gender ? d.party : false;
            })
            .attr("r", 4)
            .size();
        svg.selectAll(".dot")
            .filter(function(d) {
                return d.gender != gender ? d.party : false;
            })
            .attr("r", 0);
    });
    
    // resets all nodes on clicking Reset button
    $("#reset-graph").on("click", function(e) {
        $(".change-gender").val('10');
        $(".gender-count").empty();
        svg.selectAll("circle")
            .style("opacity", "1")
            .attr("r", "4");
    });
    
    }); // end of d3.csv

} // end of loadSVG

