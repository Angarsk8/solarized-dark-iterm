var sh = require('shelljs');

sh.curl = function(options, path, resource, executioObject, action) {
    var stringOfOptions = "-" + options.join("");
    var fullPath = [path, "/", resource].join("");
    var command = ["curl", stringOfOptions, fullPath].join(" ");
    var result = this.exec(command, executioObject, action);

    if (!result || result.output === "Not Found") {
        throw new Error("The resource cannot be located (Invalid URL)");
    } else {
        return result;
    }
};

function downloadFiles(url, files) {
    if (sh.which("curl")) {
        files.forEach(function(file) {
            sh.echo("Downloading " + file)
            sh.curl(["s", "#"], url, file, {
                silent: true,
                async: false
            }).output.toEnd(file);
        });
        sh.echo("The configuration process has finished, quit iterm and re-open it to see the results");
    } else {
        throw new Error("Curl is not Installed");
    }
}

function main() {
    var url = "https://raw.githubusercontent.com/Angarsk8/solarized-dark-iterm/master";
    var files = [".bash_profile", ".bash_prompt", ".aliases"];

    try {
        downloadFiles(url, files);
        sh.exit(0);
    } catch (error) {
        sh.echo(error.message);
        sh.exit(1);
    }
}

main();