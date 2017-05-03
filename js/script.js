(function() {
  var Terminal;

  Terminal = (function() {
    function Terminal(options) {
      var $this;
      $this = this;
      this.prefix = options.prefix, this.selector = options.selector, this.greeting = options.greeting, this.hardDrive = options.hardDrive, this.workingDirectory = options.workingDirectory;
      this.workingDirectory = this.workingDirectory.replace(/^\//, "");
      if (this.greeting && this.greeting !== "") {
        this.selector.val(this.greeting + "\n");
      }
      this.selector.val("" + (this.selector.val()) + this.prefix);
      this.history = [];
      this.historySelected = -1;
      this.exit = false;
      this.selector.click(function() {
        var val;
        val = $this.selector.val();
        $this.selector.val("");
        return $this.selector.val(val);
      });
      this.selector.keydown(function(e) {
        var cL, carretPosition, content, currentLine, i, output, prefix, rawLine, text;
        if ($this.exit === true) {
          return e.preventDefault();
        } else {
          content = $this.selector.val();
          cL = content;
          cL = cL.substr(content.lastIndexOf("\n") + 1);
          rawLine = cL;
          cL = cL.replace(/\s+/g, " ");
          cL = cL.replace($this.prefix, "");
          currentLine = cL;
          if (e.which === 8 && rawLine.length <= $this.prefix.length) {
            return e.preventDefault();
          } else if (e.which === 37) {
            carretPosition = $this.selector.prop("selectionStart");
            text = $this.selector.val();
            text = text.replace(/\r?\n?[^\r\n]*$/, "");
            text = text + "\n" + $this.prefix;
            if (carretPosition <= text.length) {
              return e.preventDefault();
            }
          } else if (e.which === 13) {
            e.preventDefault();
            $this.historySelected = -1;
            output = null;
            $this.selector.val(($this.selector.val()) + "\n");
            if (currentLine.replace(/^\s+/g, "") !== "") {
              $this.history.push(currentLine);
            }
            currentLine.split("&&").forEach(function(stringInput) {
              var arg, command, input;
              input = stringInput.replace(/^\s+/g, "").split(" ");
              command = input.shift();
              arg = input;
              if ($this[command + "Command"]) {
                output = $this[command + "Command"](arg);
              } else if (command !== "") {
                output = "-bash: " + command + ": command not found";
              }
              if (output) {
                return $this.selector.val("" + ($this.selector.val()) + output + "\n");
              }
            });
            if ($this.exit === false) {
              $this.selector.val("" + ($this.selector.val()) + $this.prefix);
            }
            return $this.selector.scrollTop($this.selector[0].scrollHeight);
          } else if (e.which === 38) {
            e.preventDefault();
            if ($this.historySelected < $this.history.length - 1) {
              if ($this.selector.val().split("\n").length > 1) {
                prefix = "\n" + $this.prefix;
              } else {
                prefix = $this.prefix;
              }
              $this.selector.val($this.selector.val().replace(/\r?\n?[^\r\n]*$/, prefix));
              i = $this.historySelected + 1;
              $this.selector.val("" + ($this.selector.val()) + $this.history[$this.history.length - 1 - i]);
              return $this.historySelected = i;
            }
          } else if (e.which === 40) {
            e.preventDefault();
            if ($this.selector.val().split("\n").length > 1) {
              prefix = "\n" + $this.prefix;
            } else {
              prefix = $this.prefix;
            }
            $this.selector.val($this.selector.val().replace(/\r?\n?[^\r\n]*$/, prefix));
            if ($this.historySelected > 0) {
              i = $this.historySelected - 1;
              $this.selector.val("" + ($this.selector.val()) + $this.history[$this.history.length - 1 - i]);
              return $this.historySelected = i;
            } else {
              $this.historySelected = -1;
              return $this.selector.val($this.selector.val());
            }
          }
        }
      });
    }

    Terminal.prototype.cmdCommand = function() {
      return ["clear", "echo [text]", "exit", "date", "time", "history", "ls", "pwd", "about"].sort().join("\n");
    };
//     Added by hab
 Terminal.prototype.aboutCommand = function() {
      this.selector.val("");
      return "Full-stack web developer based in Washington,D.C.";
    };
    Terminal.prototype.clearCommand = function() {
      this.selector.val("");
      return null;
    };

    Terminal.prototype.echoCommand = function(arg) {
      return arg[0];
    };

    Terminal.prototype.dateCommand = function() {
      return new Date();
    };

    Terminal.prototype.pwdCommand = function() {
      return "/" + (this.workingDirectory.replace(/\/$/, ""));
    };

    Terminal.prototype.lsCommand = function(directory) {
      var $this, wd;
      $this = this;
      directory = directory[0];
      wd = [];
      this.fromDifferntLocation(directory, function() {
        wd = $this.getWorkingDirectory();
        return wd = Object.keys(wd);
      });
      return wd.join(" ");
    };



    Terminal.prototype.rmCommand = function(rmPath) {
      var $this, fileName, path, wd;
      $this = this;
      rmPath = rmPath[0];
      path = rmPath.split("/");
      fileName = path.splice(-1);
      path = path.join("/");
      wd = {};
      if (path === "") {
        path = "/";
      }
      this.fromDifferntLocation(path, function() {
        return wd = $this.getWorkingDirectory();
      });
      if (wd[fileName] != null) {
        delete wd[fileName];
        return null;
      } else {
        return "rm: " + rmPath + ": No such file or directory";
      }
    };


    Terminal.prototype.timeCommand = function() {
      return (new Date()).toTimeString();
    };

    Terminal.prototype.exitCommand = function() {
      this.exit = true;
      return "[Process completed]";
    };

    Terminal.prototype.historyCommand = function() {
      var $this, history, message;
      $this = this;
      message = "";
      history = this.history.slice(-10);
      history.forEach(function(historyItem, i) {
        return message = "" + message + (history.length - i - 1) + " " + historyItem + "\n";
      });
      return message.replace(/\n$/, "");
    };

    Terminal.prototype.getFile = function(path) {
      var $this, file, fileName;
      if (path == null) {
        path = "";
      }
      $this = this;
      path = path.split("/");
      fileName = path.splice(-1);
      file = "";
      path = path.join("/");
      if (path === "") {
        path = "/";
      }
      this.fromDifferntLocation(path, function() {
        return file = $this.getWorkingDirectory()[fileName];
      });
      if (typeof file !== "object") {
        return file;
      } else {
        return false;
      }
    };


    Terminal.prototype.fromDifferntLocation = function(path, callback) {
      var startingDir;
      if (path == null) {
        path = "";
      }
      startingDir = "~/" + this.workingDirectory;
      if (this.changeDirectory(path)) {
        callback();
        return this.changeDirectory(startingDir);
      } else {
        return false;
      }
    };

    Terminal.prototype.getWorkingDirectory = function() {
      var wd;
      wd = this.workingDirectory;
      if (wd !== "") {
        wd = wd.split("/");
        wd.forEach(function(cd) {

        });
      }

    };

    return Terminal;

  })();

  $(document).ready(function() {
    var dateTime, terminal;
    dateTime = (new Date()).toLocaleDateString('se');
    return terminal = new Terminal({
      prefix: "Habs' MacBook:~ $ ",
      greeting: "Type 'cmd' for commands",
      selector: $(".terminal-input"),
      workingDirectory: "User"
    });
  });

}).call(this);
