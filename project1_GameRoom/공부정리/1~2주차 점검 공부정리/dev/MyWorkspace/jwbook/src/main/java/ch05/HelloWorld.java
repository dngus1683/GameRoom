package ch05;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class HelloWorld
 */
/*현재 클래스가 서블릿 클래스라는 것을 컨테이너에 알리기 위해 @web Servlet 애너테이션이 사용된 것을 볼 수 있다*/ 																		 
/* 그리고 어떤 요청에 의해 서블릿을 호출할 것인지 결정하는 Url mapping 부분도 urlPatterns 속성으로 지정되어 있다.*/
@WebServlet(description = "My first servlet", urlPatterns = { "/hello" }) 
public class HelloWorld extends HttpServlet {								
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public HelloWorld() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    /*Get 요청을 처리하는 메서드로, request, response를 인자로한다. ServletException 과 IOException을 throws하고 있기 때문에 ㅎ호출하는 쪽에서 예외 처리를 해야 한다. */
    //
	//protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	//	// TODO Auto-generated method stub
	//	response.getWriter().append("Served at: ").append(request.getContextPath());/*response.getWriter() - java.io.PrintWriter 클래스 타입의 객체를 리턴한다.*/
	//																				/*request.getContextPath()- 웹 애플리케이션 경로를 리턴하는 메소드다.*/
	//}
	//수정해다
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("text/html;charset=utf-8");		//응답 콘텐츠 타입 설정과 한글 출력을 위해 respones.setContentType() 메서드 사용
		PrintWriter out = response.getWriter();		//PrintWriter는 출력 스트림을 클라이언트에 전달할 출력문 작성에 사용된다 //response.getWriter()로 출력 스트림을 가져온다.
			out.append("<!doctype html><html><head><title>Hello World Servlet</title></head><body>")
			.append("<h2>Hello World !!</h2><hr>")		//출력 스트림을 이용해 HTML 형식으로 데이터와 결합해 출력한다.
			.append("현재 날짜와 시간은: "+java.time.LocalDateTime.now())
			.append("</body></html>");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	/*POST 요청을 처리하는 메서드로 단순히 doGet()을  호출하도록 되어잇다. REST API 구현이 아닌 일반 서블릿 구현이라면 GET, POST를 내부적으로 동일하게 처리한다. */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
