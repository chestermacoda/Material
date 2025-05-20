const ErrorController = resp.status(500).json({message:error.message});



module.exports = ErrorController;