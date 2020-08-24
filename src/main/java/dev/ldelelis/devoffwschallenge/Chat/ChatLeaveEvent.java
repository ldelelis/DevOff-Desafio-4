package dev.ldelelis.devoffwschallenge.Chat;

public class ChatLeaveEvent {
    private String leftUser;

    public ChatLeaveEvent() { }

    public ChatLeaveEvent(String leftUser) {
        this.leftUser = leftUser;
    }

    public String getLeftUser() {
        return this.leftUser;
    }
}