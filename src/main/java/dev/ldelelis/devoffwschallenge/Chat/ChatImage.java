package dev.ldelelis.devoffwschallenge.Chat;

public class ChatImage {
    private String sender;
    private String base64Image;
    
    public ChatImage() { }

    public ChatImage(String sender, String base64Image) {
        this.sender = sender;
        this.base64Image = base64Image;
    }

    public String getSender() {
        return this.sender;
    }

    public String getBase64Image() {
        return this.base64Image;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public void setBase64Image(String base64Image) {
        this.base64Image = base64Image;
    }
}