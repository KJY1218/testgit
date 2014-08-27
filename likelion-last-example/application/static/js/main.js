$(function() {
    var pusher = new Pusher(PUSHER_KEY),
        testChannel =pusher.subscribe('your-app-name'),
        $messages = $('.messages'),
        $inputMessage = $('.inputMessage'),
        chatPage = $('.chat.page');

    /*
    $.ajax({
      type: "POST",
      url: url,
      data: data,
      success: success,
      dataType: dataType
    });
    */

    var initial_delay = 1500;
    setTimeout(function () {
        addChatMessage({'username':'user1', 'message':'hello?'});
    },initial_delay + 500)
    setTimeout(function () {
        addChatMessage({'username':'user2', 'message':'HELLO?'});
    },initial_delay + 1000)
    setTimeout(function () {
        addChatMessage({'username':'user2', 'message':'I know who you are'});
    },initial_delay + 1500)
    setTimeout(function () {
        addChatMessage({'username':'user1', 'message':'?????????'});
    },initial_delay + 2000)

    testChannel.bind('echo', function(data) {
        data['username'] = "Your Name";
        addChatMessage(data);
    });

    setTimeout(function () {
        $.post('/api/echo', {"message":"Hello World!"});
    },initial_delay +  4000)
    setTimeout(function () {
        $.post('/api/echo', {"message":"I love Chicken"});
    },initial_delay +  5000)
    setTimeout(function () {
        $.post('/api/echo', {"message":"Where is Chicken"});
    },initial_delay +  6000)
    setTimeout(function () {
        $.post('/api/echo', {"message":"We need Chiecken Now!"});
    },initial_delay +  7000)

    function addChatMessage(data) {
        var $usernameDiv = $('<span class="username"></span>');
        $usernameDiv.css("color", getUsernameColor(data.username));
        $usernameDiv.text(data.username);

        var $messageBodyDiv = $('<span class="messageBody"></span>');
        $messageBodyDiv.text(data.message);

        var typingClass = data.typing ? 'typing' : '';
        var $messageDiv = $('<li class="message ' + typingClass + '"></li>');
        $messageDiv.append($usernameDiv)
            .append($messageBodyDiv)
            .data('username', data.username);

        addMessageElement($messageDiv);
    }

    function addMessageElement(el) {
        var $el = $(el);
        $messages.append($el);

        $messages[0].scrollTop = $messages[0].scrollHeight;
    }

    function getUsernameColor(username) {
        // Compute hash code
        var hash = 7;
        for (var i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + (hash << 5) - hash;
        }
        // Calculate color
        var index = Math.abs(hash % 360);
        return "hsl(" + index + ", 77%, 60%)";
    }
});