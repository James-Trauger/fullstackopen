```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: Browser executes form.onsubmit function

    browser->>server: POST {"content":"spa","date":"2025-01-08T18:11:09.272Z"} <br/>https://studies.cs.helsinki.fi/exampleapp/new_note_spa<br/>
    activate server
    server-->>browser: 201 {"message":"note created"}
    deactivate server

    Note right of browser: Browser executes redrawNotes() function

```