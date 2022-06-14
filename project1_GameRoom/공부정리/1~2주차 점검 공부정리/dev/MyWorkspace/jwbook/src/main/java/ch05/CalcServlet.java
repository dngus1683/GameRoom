package ch05;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class CalcServlet
 */
@WebServlet(description = "Simplt calculator", urlPatterns = { "/calc" })
public class CalcServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CalcServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		int n1 = Integer.parseInt(request.getParameter("n1"));	/*HTML <form>에서 입력한 파라미터는 Query String 으롤 서블릿에 전달되며 doGet() 메소드의 인자인 request의 getParameter()를 통해 참조할 수 있다*/
		int n2 = Integer.parseInt(request.getParameter("n2"));	/*request.getParameter()는 리턴값이 문자열이므로 연산을 위해서는 다시 숫자로 변환하는 과정 필요.*/
		String op = request.getParameter("op");
		
		long result = 0;
		
		switch (request.getParameter("op")) {
		case "+": result = n1+n2; break;
		case "-": result = n1-n2; break;
		case "*": result = n1*n2; break;
		case "/": result = n1/n2; break;
		}
		response.setContentType("text/html; charset=utf-8");
		PrintWriter out = response.getWriter();
		out.append("<html><body><h2>계산기 서블릿</h2><hr>")
		.append("계산 결과: " + result + "</body></html>");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
