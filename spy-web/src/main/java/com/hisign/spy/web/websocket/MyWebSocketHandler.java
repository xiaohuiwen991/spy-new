package com.hisign.spy.web.websocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

/**
 * 事件处理监听
 * @author wangping
 * @version 1.0
 * @since 2016/5/23 13:54
 */
@Component
public class MyWebSocketHandler extends TextWebSocketHandler {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        logger.info("handleTextMessage: {}", session.getId());
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session)
            throws Exception {
        // 与客户端完成连接后调用
        //获取连接的唯一session id
        String sessionID = session.getId();

        //获取客户端ip地址
        String clientIp = session.getRemoteAddress().getAddress().getHostAddress();
        logger.info("afterConnectionEstablished: {}, clientIp:{}", sessionID, clientIp);

    }

    @Override
    public void handleTransportError(WebSocketSession session,
                                     Throwable exception) throws Exception {
        // 消息传输出错时调用
        System.out.println("handleTransportError");
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session,
                                      CloseStatus closeStatus) throws Exception {
        // 一个客户端连接断开时关闭
        logger.info("afterConnectionClosed！sessionId:{}", session.getId());
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }

}
