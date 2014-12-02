package ws.app;
 
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;
import org.apache.catalina.websocket.WsOutbound;
 
@WebServlet(urlPatterns={"/DrawServlet"})
public class DrawServlet extends WebSocketServlet{
    private static final long serialVersionUID = 1L;
    private static List<DrawMessageInbound> messageList = new ArrayList<DrawMessageInbound>();
 
    private class DrawMessageInbound extends MessageInbound{
        WsOutbound drawOutbound;
 
        // �ڑ����̏���
        @Override
        public void onOpen(WsOutbound outbound){
            System.out.println("open");
            this.drawOutbound = outbound;
            messageList.add(this);
        }
 
        // �ڑ��������̏���
        @Override
        public void onClose(int status){
            System.out.println("close");
            messageList.remove(this);
        }
 
        // ���b�Z�[�W��M���̏���
        @Override
        public void onTextMessage(CharBuffer message) throws IOException{
            System.out.println("message"+ message);
            for(DrawMessageInbound in: messageList){
                CharBuffer buffer = CharBuffer.wrap(message);
                in.drawOutbound.writeTextMessage(buffer);
                in.drawOutbound.flush();
            }
        }
 
        // ���b�Z�[�W��M���̏���
        @Override
        public void onBinaryMessage(ByteBuffer bb) throws IOException{
        }
    }
 
    @Override
    public StreamInbound createWebSocketInbound(String arg0, HttpServletRequest arg1) {
        return new DrawMessageInbound();
    }
}