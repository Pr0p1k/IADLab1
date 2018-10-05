import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class AreaCheckServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private ArrayList<double[]> params = null;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (request.getSession().getAttribute("params") == null) {
            params = new ArrayList<>();
            request.getSession().setAttribute("params", params);
        } else {
            params = (ArrayList<double[]>) request.getSession().getAttribute("params");
        }
        try {
            double[] set = new double[4];
            set[0] = Double.parseDouble(request.getParameter("X"));
            set[1] = Double.parseDouble(request.getParameter("Y"));
            set[2] = Double.parseDouble(request.getParameter("R"));
            set[3] = checkArea(set[0], set[1], set[2]) ? 1 : 0;
            params.add(set);
        } catch (Exception exc) {
            System.out.println(exc.getMessage());
            System.out.println(exc.getStackTrace());
            request.getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
        }


        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        String head = "<!DOCTYPE HTML> <html> <head> <meta charset='UTF-8'> <title>Points</title>" + "</head> <body>";
        String tableHeader = "<br> <table id=\"output\">" +
                "<thead><tr><td>X</td><td>Y</td><td>R</td><td>Inside</td></tr></thead>";
        String Footer = "</table></body></body>";
        out.print(head + tableHeader);
        out.printf("<tr><td>%f</td><td>%f</td><td>%f</td><td id=\"answer\">%s</td></tr>",
                params.get(params.size() - 1)[0],
                params.get(params.size() - 1)[1],
                params.get(params.size() - 1)[2],
                params.get(params.size() - 1)[3] == 1 ? "+" : "-");
        out.print(Footer);
    }

    private boolean checkArea(double X, double Y, double R) {
        if (X > 0 && Y > 0 && Y < -2 * X + R) {
            return true;
        } else if (X < 0 && Y < 0 && Y > -R && X > -R / 2) {
            return true;
        } else if (X > 0 && Y < 0 && Math.hypot(X, Y) < R / 2) {
            return true;
        }
        return false;
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.sendRedirect("/control");
    }

}
