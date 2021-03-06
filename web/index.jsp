<%@ page import="java.util.ArrayList" %>
<%@ page import="javax.servlet.http.HttpSession" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="ru">
<head>
    <title>ПИП</title>
    <link href="img/logo.png" rel="shortcut icon" type="image/x-icon">
    <link href="style.css" rel="stylesheet" type="text/css">
    <script src="jquery-3.3.1.min.js" defer></script>
    <script src="script.js" defer></script>
    <meta name="description" content="Лабораторная работа по программированию интернет приложений">
    <meta charset="utf-8">

</head>

<body>
<div class="header">
    <div id="logo">
        <img src="img/logo.png" alt="Логотип ВТ">
    </div>
    <div id="author">
        <p>Прокопьев Александр и Вязников Иван</p>
    </div>

    <div id="group">
        <p>Группа P3212</p>
    </div>
    <div id="variant">
        <p>Вариант 21218</p>
    </div>

</div>
<div class="main">
    <div id="task_text">
        <p id="text">Разработать веб-приложение на базе сервлетов и JSP, определяющее попадание точки
            на координатной плоскости в заданную область.

            Приложение должно быть реализовано в соответствии с шаблоном MVC и состоять из следующих элементов:</p>

        <ul>
            <li>ControllerServlet, определяющий тип запроса, и, в зависимости от того, содержит ли
                запрос информацию о координатах точки и радиусе, делегирующий его обработку одному
                из перечисленных ниже компонентов. Все запросы внутри приложения должны
                передаваться этому сервлету (по методу GET или POST в зависимости от варианта
                задания), остальные сервлеты с веб-страниц напрямую вызываться не должны.
            </li>
            <li>AreaCheckServlet, осуществляющий проверку попадания точки в область на
                координатной плоскости и формирующий HTML-страницу с результатами проверки.
                Должен обрабатывать все запросы, содержащие сведения о координатах точки и радиусе
                области.
            </li>
            <li>Страница JSP, формирующая HTML-страницу с веб-формой. Должна обрабатывать все
                запросы, не содержащие сведений о координатах точки и радиусе области.
            </li>
        </ul>
    </div>
    <div id="task_area">
        <img src="img/area.png" id="area" alt="Task area">
    </div>
</div>
<div class="main">
    <div class="io">
        <div class="data_input">
            <form id="calculate" method="GET">
                <div class="elements">
                    <div id="X_input">
                        <label><span>Величина X</span>
                            <input type="radio" name="X" value="-2">-2
                            <input type="radio" name="X" value="-1.5">-1.5
                            <input type="radio" name="X" value="-1">-1
                            <input type="radio" name="X" value="-0.5">-0.5
                            <input type="radio" name="X" value="0">0
                            <input type="radio" name="X" value="0.5">0.5
                            <input type="radio" name="X" value="1">1
                            <input type="radio" name="X" value="1.5">1.5
                            <input type="radio" name="X" value="2">2
                        </label><br>
                        <p class="ok_comment" id="X_comment">Значение X не выбрано</p>
                    </div>
                    <div id="Y_input">
                        <label><span>Величина Y</span>
                            <input type="text" name="Y" placeholder="Значение от -3 до 5" id="y">
                        </label><br>
                        <p class="ok_comment" id="Y_comment">Значение Y не корректно</p>
                    </div>
                    <div id="R_input">
                        <label><span>Величина R</span>
                            <input type="text" name="R" placeholder="Значение от 1 до 4" id="r">
                        </label>
                        <p class="ok_comment" id="R_comment">Значение R не выбрано</p>
                    </div>
                </div>
                <div class="send">
                    <input type="submit" id="send" class="btn" value="Проверить">
                </div>
            </form>
        </div>
        <div id="script_output">
            <table id="table_result">
                <caption>Результат работы скрипта</caption>
                <thead>
                <tr>
                    <td>X</td>
                    <td>Y</td>
                    <td>R</td>
                    <td>Попадание</td>
                </tr>
                </thead>
                <% ArrayList<double[]> params = (ArrayList<double[]>) request.getSession().getAttribute("params");
                if (params != null) {
                for (double[] result : params) {%>
                <tr>
                <td><%=result[0]%>
                </td>
                <td><%=result[1]%>
                </td>
                <td><%=result[2]%>
                </td>
                <td><%=result[3] == 1 ? "+" : "-"%>
                </td>
                </tr>
                <% }
                } %>
            </table>
        </div>
    </div>
    <div id="computed_result">
        <canvas id="result"></canvas>
    </div>
</div>
<div class="main" id="footer">
    <p id="educator">Письмак А.Е.</p>
    <p id="info">Санкт-Петербург 2018 год</p>
</div>
<div id="warning">
    <p>Радиус области ещё не задан<br>Введите значение в поле R</p>
</div>
</body>
</html>
