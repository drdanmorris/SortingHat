var bandit = {};

(function() {

    var animateTablo = 3000;
    var matrix = [
        [],
        [],
        []
    ];


    function spin() {

        var dataTablo = [
            [],
            [],
            []
        ];

        var matrix = [
            [randomMatrix(), randomMatrix(), randomMatrix()],
            [randomMatrix(), randomMatrix(), randomMatrix()],
            [randomMatrix(), randomMatrix(), randomMatrix()]
        ];

        $('.tablo1').html('<span class="tablo1img"></span>');
        $('.tablo2').html('<span class="tablo2img"></span>');
        $('.tablo3').html('<span class="tablo3img"></span>');

        var col1 = $('.tablo1img');
        var col2 = $('.tablo2img');
        var col3 = $('.tablo3img');

        for (var i = 0; i < 45; i++) {
            dataTablo[0].push(randomMatrix());
            dataTablo[1].push(randomMatrix());
            dataTablo[2].push(randomMatrix());
        }

        for (var i = 0; i <= 2; i++) {
                dataTablo[i].push(matrix[i][0],matrix[i][1],matrix[i][2]);
        }

        for (var i = 0; i < dataTablo[0].length; i++) {
            col1.append('<span class="potter img' + dataTablo[0][i] + '">&nbsp;</span>');
            col2.append('<span class="potter img' + dataTablo[1][i] + '">&nbsp;</span>');
            col3.append('<span class="potter img' + dataTablo[2][i] + '">&nbsp;</span>');
        }

        $(".tablo1img").stop().animate({
            marginTop: '-6500'
        }, 3000);
        $(".tablo2img").stop().animate({
            marginTop: '-6500'
        }, 3700);
        $(".tablo3img").stop().animate({
            marginTop: '-6500'
        }, 4200);

    }


    function randomMatrix() {
        return Math.round(Math.random() * 5);
    }

    bandit.spin = spin;


}());