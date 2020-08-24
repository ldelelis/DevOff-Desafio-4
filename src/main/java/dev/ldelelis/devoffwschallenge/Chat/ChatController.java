package dev.ldelelis.devoffwschallenge.Chat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/chat")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }

    @MessageMapping("/chat.joinUser")
    @SendTo("/topic/chat/join")
    public ChatJoinEvent joinUser(@Payload ChatJoinEvent chatJoin) {
        return chatJoin;
    }

    @MessageMapping("/chat.leaveUser")
    @SendTo("/topic/chat/leave")
    public ChatLeaveEvent leaveUser(@Payload ChatLeaveEvent chatLeave) {
        return chatLeave;
    }

    @MessageMapping("/chat.sendImage")
    @SendTo("/topic/chat")
    public ChatImage sendImage(@Payload ChatImage chatImage) {
        return chatImage;
    }
}