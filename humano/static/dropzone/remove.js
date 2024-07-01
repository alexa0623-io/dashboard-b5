Dropzone.options.myGreatDropzone = {
    addRemoveLinks: true,
    dictRemoveFile: 'Remove File',
    init: function() {
        this.on("success", function(file, response) {
        });

        this.on("removedfile", function(file) {
        });
    }
};

document.querySelector("#dropZone button").addEventListener("click", function() {
    document.querySelector("#my-great-dropzone").click();
});