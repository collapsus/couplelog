    function ma_draw (couplelog) {
        var paper = new Raphael(document.getElementById('asdf '+ couplelog.data.id));
        this.hecount = 0;
        this.shecount = 0;
        this.i = 0;
        this.j = 0;
        var _this = this;
        this.background = paper.set();
        this.background.push(
            paper.rect(10, 10, 400, 20),
            paper.rect(10, 40, 400, 20)
        );
        this.background.attr("fill", "#bbb");
        this.he = paper.rect(11, 11, 0, 18);
        this.she = paper.rect(11, 41, 0, 18);
        this.hetext = paper.text(420, 15, '').attr({fill: "blue"});
        this.shetext = paper.text(420, 45, '').attr({fill: "red"});
        this.hebutton = paper.rect(10, 70, 50, 20, 5);
        this.shebutton = paper.rect(70, 70, 50, 20, 5);
        this.background.attr({fill: "#aaa", stroke: 'black', 'stroke-width': 2});
        this.he.attr({fill: "blue", stroke: "none"});
        this.she.attr({fill: "red", stroke: "none"});
        this.hebutton.attr({fill: 'blue', stroke: 'none'});
        this.hebutton.node.onclick = function(){
            _this.hecount++;
            _this.Sync();
        };
        this.shebutton.attr({fill: 'red', stroke: 'none'});
        this.shebutton.node.onclick = function(){
            _this.shecount++;
            _this.Sync();
        };

    };
    
    ma_draw.prototype.Sync = function(){
        var isHeMax = this.hecount > this.shecount,
            counts = [this.hecount],
            forhe, forshe;
        counts[isHeMax ? 'unshift' : 'push'](this.shecount);
        this.hetext.attr("text", this.hecount);
        this.shetext.attr("text", this.shecount);

        if (isHeMax) {
            forhe = 1, forshe = (counts[0] / counts[1])
        } else {
            forshe = 1, forhe = (counts[0] / counts[1])                
        };
        this.he.attr("width", this.background[0].getBBox().width * forhe -2);
        this.she.attr("width", this.background[1].getBBox().width * forshe -2);

    };

