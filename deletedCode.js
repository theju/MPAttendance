        var parties = new Array;
        $.each(arr, function(key, item) {
            if(!parties[arr[key].party])
                parties[arr[key].party] = 0;
            ++parties[arr[key].party];
        });
        console.log(parties);
        
        var firstClass = _.countBy(arr, function(num) {
                        return num.perc >= 75 ? num.party : false;
                    });
        var secondClass = _.countBy(arr, function(num) {
                        return num.perc >= 65 && num.perc < 75 ? num.party : false;
                    });
        var thirdClass = _.countBy(arr, function(num) {
                        return num.perc < 65 ? num.party : false;
                    });

        var s = '';
        $.each(firstClass, function(key, item) {
            if(key != 'false')
                s += "<tr><td>" + key + "</td><td>" + item + "</td></tr>";
        })
        $(".party-perc-first").html(s);

        s = '';
        $.each(secondClass, function(key, item) {
            if(key != 'false')
                s += "<tr><td>" + key + "</td><td>" + item + "</td></tr>";
        })
        $(".party-perc-second").html(s);

        s = '';
        $.each(thirdClass, function(key, item) {
            if(key != 'false')
                s += "<tr><td>" + key + "</td><td>" + item + "</td></tr>";
        })
        $(".party-perc-third").html(s);

        
        /*var p = _(l).sortBy("perca");
        
        var s = "<tr> <th>Party</th> <th>First class</th> <th>Second class</th> <th>Third class</th> <th>Total</th></tr>";
        for(key in p) {
            s += "<tr><td>" + p[key].party + "</td><td>" + p[key].counta + " ("+ p[key].perca.toFixed(1) +"%)</td><td>" + p[key].countb + " (" + p[key].percb.toFixed(1) + "%)</td><td>" + p[key].countc + " (" + p[key].percc.toFixed(1) + "%)</td><td>" + p[key].counts + "</td></tr>";
        }
        $(".party-perc-first").html(s);*/
            //s += "<tr><td>" + l[key].party + "</td><td>" + l[key].counta + "</td><td>" + l[key].countb + "</td><td>" + l[key].countc + "</td><td>" + l[key].counts + "</td></tr>";
