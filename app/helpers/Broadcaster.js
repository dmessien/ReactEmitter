module.exports = {
    emit: function(emitter, action, data) {
        emitter.emit(action, data);
    }
};