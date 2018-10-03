document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('r').addEventListener('input', function () {
        if (checkR(false)) draw();
    });


    document.getElementById('send').addEventListener('click', check);

    let canvas = document.getElementById('result');
    canvas.width = 1000;
    canvas.height = 1000;
    let width = window.getComputedStyle(document.getElementById('computed_result')).width;
    // document.getElementById('computed_result').height = width;
    // console.log(window.getComputedStyle(document.getElementById('computed_result')).width);
    console.log("default = " + width);
    //canvas.width = width;
    // canvas.height = width;
    // console.log(" width = " + canvas.width + " height = " + canvas.height);
});


let x, y, r;

function check(btn) {
    btn.preventDefault();

    if (checkR() & checkX() & checkY()) compute();
}

function checkY() {
    let passed = true;
    let min = -3;
    let max = 5;
    y = document.getElementById("y").value;
    y = y.replace(",", ".");
    if (isNaN(y) || Number(y) <= min || Number(y) >= max || y === '') {
        document.getElementById("Y_input").classList.add("error");
        document.getElementById("Y_comment").classList.replace("ok_comment", "error_comment");
        passed = false;
    }
    else {
        document.getElementById("Y_input").classList.remove("error");
        document.getElementById("Y_comment").classList.replace("error_comment", "ok_comment");
    }
    return passed;
}

function checkX() {
    let passed = true;
    let xArr = document.getElementsByName("X");
    let xChecked = Array.from(xArr).some(function (item) {
        if (item.checked) {
            x = item.value;
            return true;
        }
    });
    if (!xChecked) {
        document.getElementById("X_input").classList.add("error");
        document.getElementById("X_comment").classList.replace("ok_comment", "error_comment");
        passed = false;
    }
    else {
        document.getElementById("X_input").classList.remove("error");
        document.getElementById("X_comment").classList.replace("error_comment", "ok_comment");
    }
    return passed;
}

function checkR(change = true) {
    let passed = true;
    let min = 1;
    let max = 4;
    let R = document.getElementById("r").value;
    R = R.replace(",", ".");
    if (isNaN(R) || Number(R) <= min || Number(R) >= max || R === '') {
        if (change) {
            document.getElementById("R_input").classList.add("error");
            document.getElementById("R_comment").classList.replace("ok_comment", "error_comment");
        }
        passed = false;
    }
    else {
        document.getElementById("R_input").classList.remove("error");
        document.getElementById("R_comment").classList.replace("error_comment", "ok_comment");
    }
    if (passed) {
        r = R;
        let canvas = document.getElementById('computed_result');
        canvas.addEventListener('click', function (event) {
            console.log("click X = " + event.pageX + "\nclick Y = " + event.pageY + "\nscroll X = "
                + window.pageXOffset + "\nscroll Y = " + window.pageYOffset
                + "\n canvas X = " + canvas.getBoundingClientRect().left + "\n canvas Y = " + canvas.getBoundingClientRect().top);
            let X = event.pageX - canvas.getBoundingClientRect().left;
            let Y = event.pageY - (canvas.getBoundingClientRect().top + window.pageYOffset);
            console.log(" draw X = " + X + " draw Y = " + Y);
            drawDot(X, Y);
        });
    }
    return passed;
}

function draw() {
    let canvas = document.getElementById("result");
    let context = canvas.getContext("2d");
    let width = canvas.width;
    let height = canvas.height;
    drawArea(canvas, context, width, height);
    drawLines(canvas, context, width, height);
}

function drawLines(canvas, context, width, height) {
    context.fillStyle = "black";
    context.font = "normal normal normal 16px arial";
    context.beginPath();
    context.moveTo(width / 2, height);
    context.lineTo(width / 2, 0);
    context.fillText("  Y", width * 0.52, height * 0.03);
    context.lineTo(width / 2 - width * 0.01, width * 0.03);
    context.moveTo(width / 2, 0);
    context.lineTo(width / 2 + width * 0.01, width * 0.03);
    context.moveTo(0, height / 2);
    context.lineTo(width, height / 2);
    context.fillText("X", width * 0.97, height * 0.53);
    context.lineTo(width - width * 0.03, height / 2 - height * 0.01);
    context.moveTo(width, height / 2);
    context.lineTo(width - width * 0.03, height / 2 + height * 0.01);

    context.moveTo(width * 0.1, height / 2 + height * 0.01);
    context.lineTo(width * 0.1, height / 2 - height * 0.01);
    context.fillText(-r, width * 0.1, height * 0.53);

    context.moveTo(width * 0.3, height / 2 + height * 0.01);
    context.lineTo(width * 0.3, height / 2 - height * 0.01);
    context.fillText(-r / 2, width * 0.3, height * 0.53);

    context.fillText(0, width * 0.51, height * 0.53);

    context.moveTo(width * 0.7, height / 2 + height * 0.01);
    context.lineTo(width * 0.7, height / 2 - height * 0.01);
    context.fillText(r / 2, width * 0.7, height * 0.53);

    context.moveTo(width * 0.9, height / 2 + height * 0.01);
    context.lineTo(width * 0.9, height / 2 - height * 0.01);
    context.fillText(r, width * 0.9, height * 0.53);

    context.moveTo(width / 2 + width * 0.01, height * 0.1);
    context.lineTo(width / 2 - width * 0.01, height * 0.1);
    context.fillText(r, width * 0.53, height * 0.1);

    context.moveTo(width / 2 + width * 0.01, height * 0.3);
    context.lineTo(width / 2 - width * 0.01, height * 0.3);
    context.fillText(r / 2, width * 0.53, height * 0.3);

    context.moveTo(width / 2 + width * 0.01, height * 0.7);
    context.lineTo(width / 2 - width * 0.01, height * 0.7);
    context.fillText(-r / 2, width * 0.53, height * 0.7);

    context.moveTo(width / 2 + width * 0.01, height * 0.9);
    context.lineTo(width / 2 - width * 0.01, height * 0.9);
    context.fillText(-r, width * 0.53, height * 0.9);

    context.closePath();
    context.strokeStyle = "black";
    context.stroke();
}

function drawArea(canvas, context, width, height) {
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#3399ff";
    context.fillRect(width * 0.3, height / 2, width * 0.2, height * 0.4);
    context.beginPath();
    context.moveTo(width * 0.5, height * 0.1);
    context.lineTo(width * 0.7, height * 0.5);
    context.lineTo(width * 0.5, height * 0.5);
    context.fill();
    context.beginPath();
    context.arc(width / 2, height / 2, width * 0.2, Math.PI, 0, true);
    context.fill();
}

function drawDot(X, Y) {
    let canvas = document.getElementById("result");
    let context = canvas.getContext("2d");
    let radius = canvas.width / 100;
    let red = Math.random() * 255;
    let green = Math.random() * 255;
    let blue = Math.random() * 255;
    context.fillStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    let blockWidth = parseInt(window.getComputedStyle(document.getElementById('computed_result')).width);
    X = X / blockWidth * canvas.width;
    Y = Y / blockWidth * canvas.height;
    console.log("X = " + X + " Y = " + Y);
    context.fillRect(X, Y, radius, radius);
}

function compute() {
    drawDot();
    $.ajax({
        url: 'handler.php',
        type: 'GET',
        data: {X: x, Y: y, R: r},
        success: function (data) {
            console.log(x + " " + y + " " + r + ";\n");
            let table = $(document).find("#table_result");
            let currentTime = data.split("\n")[0];
            let leadTime = data.split("\n")[1];
            let result = data.split("\n")[2];
            let au = new Audio();
            if (result === "true") au.src = 'sound/true.mp3';
            else au.src = 'sound/false.mp3';
            au.play();
            let row = $("<tr/>");
            row.append($('<td/>').text(x));
            row.append($('<td/>').text(y));
            row.append($('<td/>').text(r));
            row.append($('<td/>').text(currentTime));
            row.append($('<td/>').text(leadTime));
            row.append($('<td/>').text(result));
            table.append(row);
        },
        error: function () {
            let table = $(document).find("#table_result");
            let row = $("<tr/>");
            let cell = $("<td colspan='6'/>").text("Произошла ошибка");
            row.append(cell);
            table.append(row);
        }
    });
}
