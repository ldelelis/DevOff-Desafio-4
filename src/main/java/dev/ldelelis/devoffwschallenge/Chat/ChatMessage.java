package dev.ldelelis.devoffwschallenge.Chat;

public class ChatMessage {
   private String content;
   private String sender;

   public ChatMessage() { }

   public ChatMessage(String content, String sender) {
       this.content = content;
       this.sender = sender;
   }

   public String getContent() {
       return this.content;
   }

   public String getSender() {
       return this.sender;
   }

   public void setContent(String content) {
       this.content = content;
   }

   public void setSender(String sender) {
       this.sender = sender;
   }
}