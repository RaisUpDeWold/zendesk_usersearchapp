$(function () {
  var client = ZAFClient.init();
  client.invoke('resize', { width: '100%', height: '400px' });

  showStart();

  $('#get-tasks').click(function() {
    getTaskData(client);
  });
});

function showStart() {
  switchTo('start-hdbs');
}

function getTaskData(client) {
  var settings = {
    url: 'https://app.asana.com/api/1.0/projects/404374073789112/tasks',
    headers: {
      "Authorization": "Bearer 0/87ef931fcfabf9c3697672f1b360ec21"
    },
    type: 'GET',
    dataType: 'json'
  };

  client.request(settings).then(
    function (data) {
      showTaskData(data);
    },
    function (response) {
      showError(response);
    }
  )
}

function showTaskData(tasks) {
  var context = {
    project_tasks: tasks.data
  };
  switchTo('tasks-hdbs', context);
}

function showError(response) {
  var context = {
    'status': response.status,
    'statusText': response.statusText
  };
  switchTo('error-hdbs', context);
}

function switchTo(template_name, context) {
  var template_id = '#' + template_name;
  var source = $(template_id).html();
  var template = Handlebars.compile(source);
  if (context) {
    var html = template(context);
  } else {
    var html = template();
  }
  $('#content').html(html);
}
