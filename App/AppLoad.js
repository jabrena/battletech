(function() {
   "use strict";

   require.config({
      shim: {
         underscore: { exports: "_" },
         jquery: { exports: "$" },
         radio: { exports: "radio" }
      },
      paths: {
         "heap": "../libs/heap",
         "jquery": "../libs/jquery",
         "radio": "../libs/radio.min",
         "underscore": "../libs/underscore",
         //"image": "../lib/image",
      }
   });

   require(["App", "underscore", "jquery", "heap"], function(app) {
         app.initApp();
   });
})();