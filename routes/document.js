var md = require("node-markdown").Markdown;
var store = require('../lib/store'),
    structure = require('../lib/folderHierarchy');


exports.index = function(req, res){
    var id = req.params.document;
    structure.get(id, function (err, file) {
        if (!file || file.type === 0 || !file.public) {
            res.status(404);
            res.render('404', {
                title: 'Not found'
            });
            return;
        }
        store.get(id, function(err, data) {
            res.render('document', { 
                title: 'Express', 
                doc: data,
                md:md
            });
        });
    });
    
};