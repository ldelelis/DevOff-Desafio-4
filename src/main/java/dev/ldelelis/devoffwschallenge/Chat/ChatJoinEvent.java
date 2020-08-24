package dev.ldelelis.devoffwschallenge.Chat;

public class ChatJoinEvent {
    private String joinedUser;

    public ChatJoinEvent() {}

    public ChatJoinEvent(String joinedUser) {
        this.joinedUser = joinedUser;
    }

    public String getJoinedUser() {
        return this.joinedUser;
    }
    
    public void setJoinedUser(String joinedUser) {
        this.joinedUser = joinedUser;
    }
}