(function(window, document, undefined) {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var body = document.getElementsByTagName('body');
    var canvasContainer = document.getElementById('animation');
    var Dots = new Array();
    var totalDots = 20;
    var minDistance = 50;
    var gravity = 0.0001;

    console.log(body);
    /*
    Funzione che inizializza globalmente le variabili principali dei punti: 
    x e y = sono le posizione di nascita del punto
    vx e vy = rappresentano la velocità per lo spostamento orizzontale e verticale
    r = rappresenta un valore random del raggio del punto che viene generato
    c = il colore dei punti
    */ 
    function Dot() {
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.r = 2 + 2 * Math.random();
        this.c = 0x86A4C1;

        this.reset();
    }

    Dot.prototype.reset = function() {
        /*Randomizzazione della posizione dei punti eseguita nel range indicato fra larghezza e altezza*/
        this.x = (Math.random() * width);
        this.y = (Math.random() * height);

        var rand = Math.random();
        /*Randomizzo la velocità dello spostamento verso destra di ciascun punto*/
        this.vx = (2 * Math.random) / this.r; 

        /* Se la variabile rand dovesse essere maggiore di 0.5 (c'è quindi un 50% di possibilità), inverte la direzione del punto e quindi andrà verso sinistra */
        if(rand > 0.5) {
            this.vx = 1 * this.vx;
        }
        
        rand = Math.random();
        /* Randomizzo la velocità dello spostamento verso il basso di ciascun punto */
        this.vy = (2 * Math.random()) * 2 / this.r;

        /* Se la variabile rand dovesse essere maggiore di 0.5 (c'è quindi un 50% di possibilità) inverte la direzione del punto che andrà quindi verso l'alto */
        if(rand > 0.5 ) {
            this.vy = -1 * this.vy;
        }
    }

    /* Questo prototipo si occupa di gestire ilo "respawn" dei punti. In realtà un punto quando esce da un lato della finestra è impostato in modo tale da riapparire sulla parte opposta, dando l'idea quindi che si tratti di un nuovo punto */ 
    Dot.prototype.collisionCheck = function() {
        if(this.x < 0) this.x = width;
        if(this.x > width) this.x = 0;

        if(this.y < 0 ) this.y = height;
        if(this.y > width) this.y = 0;
    }

    /* Per ogni punto specificato in totalDots, ne creo uno nuovo e lo inserisco nell'array */
    for (var i = 0; i < totalDots; i++) {
        var dot = new Dot();
        Dots.push(dot);
    }


    function distance (x1,y1, x2,y2) {
        var xdiff = x1 - x2; // Differenza di posizione tra la x di un punto e la x di un altro
        var ydiff = y1 - y2;

        return Math.sqrt(xdiff * xdiff + ydiff * ydiff) // Teorema di pitagora
    }

    function drawDot(graphics, dot) {
        graphics.beginFill(dot.c, 1.0);
        graphics.drawCircle(dot.x, dot.y, dot.r);
        graphics.endFill();
    }


    /* Creo la canvas di PIXI */
    var renderer = PIXI.autoDetectRenderer(width, height, {
        'transparent': true,
        'autoResize': true,
        'antialias': true,
    });

    // add the renderer view element to the DOM
    document.getElementById("animation").appendChild(renderer.view);


    /*
    Il metodo requestAnimationFrame() comunica al browser che desidero creare un'animazione e quindi gli chiedo di chiamare una specifica funzione per aggiornare tale animazione effettuando un "repaint" per ogni update. Il metodo prende un argomento come callback che voglio invocare prima del repaint.
    Il callback è un parametro che specifica una funziona da chiamare quando è il momento di aggiornare la tua animazione per il prossimo repaint. Il callback ha un singolo aromen to, una DOMHighResTimeStamp che indica l'ora corrente da quando requestaAnimationFrame è partito. 
    */
    requestAnimationFrame(animate);

    // Graphics è una classe che contiene dei metodi usati per disegnare delle forme primitive, come linee, cerchi e rettangoli da mostrare e da colorare e riempire 
    var graphics = new PIXI.Graphics();

    function animate() {
        // il metodo clear rimuove tutti gli elementi in un set di oggetti. Fa sì che ad ogni aggiornamento dell'animazione, il browser cancelli il disegno di quella precedente. 
        graphics.clear();

        for(var i = 0; i < Dots.length; i++) {
            var dot1 = Dots[i];

            // Assegno alla variabile thisDot il metodo collisionCheck cosi da gestire la ricomparsa dei punti quando spariscono dalla finestra del browser
            dot1.collisionCheck();

            // Lancio la funzione per disegnare i punti sulla canvas
            drawDot(graphics, dot1);


        for (var j = i + 1; j < Dots.length; j++) {
            var dot2 = Dots[j];

            var x1 = dot1.x;
            var x2 = dot2.x;
            var y1 = dot1.y;
            var y2 = dot2.y;

            var dist = distance(x1, y1, x2, y2);

            if (dist <= minDistance) {
            var normalizedDist = dist / minDistance;
            
            var lineWidth = (dot1.r + dot2.r) * 0.3 / (2 * Math.sqrt(normalizedDist) + 0.00001);
            var alpha = 1.0 - (normalizedDist * normalizedDist);

            graphics.lineStyle(lineWidth, dot.c, alpha);
            
            var x1r = (0.5 + x1) << 0;
            var y1r = (0.5 + y1) << 0;
            var x2r = (0.5 + x2) << 0;
            var y2r = (0.5 + y2) << 0;
            
            graphics.moveTo(x1r, y1r);
            graphics.lineTo(x2r, y2r);
            
            var x1next = dot1.x + dot1.vx;
            var y1next = dot1.y + dot1.vy;
            var x2next = dot2.x + dot2.vx;
            var y2next = dot2.y + dot2.vy;
            var distnext = distance(x1next, y1next, x2next, y2next);
            if (distnext <= dist) {
                // dots are getting closer
                dot1.x += gravity * dot2.r * x2 * Math.pow(normalizedDist, 2);
                dot2.x += gravity * dot1.r * x1 * Math.pow(normalizedDist, 2);
                dot1.y += gravity * dot2.r * y2 * Math.pow(normalizedDist, 2);
                dot2.y += gravity * dot1.r * y1 * Math.pow(normalizedDist, 2);
            } else {
                dot1.x -= gravity * dot2.r * x2 * Math.pow(normalizedDist, 2);
                dot2.x -= gravity * dot1.r * x1 * Math.pow(normalizedDist, 2);
                dot1.y -= gravity * dot2.r * y2 * Math.pow(normalizedDist, 2);
                dot2.y -= gravity * dot1.r * y1 * Math.pow(normalizedDist, 2);
            }
            } // fine if distance
        } // fine for dot2

        dot1.y += dot1.vy;
        dot1.x += dot1.vx;
        } // fine for dot1

        // render the stage   
        renderer.render(graphics);

        requestAnimationFrame(animate);
  }
}(window, document));