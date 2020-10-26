function reAuthPersonal(){
    fetch(authLink, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client_id: '54733',
            client_secret: '94390e3fb81c4de14d55c4983dc20388cbe628ef',
            refresh_token: '0cec6481e41265ed524b13a27262b3a4a74ee797',
            grant_type: 'refresh_token'
        })
    })
    .then(response => response.json())
        .then(response => getActivities(response))
}

function getActivities(res) {
    const activities_link = `https://www.strava.com/api/v3/athlete/activities?access_token=${res.access_token}&per_page=200`;
    fetch(activities_link)
        .then(res => res.json())
        .then(activityData => {
            const mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
            mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxlYy1odWFuZy1sYWJzIiwiYSI6ImNrZzgzNnR0bjBkOWUycHBtYWVrOWRwa24ifQ.XF-6fJrDm7L_LLQcnE-VOw';
            var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox/light-v10', tileSize: 512, zoomOffset: -1,detectRetina: true, attribution: mbAttr})
            var map = L.map('map', {
                center: [40.77508184, -73.9525795],
                zoom: 13,
                layers: [grayscale]
            });
            console.log(activityData.length)
            console.log(activityData)
            let numRuns = activityData.length;
            let paceArr = []
            for(let i = 0; i < activityData.length; i ++){
                let coordinates = L.Polyline.fromEncoded(activityData[i].map.summary_polyline).getLatLngs();
                L.polyline(
                    coordinates,{
                        color:"red",
                        weight: 1,
                        opacity: 0.25
                    }
                ).addTo(map)
                let distance = activityData[i].distance;
                let time = activityData[i].moving_time;
                paceArr.push([new Date(activityData[i].start_date), paceConverter(distance, time)])
            }
            //--------------------------
            let minDate = d3.min(paceArr, (d) => new Date(d[0]))
            let maxDate = d3.max(paceArr, (d) => new Date(d[0]))
        
            const cellMargin = 2;
            const cellSize = 20;

            //https://github.com/d3/d3-time-format
            let day = d3.timeFormat("%w"),
            week = d3.timeFormat("%U"),
            format = d3.timeFormat("%Y-%m-%d"),
            titleFormat = d3.utcFormat("%a, %m-%d"),
            monthName = d3.timeFormat("%B"),
            months = d3.timeMonth.range(d3.timeMonth.floor(minDate), maxDate);
            //minDate returns the smallest date, maxDate returns the largest date 
            console.log(months);    //returns the first day of everymonth in range
            const canvas = d3.select("#graph")
                                //svg for each month
                                .selectAll("svg")
                                .data(months)
                                .enter()
                                .append("svg")
                                .attr("class", "month")
                                .attr("height", ((cellSize * 7) + (cellMargin * 8) + 20))
                                .attr("width", function(d) {
                                    let columns = weeksInMonth(d);
                                    console.log(columns)
                                    return ((cellSize * columns) + cellMargin * (columns + 1));
                                })
                                //.append("g")
            canvas.append("text")
                    .attr("class", "name")
                    .attr("y", (cellSize * 7) + (cellMargin * 8) + 15 )
                    .attr("x", function(d) {
                        var columns = weeksInMonth(d);
                        return (((cellSize * columns) + (cellMargin * (columns + 1))) / 2);
                    })
                    .attr("text-anchor", "middle")
                    .text((d) => monthName(d))
            let rect = canvas.selectAll("rect")
                            //dataset is Array of the first days of every month
                            .data(function(d,i) {
                                console.log(d3.timeDays(d, new Date(d.getFullYear(), d.getMonth()+1, 1)))
                                return d3.timeDays(d, new Date(d.getFullYear(), d.getMonth()+1, 1))
                            })
                            .enter()
                            .append("rect")
                            .attr("class", "day")
                            .attr("width", cellSize).attr("height", cellSize)
                            .attr("rx", 3).attr("ry", 3)
                            .attr("fill", '#eaeaea')
                            .attr("y", (d) => (day(d) * cellSize) + 
                                            (day(d) * cellMargin) + cellMargin) //day(d) will get you 0(sunday) -> 6(saturday)
                            .attr("x", (d) => ((week(d) - week(new Date(d.getFullYear(),d.getMonth(),1))) * cellSize) + 
                                            ((week(d) - week(new Date(d.getFullYear(),d.getMonth(),1))) * cellMargin) + cellMargin)
                            .on("mouseover", function(d) {
                                d3.select(this).classed('hover', true)
                            })
                            .on("mouseout", function(d) {
                                d3.select(this).classed('hover', false);
                            })
                            .datum(format)
            rect.append("title")
                .text((d) => titleFormat(new Date(d)))
            
            var lookup = d3.nest()
                            .key((d) => format(new Date(d[0])))
                            .rollup(function(d) { return d3.mean(d, (d) => d[1])})
                            .object(paceArr)
            console.log(lookup)
            console.log(Object.values(lookup))
            //object with dates as properties and speed as values

            const fastest =  Math.floor(Math.min(...Object.values(lookup)));
            const slowest = Math.ceil(Math.max(...Object.values(lookup)));

            //console.log(d3.extent(Object.values(lookup)))
            var scale = d3.scaleLinear()
                             .domain([fastest, slowest])
                             .range([0,255]);
            rect.filter(function(d) {
                    //console.log(d in lookup); 
                    return d in lookup;
                })
                .style("fill", function(d) { 
                    console.log(`${scale(lookup[d])}`);
                    return speedColor(scale(lookup[d])); 
                })
                .select("title")
                .text(function(d) { return titleFormat(new Date(d)) + "\n" +  numToMins(lookup[d]) + " min/mile"; });    
            
            //For the min, you round down. For the max, you round up
            // const fastest =  Math.ceil(Math.min(...Object.values(lookup)));
            // const slowest = Math.ceil(Math.max(...Object.values(lookup)));
            console.log(fastest, slowest)
            let keyArr = [];
            for (let i = slowest; i >= fastest; i--){
                keyArr.push([(i-fastest), i])
            }
            console.log(keyArr)

            const keyCanvas = d3.select("#key")
                                .append("svg")
                                .attr("width", 150)
                                .attr("height", 100)
            
            keyCanvas.selectAll("text")
                                .data(keyArr)
                                .enter()
                                .append("text")
                                .attr("class", "name")
                                .attr("fill", "black")
                                .attr("y", 70)
                                .attr("x", (d) => cellSize/2 + (d[0] * cellSize) + (d[0] * cellMargin) + cellMargin)
                                .text((d) => d[1])
                                .attr("text-anchor", "middle")
                                
            let keyRect = keyCanvas.selectAll("rect")
                                    .data(keyArr)
                                    .enter()
                                    .append("rect")
                                    .attr("width", cellSize).attr("height", cellSize)
                                    .attr("fill", (d) => {
                                        return speedColor(scale(d[1]))
                                    })  
                                    .attr("x", (d) => (d[0] * cellSize) + (d[0] * cellMargin) + cellMargin)
                                    .attr("y", 30)
                                    .attr("rx", 3).attr("ry", 3)
                                    .on("mouseover", function(d) {
                                        d3.select(this).classed('hover', true)
                                    })
                                    .on("mouseout", function(d) {
                                        d3.select(this).classed('hover', false);
                                    })  
            keyRect.append("title")
                    .text((d) => `${d[1]} min/mile`)
                                         
            keyCanvas.append("text")
                        .attr("class", "name") 
                        .attr("y", 20)       
                        .attr("x", ((keyArr.length * cellSize) + (keyArr.length * cellMargin) + cellMargin) / 2)
                        .text("Pace (Min/Mile)")    
                        .attr("text-anchor", "middle")
            
    });
}
reAuthPersonal();
