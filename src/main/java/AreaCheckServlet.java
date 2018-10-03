import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

    }

    private boolean check(double X, double Y, double R) {
        if (X > 0 && Y > 0 && Y < -2 * X + R) {
            return true;
        } else if (X < 0 && Y < 0 && Y > -R && X > -R / 2) {
            return true;
        } else if (X > 0 && Y < 0 && Math.hypot(X, Y) < R / 2) {
            return true;
        }
        return false;
    }
}
